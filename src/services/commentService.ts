import { CommentModel, PostModel } from "@/models/schemas";
import { dbConnect } from "@/lib/db";

export async function getAllComments(postId: string) {
  try {
    await dbConnect();
    const comments = await CommentModel.find({ postId })
      .populate("author")
      .exec();
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Could not fetch comments");
  }
}

export async function createComment(
  postId: string,
  userId: string,
  content: string
) {
  try {
    await dbConnect();

    const newComment = new CommentModel({
      postId,
      author: userId,
      createdAt: new Date().toISOString(),
      content,
    });

    await newComment.save();

    // Update comments count in the post
    await PostModel.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

    const populatedComment = await CommentModel.findById(newComment._id)
      .populate("author")
      .exec();
    return populatedComment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Could not create comment");
  }
}

export async function deleteCommentById(commentId: string, postId: string) {
  try {
    await dbConnect();
    const deletedComment = await CommentModel.findByIdAndDelete(
      commentId
    ).exec();
    if (!deletedComment) {
      throw new Error("Comment not found");
    }

    // Update comments count in the post
    await PostModel.findByIdAndUpdate(postId, { $inc: { commentsCount: -1 } });

    return deletedComment;
  } catch (error) {
    console.error(`Error deleting comment with id ${commentId}:`, error);
    throw new Error("Could not delete comment");
  }
}
