export const backPort = 8080;

export type VoteType = "UP" | "DOWN" | null;

export const avatarPath =
  // "/home/izumi/Documents/Redditwo/backend/public/assets/avatars";
  "/assets/avatars/";

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
  avatar?: string;
  post: Post;
}

export interface UserWithPosts {
  avatar: string;
  nickname: string;
  name: string;
  posts: Post[];
}
