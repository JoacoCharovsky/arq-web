import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/services/postService";
import { auth } from "../../../../auth";

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  const session = await auth();
  const posts = await createPost(session!.user!.id!, title, content);
  return NextResponse.json(posts);
}
