import Link from "next/link";
import React from "react";
import { Header } from "../../components/header";
import { backPort, Post } from "../../globalVars/globals";

interface nicknameList {
  nickname: string;
}

interface nicknameProps {
  data: Post[];
}

function Account(props: nicknameProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header></Header>
      <div className="bg-gray-700 h-full flex p-3">
        <div className="w-2/3 h-full bg-gray-800 mr-2 p-3">
          {props.data.map((e, i) => {
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
        <div className="w-1/3 h-full bg-gray-800 ml-1">
          Account or whatever here
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch(`http://localhost:${backPort}/users`);
  const data: Promise<nicknameList[]> = await res.json();
  const paths = (await data).map((elem) => {
    return {
      params: { nickname: elem.nickname.toString() },
    };
  });
  // console.log(paths);
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (props: any) => {
  const nickname = props.params.nickname;
  const res = await fetch(`http://localhost:${backPort}/users/${nickname}`);
  const data = await res.json();
  return {
    props: { data },
  };
};

export default Account;
