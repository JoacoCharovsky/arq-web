import { NextRequest, NextResponse } from "next/server";
import {
  getAllComments,
  createComment,
  deleteCommentById,
} from "@/services/commentService";
import { Comment } from "@/models/interfaces";

export async function GET(req: NextRequest) {
  const { postId } = await req.json();
  const comments: Comment[] = await getAllComments(postId);
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  const { postId, userId, content } = await req.json();
  const comments: Comment[] = await createComment(postId, userId, content);
  return NextResponse.json(comments);
}

export async function DELETE(req: NextRequest) {
  const { commentId, postId } = await req.json();
  const comments: Comment[] = await deleteCommentById(commentId, postId);
  return NextResponse.json(comments);
}
