import axios from "axios";
import { useEffect, useState } from "react";
import { backURL, Comment, Post, User } from "../globalVars/globals";
import CommentComponent from "./CommentComponent";

export default function CommentsList(props: any) {
  const post = props.post as Post;
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [nickname, setNickname] = useState("");

  const verifyUser = () => {
    axios
      .get(`${backURL}/users/verifyme`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const user = data.user as User;
        if (user) setNickname(user.nickname);
      });
  };

  const submitComment = () => {
    if (!comment) return console.log("Comment cannot be empty");
    axios
      .post(
        `${backURL}/posts/${post.id}/comment`,
        {
          content: comment,
        },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log(data);
      });
  };

  const fetchComments = () => {
    axios
      .get(`${backURL}/posts/${post.id}/comments`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const comments = data as Comment[];
        if (comments.length != 0) setCommentsList(data);
      });
  };

  useEffect(() => {
    verifyUser();
    fetchComments();
  }, []);

  return (
    <div>
      <div className="border m-2">
        Insert Comment:
        <input
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <button
          onClick={() => {
            submitComment();
          }}
          className="p-2 bg-blue-500"
        >
          Submit
        </button>
      </div>
      <div>
        {commentsList.map((e, i) => {
          return (
            <div key={i}>
              <CommentComponent comment={e} nickname={nickname} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
