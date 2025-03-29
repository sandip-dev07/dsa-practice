import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";
import { RateLimit } from "@/utils/rate-limit";

const limiter = new RateLimit(15, 60 * 1000); // 15 requests per minute

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

    const { question, topic, solved } = await req.json();

    if (!question || typeof solved !== 'boolean') {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400, headers }
      );
    }

    // Update or create progress
    const progress = await prisma.progress.upsert({
      where: {
        userId_question: {
          userId: session.user.id,
          question: question,
        },
      },
      update: {
        solved: solved,
      },
      create: {
        userId: session.user.id,
        question: question,
        topic: topic || "",
        solved: solved,
      },
    });

    return NextResponse.json(
      {
        question: progress.question,
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

    const progress = await prisma.progress.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        question: true,
        solved: true,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
} 