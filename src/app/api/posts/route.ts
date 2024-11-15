import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/services/postService";
import { PreviewPost } from "@/models/interfaces";

export async function GET() {
  const posts: PreviewPost[] = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { userId, title, content } = await req.json();
  const posts: PreviewPost[] = await createPost(userId, title, content);
  return NextResponse.json(posts);
}
