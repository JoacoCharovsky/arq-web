import { NextRequest, NextResponse } from "next/server";
import {
  getPostById,
  updatePostById,
  deletePostById,
} from "@/services/postService";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const post = await getPostById(postId);
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { title, content } = await req.json();
  const { postId } = await params;

  const post = await updatePostById(postId, title, content);
  return NextResponse.json(post);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const post = await deletePostById(postId);
  return NextResponse.json(post);
}
