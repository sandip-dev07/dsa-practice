import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Input validation schemas
const getNotesSchema = z.object({
  question: z.string().min(1, "Question is required").max(1000, "Question too long"),
  topic: z.string().min(1, "Topic is required").max(200, "Topic too long"),
});

const saveNotesSchema = z.object({
  question: z.string().min(1, "Question is required").max(1000, "Question too long"),
  topic: z.string().min(1, "Topic is required").max(200, "Topic too long"),
  content: z.string().min(1, "Content is required").max(10000, "Content too long"),
});

// Rate limiting helper (basic implementation)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 30; // 30 requests per minute

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Helper function to validate session and get user
async function validateUser(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { error: new NextResponse("Unauthorized", { status: 401 }) };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true },
  });

  if (!user) {
    return { error: new NextResponse("User not found", { status: 404 }) };
  }

  // Rate limiting check
  if (!checkRateLimit(user.id)) {
    return { error: new NextResponse("Rate limit exceeded", { status: 429 }) };
  }

  return { user };
}

// Helper function to sanitize input
function sanitizeIdentifier(input: string): string {
  // For identifiers like question/topic, strip angle brackets to avoid HTML injection
  return input.trim().replace(/[<>]/g, '');
}

// Preserve formatting/HTML from the rich text editor, but remove obvious script tags
function sanitizeRichText(input: string): string {
  const trimmed = input.trim();
  // Remove <script> tags and their contents (basic guard)
  return trimmed.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
}

export async function GET(request: Request) {
  try {
    const { user, error } = await validateUser(request);
    if (error) return error;

    const { searchParams } = new URL(request.url);
    const question = searchParams.get("question");
    const topic = searchParams.get("topic");

    // Validate input
    const validationResult = getNotesSchema.safeParse({ question, topic });
    if (!validationResult.success) {
      return new NextResponse(validationResult.error.errors[0].message, { status: 400 });
    }

    const sanitizedQuestion = sanitizeIdentifier(question!);
    const sanitizedTopic = sanitizeIdentifier(topic!);

    console.log("Fetching notes for:", {
      userId: user.id,
      question: sanitizedQuestion,
      topic: sanitizedTopic
    });

    const progress = await prisma.progress.findUnique({
      where: {
        userId_question: {
          userId: user.id,
          question: sanitizedQuestion,
        },
      },
      select: {
        notes: {
          select: {
            id: true,
            content: true,
            updatedAt: true,
          },
        },
      },
    });

    console.log("Notes fetch result:", !!progress?.notes);

    return NextResponse.json(progress?.notes || null);
  } catch (error) {
    console.error("[NOTES_GET]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { user, error } = await validateUser(request);
    if (error) return error;

    const body = await request.json();

    // Validate input
    const validationResult = saveNotesSchema.safeParse(body);
    if (!validationResult.success) {
      return new NextResponse(validationResult.error.errors[0].message, { status: 400 });
    }

    const { question, topic, content } = validationResult.data;

    // Sanitize input
    const sanitizedQuestion = sanitizeIdentifier(question);
    const sanitizedTopic = sanitizeIdentifier(topic);
    const sanitizedContent = sanitizeRichText(content);

    console.log("Saving notes for:", {
      userId: user.id,
      question: sanitizedQuestion,
      topic: sanitizedTopic,
      contentLength: sanitizedContent.length
    });

    // Use transaction for data consistency
    const result = await prisma.$transaction(async (tx) => {
      // First, ensure the progress exists
      const progress = await tx.progress.upsert({
        where: {
          userId_question: {
            userId: user.id,
            question: sanitizedQuestion,
          },
        },
        update: {},
        create: {
          userId: user.id,
          question: sanitizedQuestion,
          topic: sanitizedTopic,
          solved: false,
        },
        select: { id: true },
      });

      // Then, upsert the notes
      const notes = await tx.notes.upsert({
        where: {
          progressId: progress.id,
        },
        update: {
          content: sanitizedContent,
        },
        create: {
          content: sanitizedContent,
          progressId: progress.id,
        },
        select: {
          id: true,
          content: true,
          updatedAt: true,
        },
      });

      return notes;
    });

    console.log("Notes saved successfully:", { notesId: result.id });

    return NextResponse.json({
      success: true,
      notes: result,
      message: "Notes saved successfully"
    });
  } catch (error) {
    console.error("[NOTES_POST]", error);

    // Handle specific database errors
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return new NextResponse("Notes already exist for this question", { status: 409 });
      }
      if (error.message.includes('Foreign key constraint')) {
        return new NextResponse("Invalid progress reference", { status: 400 });
      }
    }

    return new NextResponse("Internal server error", { status: 500 });
  }
}
