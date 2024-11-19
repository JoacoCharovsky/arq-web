import { NextRequest, NextResponse } from "next/server";
import {
  getAllComments,
  createComment,
  deleteCommentById,
} from "@/services/commentService";
import { z, ZodError } from "zod";
import { authService } from "@/services/authService";

const commentBodySchema = z.object({
  content: z.string(),
});

const deleteBodySchema = z.object({
  commentId: z.string(),
});

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    await authService();
    const { postId } = await params;
    const comments = await getAllComments(postId);
    return NextResponse.json(comments);
  } catch (error) {
    if ((error as Error).message === "401") {
      return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
    }
    return NextResponse.json({ error: "Server Error." }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const body = await req.json();
    commentBodySchema.parse(body);
    const session = await authService();
    const { postId } = await params;
    const comment = await createComment(
      postId,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    await authService();
    const body = await req.json();
    deleteBodySchema.parse(body);
    const { postId } = await params;
    const comment = await deleteCommentById(body.commentId, postId);
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
