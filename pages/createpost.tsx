import axios from "axios";
import { useState } from "react";
import { Header } from "../components/Header";
import { backURL } from "../globalVars/globals";

interface updateMessage {
  message: string;
}

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [subName, setSubName] = useState("");
  const [content, setContent] = useState("");
  const [update, setUpdate] = useState("");

  //just need to figure out how to send user info with this or keep cookie alive for request, or just remove all tha bs and give nickname with text or some shit
  const submitPost = async () => {
    let data = { subName, title, content };
    if (title == "") return setUpdate("No title given.");
    if (subName == "") return setUpdate("No sub given.");
    axios
      .post(backURL + "/posts/createpost", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
      });
  };

  return (
    <div className="w-full h-screen">
      <Header />
      <div className="flex flex-col justify-center w-full h-full bg-gray-700">
        <div
          onFocus={() => {
            setUpdate("");
          }}
        >
          <label>
            Sub
            <input
              name="subName"
              value={subName}
              onChange={(event) => {
                setSubName(event.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Title
            <input
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Content
            <textarea
              name="content"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            ></textarea>
          </label>
          <br />
          <br />
          <button
            className="bg-blue-800 hover:bg-blue-600 w-32"
            onClick={() => {
              submitPost();
            }}
          >
            Submit or whatever
          </button>
          <p>{update}</p>
        </div>
      </div>
    </div>
  );
}
