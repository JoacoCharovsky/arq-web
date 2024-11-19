import { CommentModel, PostModel } from "@/models/schemas";
import { dbConnect } from "@/lib/db";

export async function getAllComments(postId: string) {
  await dbConnect();
  const comments = await CommentModel.find({ postId })
    .populate("author")
    .exec();
  return comments;
}

export async function createComment(
  postId: string,
  userId: string,
  content: string
) {
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
}

export async function deleteCommentById(commentId: string, postId: string) {
  await dbConnect();
  const deletedComment = await CommentModel.findByIdAndDelete(commentId).exec();
  if (!deletedComment) {
    throw new Error("404");
  }

  // Update comments count in the post
  await PostModel.findByIdAndUpdate(postId, { $inc: { commentsCount: -1 } });

  return deletedComment;
}
