import { NextRequest, NextResponse } from "next/server";
import {
  getAllComments,
  createComment,
  deleteCommentById,
} from "@/services/commentService";
import { auth } from "../../../../auth";

export async function GET(req: NextRequest) {
  const { postId } = await req.json();
  const comments = await getAllComments(postId);
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  const { postId, content } = await req.json();
  const session = await auth();
  const comment = await createComment(postId, session!.user!.id!, content);
  return NextResponse.json(comment);
}

export async function DELETE(req: NextRequest) {
  const { commentId, postId } = await req.json();
  const comment = await deleteCommentById(commentId, postId);
  return NextResponse.json(comment);
}
