import axios from "axios";
import React from "react";
import { VoteType, backPort, Post } from "../globalVars/globals";

export default function Vote(props: any) {
  const post = props.post as Post;
  const sendVote = (type: VoteType) => {
    axios
      .post(
        `http://localhost:${backPort}/posts/${post.id}/vote`,
        {
          vote: type,
        },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log(data);
      });
  };
  return (
    <div className="flex p-1 justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 m-2 w-1/3"
        onClick={() => {
          sendVote("UP");
        }}
      >
        Upvote
      </button>
      <button
        className="bg-blue-400 hover:bg-blue-600 m-2 w-1/3"
        onClick={() => {
          sendVote("DOWN");
        }}
      >
        Downvote
      </button>
    </div>
  );
}
