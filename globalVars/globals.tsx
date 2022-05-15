export const backURL = "http://localhost:8080";
export type VoteType = "UP" | "DOWN" | null;

export const avatarsPath = "/assets/avatars/";
export const subImagesPath = "/assets/subImages/";
export const postImagesPath = "/assets/postImages/";

export interface User {
  id: string;
  email: string;
  nickname: string;
  password: string;
  name?: string;
  avatar?: string;
  premium: Premium;
  posts: Post[];
  subscriptions: Subscription[];
  comments: Comment[];
  messages: Message[];
  tickets: Ticket[];
}

export interface Post {
  id: string;
  sub: Sub;
  subName: string;
  createdAt: Date;
  updatedAt: Date;
  edited: boolean;
  title: string;
  content: string;
  images: string[];
  published: boolean;
  author: User;
  authorName: string | null;
  comments: Comment[];
}

export interface Sub {
  id: string;
  name: string;
  description?: string;
  image?: string;
  posts: Post[];
  owner: User;
  ownerName: string;
  subscriptions: Subscription[];
}

export interface Comment {
  id: string;
  owner: User;
  ownerName: string;
  post: Post;
  postId: string;
  edited: boolean;
  content: string;
}

export interface Premium {
  id: string;
  user: User;
  userId: string;
  active: boolean;
  expiration: Date; //not sure if this will work
  renew: boolean;
}

export interface Subscription {
  userId: string;
  subId: string;
}

export interface Ticket {
  user: User;
  userId: string;
  chat: Chat;
  chatId: string;
}

export interface Chat {
  id: string;
  name?: string;
  messages: Message[];
  tickets: Ticket[];
}

export interface Message {
  id: string;
  owner: User;
  ownerName: string;
  chat: Chat;
  chatId: string;
  content: string;
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
