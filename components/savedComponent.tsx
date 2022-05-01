import axios from "axios";
import { useEffect, useState } from "react";
import { backURL, Post } from "../globalVars/globals";

export default function SavedComponent(props: any) {
  const post = props.post as Post;
  const [saved, setSaved] = useState(false);

  const savePost = () => {
    axios
      .post(
        `${backURL}/posts/${post.id}/save`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log(data);
        getSave();
      });
  };

  const getSave = () => {
    axios
      .get(`${backURL}/posts/${post.id}/save`, { withCredentials: true })
      .then(({ data }) => {
        const saved = data.saved as boolean;
        setSaved(saved);
      });
  };

  useEffect(() => {
    getSave();
  }, [post]);

  return (
    <div className="bg-red-400">
      <button
        onClick={() => {
          savePost();
        }}
        className="p-2 bg-blue-500"
      >
        {saved ? "Saved!" : "Save"}
      </button>
    </div>
  );
}
