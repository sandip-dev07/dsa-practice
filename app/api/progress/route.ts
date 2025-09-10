import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/options";
import { RateLimit } from "@/utils/rate-limit";

// DELETE endpoint for cleaning up all duplicates for a user
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Clean up all duplicates for this user
    const result = await cleanupAllDuplicates(session.user.id);

    // Revalidate cache after cleanup
    revalidateTag('progress');

    return NextResponse.json({
      message: "Duplicates cleaned up successfully",
      deletedCount: result.deletedCount,
      remainingCount: result.remainingCount,
    });
  } catch (error) {
    console.error("Error cleaning up duplicates:", error);
    return NextResponse.json(
      { error: "Failed to clean up duplicates" },
      { status: 500 }
    );
  }
}

const limiter = new RateLimit(15, 60 * 1000); // 15 requests per minute

// Function to clean up duplicate progress entries
async function cleanupDuplicateProgress(userId: string, questionId: string) {
  try {
    // Find all progress entries for this user and question
    const duplicates = await prisma.progress.findMany({
      where: {
        userId: userId,
        questionId: questionId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // If there are duplicates, keep only the most recent one
    if (duplicates.length > 1) {
      const [mostRecent, ...toDelete] = duplicates;

      // Delete older duplicates
      await prisma.progress.deleteMany({
        where: {
          id: {
            in: toDelete.map(d => d.id),
          },
        },
      });

      console.log(`Cleaned up ${toDelete.length} duplicate progress entries for questionId: ${questionId}`);
    }
  } catch (error) {
    console.error("Error cleaning up duplicate progress:", error);
    // Don't throw - we don't want cleanup errors to break the main flow
  }
}

// Function to get deduplicated user progress
async function getDeduplicatedUserProgress(userId: string) {
  const allProgress = await prisma.progress.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      questionId: true,
      solved: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  // Deduplicate by keeping only the most recent entry for each questionId
  const progressMap = new Map<string, typeof allProgress[0]>();

  allProgress.forEach(item => {
    if (!progressMap.has(item.questionId) || item.updatedAt > progressMap.get(item.questionId)!.updatedAt) {
      progressMap.set(item.questionId, item);
    }
  });

  return Array.from(progressMap.values()).map(item => ({
    questionId: item.questionId,
    solved: item.solved,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

// Cached function to fetch user progress
const getUserProgress = unstable_cache(
  async (userId: string) => {
    return await getDeduplicatedUserProgress(userId);
  },
  ['user-progress'],
  {
    revalidate: 3600, // 1 hour in seconds
    tags: ['progress'],
  }
);

export async function POST(req: Request) {
  try {
    // Check rate limit
    const rateLimit = await limiter.check();

    // Add rate limit headers
    const headers = {
      "X-RateLimit-Limit": rateLimit.limit.toString(),
      "X-RateLimit-Remaining": rateLimit.remaining.toString(),
      "X-RateLimit-Reset": rateLimit.reset.toString(),
    };

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429, headers }
      );
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers }
      );
    }

    const { questionId, topic, solved } = await req.json();

    if (!questionId || typeof solved !== 'boolean') {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400, headers }
      );
    }

    // Clean up any potential duplicates first
    await cleanupDuplicateProgress(session.user.id, questionId);

    // Update or create progress with proper error handling
    const progress = await prisma.progress.upsert({
      where: {
        userId_questionId: {
          userId: session.user.id,
          questionId: questionId,
        },
      },
      update: {
        solved: solved,
        topic: topic || "",
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        questionId: questionId,
        topic: topic || "",
        solved: solved,
      },
    });

    // Revalidate cache when progress is updated
    revalidateTag('progress');

    return NextResponse.json(
      {
        questionId: progress.questionId,
        solved: progress.solved,
      },
      { headers }
    );
  } catch (error) {
    console.error("Error saving progress:", error);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if this is a cleanup request
    const url = new URL(req.url);
    const cleanup = url.searchParams.get('cleanup') === 'true';

    if (cleanup) {
      // Run cleanup for all user's progress entries
      await cleanupAllDuplicates(session.user.id);
      // Revalidate cache after cleanup
      revalidateTag('progress');
    }

    // Use cached function
    const progress = await getUserProgress(session.user.id);

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

// Function to clean up all duplicates for a user
async function cleanupAllDuplicates(userId: string) {
  try {
    const allProgress = await prisma.progress.findMany({
      where: { userId },
      select: {
        id: true,
        questionId: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Find duplicate IDs to delete
    const duplicatesToDelete: string[] = [];
    const seenQuestionIds = new Set<string>();

    allProgress.forEach(item => {
      if (seenQuestionIds.has(item.questionId)) {
        duplicatesToDelete.push(item.id);
      } else {
        seenQuestionIds.add(item.questionId);
      }
    });

    if (duplicatesToDelete.length > 0) {
      await prisma.progress.deleteMany({
        where: {
          id: {
            in: duplicatesToDelete,
          },
        },
      });

      console.log(`Cleaned up ${duplicatesToDelete.length} duplicate progress entries for user ${userId}`);
    }

    return {
      deletedCount: duplicatesToDelete.length,
      remainingCount: seenQuestionIds.size,
    };
  } catch (error) {
    console.error("Error cleaning up all duplicates:", error);
    throw error;
  }
} 