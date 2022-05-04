import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { backURL, Post, postImagesPath, User } from "../globalVars/globals";
import CommentsList from "./CommentsList";
import Popup from "./Popup";
import PostSettings from "./PostSettings";
import SavedComponent from "./savedComponent";
import Vote from "./Vote";

export default function PostFull(props: any) {
  const post = props.post as Post;
  const [editable, setEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get(`${backURL}/users/verifyme`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const user = data.user as User;
        if (user) {
          if (user.nickname === post.authorName) return setEditable(true);
        }
      });
  }, []);

  return (
    <div className="w-3/4 bg-gray-600">
      <div id="postHead" className="p-5">
        <h1 className="italic">
          <Link href={`/subs/${post.subName}`}>{`r/${post.subName}`}</Link>
          {" · "}
          <Link href={`/users/${post.authorName}`}>{post.authorName}</Link>
        </h1>
        <h1 className="text-3xl">{post.title}</h1>
      </div>
      <div id="postBody" className=" p-5 flex flex-col items-center">
        <div className="border-2 border-gray-900 w-full p-3">
          <p className="whitespace-pre">{post.content}</p>
          {/* CHNL img looks for index 0, hard code bruh */}
          <img
            src={post.images[0] ? `${postImagesPath + post.images[0]}` : ""}
          />
        </div>
        {post.edited ? <div>[Edited]</div> : null}
      </div>
      <Vote post={post} withVotes={true} />
      <SavedComponent post={post} />
      {editable ? (
        <div>
          <Popup
            show={showPopup}
            onClose={() => {
              setShowPopup(false);
            }}
          >
            <PostSettings post={post} />
          </Popup>
          <button
            className="p-2 bg-blue-600"
            onClick={() => {
              setShowPopup(true);
            }}
          >
            Edit Post
          </button>
        </div>
      ) : null}
      <CommentsList post={post} />
    </div>
  );
}
