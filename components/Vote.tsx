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
          setVotes(`Votes: ${data.total} -> ${data.upvotes}/${data.downvotes}`);
        });
    } else {
      setVotes("Votes Disabled");
    }
  });

  return (
    <div className="flex flex-col">
      <h1 className="text-center text-gray-500">{votes}</h1>
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
    </div>
  );
}
