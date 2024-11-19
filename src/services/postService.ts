import { PostModel, CommentModel } from "@/models/schemas"; // Updated import
import { dbConnect } from "@/lib/db";

export async function getAllPosts() {
  await dbConnect();
  const posts = await PostModel.find().populate("author").exec();
  return posts;
}

export async function getPostById(postId: string) {
  await dbConnect();
  const post = await PostModel.findById(postId).populate("author").exec();
  if (!post) {
    throw new Error("404");
  }
  return post;
}

export async function createPost(
  userId: string,
  title: string,
  content: string
) {
  await dbConnect();

  const newPost = new PostModel({
    author: userId,
    title,
    createdAt: new Date().toISOString(),
    content,
    commentsCount: 0,
  });

  await newPost.save();
  const populatedPost = await PostModel.findById(newPost._id)
    .populate("author")
    .exec();
  return populatedPost;
}

export async function updatePostById(
  postId: string,
  title: string,
  content: string
) {
  await dbConnect();
  const post = await PostModel.findById(postId).exec();
  if (!post) {
    throw new Error("404");
  }
  post.title = title;
  post.content = content;
  await post.save();
  const updatedPost = await PostModel.findById(postId)
    .populate("author")
    .exec();
  return updatedPost;
}

export async function deletePostById(postId: string) {
  await dbConnect();
  const deletedPost = await PostModel.findByIdAndDelete(postId).exec();
  if (!deletedPost) {
    throw new Error("404");
  }
  await CommentModel.deleteMany({ postId }).exec(); // Delete associated comments
  return deletedPost;
}
