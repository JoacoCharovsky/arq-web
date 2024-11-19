import { PostModel } from "@/models/schemas";
import { dbConnect } from "@/lib/db";

export async function getAllPosts() {
  try {
    await dbConnect();
    const posts = await PostModel.find().populate("author").exec();
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
}

export async function getPostById(postId: string) {
  try {
    await dbConnect();
    const post = await PostModel.findById(postId).populate("author").exec();
    if (!post) {
      throw new Error("Post not found");
    }
    return post;
  } catch (error) {
    console.error(`Error fetching post with id ${postId}:`, error);
    throw new Error("Could not fetch post");
  }
}

export async function createPost(
  userId: string,
  title: string,
  content: string
) {
  try {
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
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Could not create post");
  }
}

export async function updatePostById(
  postId: string,
  title: string,
  content: string
) {
  try {
    await dbConnect();
    const post = await PostModel.findById(postId).exec();
    if (!post) {
      throw new Error("Post not found");
    }
    post.title = title;
    post.content = content;
    await post.save();
    const updatedPost = await PostModel.findById(postId)
      .populate("author")
      .exec();
    return updatedPost;
  } catch (error) {
    console.error(`Error updating post with id ${postId}:`, error);
    throw new Error("Could not update post");
  }
}

export async function deletePostById(postId: string) {
  try {
    await dbConnect();
    const deletedPost = await PostModel.findByIdAndDelete(postId).exec();
    if (!deletedPost) {
      throw new Error("Post not found");
    }
    return deletedPost;
  } catch (error) {
    console.error(`Error deleting post with id ${postId}:`, error);
    throw new Error("Could not delete post");
  }
}
