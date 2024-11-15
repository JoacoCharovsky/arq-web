import { DetailedPost, PreviewPost } from "@/models/interfaces";
import { connectToDatabase } from "../../lib/db";
import { ObjectId } from "mongodb";

export async function getAllPosts(): Promise<PreviewPost[]> {
  const db = await connectToDatabase();
  const posts = await db
    .collection("posts")
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          id: "$_id",
          author: {
            id: "$author._id",
            name: "$author.name",
            image: "$author.image",
          },
          title: 1,
          createdAt: 1,
          commentsCount: { $size: "$comments" },
        },
      },
    ])
    .toArray();
  return posts;
}

export async function getPostById(postId: string): Promise<DetailedPost> {
  const db = await connectToDatabase();
  const post = await db
    .collection("posts")
    .aggregate([
      {
        $match: { _id: new ObjectId(postId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $project: {
          id: "$_id",
          author: {
            id: "$author._id",
            name: "$author.name",
            image: "$author.image",
          },
          title: 1,
          createdAt: 1,
          content: 1,
          comments: 1,
        },
      },
    ])
    .toArray();
  if (!post.length) {
    throw new Error("Post not found");
  }
  return post[0];
}

export async function createPost(
  userId: string,
  title: string,
  content: string
): Promise<PreviewPost[]> {
  // Implement logic to create a new post and return updated posts
}

export async function updatePostById(
  postId: string,
  title: string,
  content: string
): Promise<DetailedPost> {
  // Implement logic to update a post by ID
}

export async function deletePostById(postId: string): Promise<PreviewPost[]> {
  // Implement logic to delete a post by ID and return updated posts
}
