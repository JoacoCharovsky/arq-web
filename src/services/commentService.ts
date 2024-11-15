import { Comment } from "@/models/interfaces";

export async function getAllComments(postId: string): Promise<Comment[]> {
  // Implement logic to fetch all comments for a post
}

export async function createComment(
  postId: string,
  userId: string,
  content: string
): Promise<Comment[]> {
  // Implement logic to create a new comment and return updated comments
}

export async function deleteCommentById(
  commentId: string,
  postId: string
): Promise<Comment[]> {
  // Implement logic to delete a comment by ID and return updated comments
}
