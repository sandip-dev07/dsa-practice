import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const question = searchParams.get("question");
  const topic = searchParams.get("topic");

  if (!question || !topic) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    console.log("Fetching notes for:", { userId: user.id, question, topic });

    const progress = await prisma.progress.findUnique({
      where: {
        userId_question: {
          userId: user.id,
          question,
        },
      },
      include: {
        notes: true,
      },
    });

    console.log("Found progress:", progress);

    return NextResponse.json(progress?.notes || null);
  } catch (error) {
    console.error("[NOTES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { question, topic, content } = body;

    console.log("Received note save request:", { question, topic, contentLength: content?.length });

    if (!question || !topic || !content) {
      console.log("Missing required fields:", { question, topic, hasContent: !!content });
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    console.log("Found user:", { userId: user.id });

    // First, ensure the progress exists
    const progress = await prisma.progress.upsert({
      where: {
        userId_question: {
          userId: user.id,
          question,
        },
      },
      update: {},
      create: {
        userId: user.id,
        question,
        topic,
        solved: false,
      },
    });

    console.log("Progress record:", progress);

    // Then, upsert the notes
    const notes = await prisma.notes.upsert({
      where: {
        progressId: progress.id,
      },
      update: {
        content,
      },
      create: {
        content,
        progressId: progress.id,
      },
    });

    console.log("Saved notes:", notes);

    return NextResponse.json(notes);
  } catch (error) {
    console.error("[NOTES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
