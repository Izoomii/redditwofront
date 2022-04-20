import React from "react";
import Link from "next/link";
import { Header } from "../../components/Header";
import { backPort } from "../../globalVars/globals";
import axios from "axios";

interface subProps {
  data: {
    sub: string;
  }[];
}

export default function Subreddits(props: subProps) {
  return (
    <div className="h-screen flex flex-col">
      <Header></Header>
      <div className="grow bg-gray-800 flex flex-col">
        <div className="p-2">
          {props.data.map((e, i) => {
            return (
              <Link key={i} href={`/subs/${e.sub}`}>
                <div className="bg-gray-900 text-white p-2 m-1 hover:bg-gray-700 transition-all ease-linear">
                  <h1 className="text-2xl text-blue-400 text-center">
                    {e.sub}
                  </h1>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await axios
    .get(`http://localhost:${backPort}/subs`)
    .then(({ data }) => {
      return data;
    });
  return {
    props: { data },
  };
};
