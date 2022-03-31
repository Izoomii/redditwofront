export const backPort = 8080;

export interface Post {
  id: number;
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
  email: string;
  nickname: string;
  password: string;
  name?: string;
  post: Post;
}

// model User {
//   //id      Int     @id @default(autoincrement())
//   email     String  @unique
//   nickname  String  @unique
//   password  String
//   name      String?
//   post      Post[]
// }
