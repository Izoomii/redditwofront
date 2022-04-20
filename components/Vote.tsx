import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { VoteType, backPort, Post } from "../globalVars/globals";

interface voteCount {
  upvotes: number;
  downvotes: number;
  total: number;
}

export default function Vote(props: any) {
  const post = props.post as Post;
  const withVotes = props.withVotes as boolean;

  const [votes, setVotes] = React.useState("");

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

  useEffect(() => {
    if (withVotes) {
      axios
        .get(`http://localhost:${backPort}/posts/${post.id}/votecount`)
        .then(({ data }: AxiosResponse<voteCount>) => {
          setVotes(`[${data.total}] -> +${data.upvotes}/-${data.downvotes}`);
        });
    } else {
      setVotes("Vote");
    }
  });

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 w-full rounded-full m-2 p-1"
        onClick={() => {
          sendVote("UP");
        }}
      >
        Up
      </button>
      <h1 className="text-center text-gray-500">{votes}</h1>
      <button
        className="bg-blue-400 hover:bg-blue-600 w-full rounded-full m-2 p-1"
        onClick={() => {
          sendVote("DOWN");
        }}
      >
        Down
      </button>
    </div>
  );
}
