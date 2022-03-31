import React from "react";
import { Header } from "../components/Header";
import { backPort } from "../globalVars/globals";
import Link from "next/link";
import axios from "axios";

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

interface postsProp {
  data: Post[];
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:${backPort}/posts/all`);
  const data = await res.json();
  // console.log(data);
  return {
    props: { data },
  };
}

function IndexPage(props: postsProp) {
  let posts = props.data;
  const clickAss = async () => {
    const res = await fetch(`http://localhost:${backPort}/main`);
    const data = await res.json();
    // console.log(data);
  };

  //remember func should only work one way, only when scrolling down and past 'limit', goodnight me, and goodmorning future me. hope i do well
  // if (typeof window !== "undefined") {
  //   document.addEventListener("scroll", () => {
  //     console.log(window.scrollY / 100);
  //   });
  // }
  return (
    <div className="flex flex-col h-screen w-full">
      <button
        onClick={() => {
          clickAss();
        }}
        className="fixed w-20 h-10 top-1/2 right-0 bg-blue-500 rounded-sm hover:bg-blue-700"
      >
        Button
      </button>
      <Header />
      <div id="main" className="bg-gray-700 flex-grow p-5">
        <div className="flex h-full w-full">
          <div className="flex-col w-9/12 h-full bg-gray-800 text-white p-5">
            {posts.map((e, i) => {
              return (
                <Link key={i} href={`/posts/${e.id}`}>
                  <div className="bg-gray-900 text-white p-2 m-1 hover:bg-gray-700 transition-all ease-linear">
                    <h1 className="text-2xl text-blue-400 text-center">
                      {e.title}
                    </h1>
                    <h1 className="text-xl text-blue-300 text-center">
                      <i>by {e.authorName}</i>
                    </h1>
                    <p className="text-center">{e.content}</p>
                  </div>
                </Link>
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

export default IndexPage;
