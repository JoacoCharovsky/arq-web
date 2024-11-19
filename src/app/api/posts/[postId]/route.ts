import { NextRequest, NextResponse } from "next/server";
import {
  getPostById,
  updatePostById,
  deletePostById,
} from "@/services/postService";
import { authService } from "@/services/authService";
import { z, ZodError } from "zod";

const postBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    await authService();
    const { postId } = await params;
    const post = await getPostById(postId);
    return NextResponse.json(post);
  } catch (error) {
    if ((error as Error).message === "401") {
      return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
    }
    if ((error as Error).message === "404") {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ error: "Server Error." }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const body = await req.json();
    postBodySchema.parse(body);
    await authService();
    const { postId } = await params;
    const post = await updatePostById(postId, body.title, body.content);
    return NextResponse.json(post);
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

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    await authService();
    const { postId } = await params;
    const post = await deletePostById(postId);
    return NextResponse.json(post);
  } catch (error) {
    if ((error as Error).message === "401") {
      return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
    }
    if ((error as Error).message === "404") {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }
    return NextResponse.json({ error: "Server Error." }, { status: 500 });
  }
}
