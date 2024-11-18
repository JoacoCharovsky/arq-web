import mongoose, { Schema, Document } from "mongoose";
import { Post, Comment, User } from "./interfaces";

const { ObjectId } = mongoose.Schema.Types;

// User Schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
});

// Post Schema
const PostSchema: Schema = new Schema({
  author: { type: ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  createdAt: { type: String, required: true },
  content: { type: String, required: true },
  commentsCount: { type: Number, required: true },
});

// Comment Schema
const CommentSchema: Schema = new Schema({
  postId: { type: String, required: true },
  author: { type: ObjectId, ref: "User", required: true },
  createdAt: { type: String, required: true },
  content: { type: String, required: true },
});

export const UserModel =
  mongoose.models.User || mongoose.model<User & Document>("User", UserSchema);
export const PostModel =
  mongoose.models.Post || mongoose.model<Post & Document>("Post", PostSchema);
export const CommentModel =
  mongoose.models.Comment ||
  mongoose.model<Comment & Document>("Comment", CommentSchema);
