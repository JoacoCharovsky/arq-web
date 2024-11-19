import { NextRequest, NextResponse } from "next/server";
import {
  getAllComments,
  createComment,
  deleteCommentById,
} from "@/services/commentService";
import { auth } from "../../../../auth";
import { z, ZodError } from "zod";

const commentBodySchema = z.object({
  postId: z.string(),
  content: z.string(),
});

const deleteBodySchema = z.object({
  commentId: z.string(),
  postId: z.string(),
});

export async function GET(req: NextRequest) {
  try {
    await auth();
    const { postId } = await req.json();
    const comments = await getAllComments(postId);
    return NextResponse.json(comments);
  } catch (error) {
    if ((error as Error).message === "401") {
      return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
    }
    return NextResponse.json({ error: "Server Error." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    commentBodySchema.parse(body);
    const session = await auth();
    const comment = await createComment(
      body.postId,
      session!.user!.id!,
      body.content
    );
    return NextResponse.json(comment);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }
    if ((error as Error).message === "401") {
      return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
    }
    return NextResponse.json({ error: "Server Error." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await auth();
    const body = await req.json();
    deleteBodySchema.parse(body);
    const comment = await deleteCommentById(body.commentId, body.postId);
    return NextResponse.json(comment);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }
    if ((error as Error).message === "401") {
      return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
    }
    if ((error as Error).message === "404") {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ error: "Server Error." }, { status: 500 });
  }
}
