import React from "react";

interface Post {
  title: string;
  content: string;
}

export default function TestPage() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [posts, setPosts] = React.useState<Post[]>([]);

  function postHandler() {
    setPosts([{ title: title, content: content }, ...posts]);
    setTitle("");
    setContent("");
  }

  return (
    <div className="w-full bg-gray-900 text-white h-screen">
      <div className="flex flex-col items-center w-1/2 m-auto">
        <form className="w-full items-center flex flex-col">
          <label className="font-bold">Title</label>
          <input
            placeholder="Enter your title"
            value={title}
            className="block text-gray-700 text-sm font-bold border-2 w-full"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <br />
          <label className="font-bold">Content</label>
          <textarea
            placeholder="Enter your content"
            value={content}
            className="block text-gray-700 text-sm font-bold border-2 h-28 w-full"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button onClick={postHandler}>Post</button>
        </form>

        <div className="bg-red-400 w-full">
          {posts.map((e, i) => {
            return (
              <div
                key={i}
                className=""
                style={{ borderWidth: 4, borderStyle: "dotted" }}
              >
                <h1 className="text-3xl font-bold">{e.title}</h1>
                {e.content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
