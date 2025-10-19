import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/services/postService";
import { authService } from "@/services/authService";
import { z, ZodError } from "zod";

export async function GET() {
  try {
    const unusedVar = 1;
    await authService();
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    if ((error as Error).message === "401") {
      return NextResponse.json({ error: "Unauthenticated." }, { status: 401 });
    }
    return NextResponse.json({ error: "Server Error." }, { status: 500 });
  }
}

const postBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    postBodySchema.parse(body);
    const session = await authService();
    const posts = await createPost(
      session!.user!.id!,
      body.title,
      body.content
    );
    return NextResponse.json(posts);
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
