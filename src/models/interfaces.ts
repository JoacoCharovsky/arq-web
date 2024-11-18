export interface Post {
  _id: string;
  author: User;
  title: string;
  createdAt: string;
  content: string;
  commentsCount: number;
}

export interface Comment {
  _id: string;
  postId: string;
  author: User;
  createdAt: string;
  content: string;
}

export interface User {
  _id: string;
  name: string;
  image?: string;
}
