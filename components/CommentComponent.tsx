import axios from "axios";
import { useState } from "react";
import { backURL, Comment } from "../globalVars/globals";

export default function CommentComponent(props: any) {
  const nickname = props.nickname as string;
  const comment = props.comment as Comment;
  const [content, setContent] = useState(comment.content);
  const [editing, setEditing] = useState(false);

  const updateComment = () => {
    if (!content) return console.log("Content can't be empty");
    axios
      .post(
        `${backURL}/posts/${comment.id}/updatecomment`,
        { content },
        { withCredentials: true }
      )
      .then(({ data }) => {
        console.log(data);
        window.location.href = window.location.href; //CHNL i mean really man, im surprised this even works. anyways this shouldn't reload the entire page, just update the comment
      });
  };

  return (
    <div>
      <div>
        {editing ? (
          <div>
            <input
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
              className="w-full"
            />
            <button
              onClick={() => {
                updateComment();
              }}
            >
              Update
            </button>
          </div>
        ) : (
          <div>
            <b>{comment.ownerName}: </b>
            {comment.content}
          </div>
        )}
      </div>
      {nickname === comment.ownerName ? (
        <button
          onClick={() => {
            setEditing(!editing);
            setContent(comment.content);
          }}
          className="p-1 bg-yellow-500"
        >
          {editing ? "Discard" : "Edit"}
        </button>
      ) : null}
    </div>
  );
}
