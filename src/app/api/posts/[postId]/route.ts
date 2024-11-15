import { NextRequest, NextResponse } from "next/server";
import {
  getPostById,
  updatePostById,
  deletePostById,
} from "@/services/postService";
import { DetailedPost, PreviewPost } from "@/models/interfaces";

export async function GET(
  _: NextRequest,
  { params }: { params: { postId: string } }
) {
  const post: DetailedPost = await getPostById(params.postId);
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { title, content } = await req.json();
  const post: DetailedPost = await updatePostById(
    params.postId,
    title,
    content
  );
  return NextResponse.json(post);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { postId: string } }
) {
  const posts: PreviewPost[] = await deletePostById(params.postId);
  return NextResponse.json(posts);
}
