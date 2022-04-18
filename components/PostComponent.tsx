import React from "react";
import { Post } from "../globalVars/globals";
import Link from "next/link";
import Vote from "./Vote";

//IMPL maybe change it's name to just Post
export const PostComponent = (props: any) => {
  const post = props.post as Post;
  // const key = props.postKey as number;
  return (
    <div className="bg-gray-900 text-white p-2 m-1 hover:bg-gray-700 transition-all ease-linear">
      <Link href={`/posts/${post.id}`}>
        <div>
          <h1 className="text-2xl text-blue-400 text-center">{post.title}</h1>
          <h1 className="text-xl text-blue-300 text-center">
            <i>by {post.authorName}</i>
          </h1>
          <p className="text-center">{post.content}</p>
        </div>
      </Link>
      <div className="flex justify-center">
        <div className="w-1/2">
          <Vote post={post} withVotes={true} />
        </div>
      </div>
    </div>
  );
};
