export interface Post {
  id: string;
  author: User;
  title: string;
  createdAt: string;
  content: string;
  commentsCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  createdAt: string;
  content: string;
}

export interface User {
  id: string;
  name: string;
  image?: string;
}
