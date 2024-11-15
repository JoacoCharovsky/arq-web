export interface Post {
  author: User;
  title: string;
  createdAt: string;
}

export interface DetailedPost extends Post {
  content: string;
  comments: Comment[];
}

export interface PreviewPost extends Post {
  commentsCount: number;
}

export interface Comment {
  id: string;
  author: User;
  createdAt: string;
  content: string;
}

export interface User {
  id: string;
  name: string;
  image?: string;
}
