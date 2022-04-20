import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { backPort } from "../globalVars/globals";

//preferably always put in long thin "list-like" containers

interface Subs {
  sub: string;
}
//probably assumes the props are those given to it in other components
export default function SubList() {
  const [subs, setSubs] = React.useState<Subs[]>([]); //CHNL

  useEffect(() => {
    const subs = async () => {
      const results = await axios
        .get(`http://localhost:${backPort}/subs`)
        .then(({ data }) => {
          return data;
        });
      setSubs(results);
    };
    subs();
  }, []);

  return (
    <div className="h-full w-full">
      <div>
        <Link href={"/subs"}>Subs:</Link>
      </div>
      <div>
        {subs.map((e, i) => {
          return (
            //copied from subs page :/ obvious fix to this problem. IMPL
            <Link key={i} href={`/subs/${e.sub}`}>
              <div className="bg-gray-800 text-white p-2 m-1 hover:bg-gray-700 transition-all ease-linear">
                <h1 className="text-xl text-blue-400 text-center">{e.sub}</h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
