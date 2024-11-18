import { DetailedPost, PreviewPost } from "@/models/interfaces";
import { connectToDatabase } from "../lib/db";
import { ObjectId } from "mongodb";

export async function getAllPosts(): Promise<PreviewPost[]> {}

export async function getPostById(postId: string): Promise<DetailedPost> {}

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
