import React from "react";
import { Post } from "../globalVars/globals";
import Link from "next/link";

export const PostComponent = (props: any) => {
  const post = props.post as Post;
  // const key = props.postKey as number;
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="bg-gray-900 text-white p-2 m-1 hover:bg-gray-700 transition-all ease-linear">
        <h1 className="text-2xl text-blue-400 text-center">{post.title}</h1>
        <h1 className="text-xl text-blue-300 text-center">
          <i>by {post.authorName}</i>
        </h1>
        <p className="text-center">{post.content}</p>
      </div>
    </Link>
  );
};
