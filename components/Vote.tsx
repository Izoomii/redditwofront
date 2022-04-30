import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { VoteType, backURL, Post } from "../globalVars/globals";

interface votes {
  upvotes: number;
  downvotes: number;
  total: number;
  votetype?: string;
}

export default function Vote(props: any) {
  const post = props.post as Post;
  const withVotes = props.withVotes as boolean;

  const [votes, setVotes] = useState("");

  const sendVote = (type: VoteType) => {
    axios
      .post(
        backURL + `/posts/${post.id}/vote`,
        { vote: type },
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data);
        fetchVotes();
      });
  };

  const fetchVotes = () => {
    if (!withVotes) return setVotes("Vote");
    axios
      .get(backURL + `/posts/${post.id}/votecount`, {
        withCredentials: true,
      })
      .then(({ data }: AxiosResponse<votes>) => {
        if (!data.votetype || data.votetype === null) {
          setVotes(`[${data.total}] -> +${data.upvotes}/-${data.downvotes}`);
        } else {
          const votetype = data.votetype as VoteType;
          if (votetype === "UP") {
            setVotes(
              `[${data.total}] -> ((+${data.upvotes}))/-${data.downvotes}`
            );
          } else {
            setVotes(
              `[${data.total}] -> +${data.upvotes}/((-${data.downvotes}))`
            );
          }
        }
      });
  };

  useEffect(() => {
    fetchVotes();
  }, []);

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
