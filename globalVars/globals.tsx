export const backURL = "http://localhost:8080";
// export const backPort = 8080;
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
  authorName: string | null;
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

export const verifyPasswordStrength = (password: string) => {
  const check = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  return check.test(password);
};
