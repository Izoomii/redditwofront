export const backPort = 8080;

export type VoteType = "UP" | "DOWN" | null;

export interface Post {
  id: string;
  sub: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  author: string; //is actually "User", which is another model
  authorName: string;
}

export interface User {
  id: string;
  email: string;
  nickname: string;
  password: string;
  name?: string;
  post: Post;
}
