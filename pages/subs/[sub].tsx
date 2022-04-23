import Link from "next/link";
import { Header } from "../../components/Header";
import { backURL, Post } from "../../globalVars/globals";

interface subProps {
  data: Post[];
}

export default function SubPage(props: subProps) {
  return (
    <div className="h-screen flex flex-col">
      <Header></Header>
      <div className="grow bg-gray-800">
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
    </div>
  );
}

interface allSubsProps {
  sub: string;
}

export const getStaticPaths = async () => {
  const res = await fetch(backURL + "/subs");
  const data: Promise<allSubsProps[]> = await res.json();
  const paths = (await data).map((elem) => {
    return {
      params: { sub: elem.sub.toString() },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (props: any) => {
  const sub = props.params.sub;
  const res = await fetch(backURL + "/subs/" + sub);
  const data = await res.json();
  // console.log(data);
  return {
    props: { data },
  };
};
