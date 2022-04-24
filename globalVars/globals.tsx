export const backURL = "http://localhost:8080";
export type VoteType = "UP" | "DOWN" | null;

export const avatarPath = "/assets/avatars/";

export interface User {
  id: string;
  email: string;
  nickname: string;
  password: string;
  name?: string;
  avatar?: string;
  posts: Post[];
}

export interface Post {
  id: string;
  sub: Sub;
  subName: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  author: User;
  authorName: string | null;
}

export interface Sub {
  id: string;
  name: string;
  description?: string;
  posts: Post[];
  owner: User;
  ownerName: string;
}

// ?? this feels replaceable CHNL
export interface UserWithPosts {
  avatar: string;
  nickname: string;
  name: string;
  posts: Post[];
}

export const showPw = (check: boolean) => {
  if (check) {
    return "text";
  } else {
    return "password";
  }
};

export const verifyPasswordStrength = (password: string) => {
  const check = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  return check.test(password);
};
