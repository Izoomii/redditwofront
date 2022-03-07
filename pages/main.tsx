import React from "react";
import { Header } from "../components/header";
import { backPort } from "../globalVars/globals";

interface Post {
  id: number;
  sub: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  author: string; //is actually "User", which is another model
  authorName: string;
}

interface shownPost {
  title: string;
  authorName: string;
  content: string;
}

export default function MainPage() {
  const [content, setContent] = React.useState<shownPost[]>([]);
  function clickAss() {
    fetch(`http://localhost:${backPort}/main`)
      .then((response) => response.json())
      .then((data: Array<Post>) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          setContent((prev) => [
            {
              title: data[i].title,
              authorName: data[i].authorName,
              content: data[i].content,
            },
            ...prev,
          ]);
        }
      });
  }

  //remember func should only work one way, only when scrolling down and past 'limit', goodnight me, and goodmorning future me. hope i do well
  if (typeof window !== "undefined") {
    document.addEventListener("scroll", () => {
      console.log(window.scrollY / 100);
    });
  }
  return (
    <div className="flex flex-col h-screen w-full">
      <button
        onClick={clickAss}
        className="fixed w-20 h-10 top-1/2 right-0 bg-blue-500 rounded-sm hover:bg-blue-700"
      >
        Button
      </button>
      <Header />
      <div id="main" className="bg-gray-700 flex-grow p-5">
        <div className="flex h-full w-full">
          <div className="flex-col w-9/12 h-full bg-gray-800 text-white p-5">
            {content.map((e, i) => {
              return (
                <div
                  key={i}
                  className="bg-gray-900 text-white p-2 m-1 hover:bg-gray-700 transition-all ease-linear"
                >
                  <h1 className="text-2xl text-blue-400 text-center">
                    {e.title}
                  </h1>
                  <h1 className="text-xl text-blue-300 text-center">
                    <i>by {e.authorName}</i>
                  </h1>
                  <p className="text-center">{e.content}</p>
                </div>
              );
            })}
          </div>
          <div className="flex-grow bg-gray-800 ml-5">
            This is the sidebar on the left
          </div>
        </div>
      </div>
    </div>
  );
}
