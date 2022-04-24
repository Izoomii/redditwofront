import Link from "next/link";
import { Header } from "../../components/Header";
import { backURL, Sub } from "../../globalVars/globals";
import axios from "axios";

interface subProps {
  data: {
    name: string;
  }[];
}

export default function Subreddits(props: subProps) {
  const subs = props.data;
  return (
    <div className="h-screen flex flex-col">
      <Header></Header>
      <div className="grow bg-gray-800 flex flex-col">
        <div className="p-2">
          {subs.map((e, i) => {
            return (
              <Link key={i} href={`/subs/${e.name}`}>
                <div className="bg-gray-900 text-white p-2 m-1 hover:bg-gray-700 transition-all ease-linear">
                  <h1 className="text-2xl text-blue-400 text-center">
                    {e.name}
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
  const data = await axios.get(backURL + "/subs").then(({ data }) => {
    return data;
  });
  return {
    props: { data },
  };
};
