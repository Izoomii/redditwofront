import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { backURL } from "../globalVars/globals";

//preferably always put in long thin "list-like" containers

interface SubsList {
  name: string;
}
//probably assumes the props are those given to it in other components
export default function SubList() {
  const [subsList, setSubsList] = useState<SubsList[]>([]); //CHNL

  useEffect(() => {
    const subs = async () => {
      const results = await axios.get(backURL + "/subs").then(({ data }) => {
        return data;
      });
      setSubsList(results);
    };
    subs();
  }, []);

  return (
    <div className="h-full w-full">
      <div>
        <Link href={"/subs"}>Subs:</Link>
      </div>
      <div>
        {subsList.map((e, i) => {
          return (
            //copied from subs page :/ obvious fix to this problem. IMPL
            <Link key={i} href={`/subs/${e.name}`}>
              <div className="bg-gray-800 text-white p-2 m-1 hover:bg-gray-700 transition-all ease-linear">
                <h1 className="text-xl text-blue-400 text-center">{e.name}</h1>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
