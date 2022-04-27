import axios from "axios";
import Link from "next/link";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Main } from "../../components/Main";
import { Sidebar } from "../../components/Sidebar";
import SubInfo from "../../components/SubInfo";
import SubSideBar from "../../components/SubSideBar";
import { backURL, Post, Sub } from "../../globalVars/globals";

export default function SubPage(props: any) {
  const sub = props.data as Sub;
  return (
    <Container>
      <Main>
        <div className="grow bg-gray-800">
          {sub.posts.map((e, i) => {
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
      </Main>
      <SubSideBar sub={sub} />
    </Container>
  );
}

interface allSubsProps {
  name: string;
}

export const getStaticPaths = async () => {
  const res = await fetch(backURL + "/subs"); //CHNl
  const data: Promise<allSubsProps[]> = await res.json();
  const paths = (await data).map((elem) => {
    return {
      params: { subName: elem.name },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (props: any) => {
  const subName = props.params.subName;
  const data = await axios
    .get(`${backURL}/subs/${subName}`, {
      withCredentials: true,
    })
    .then(({ data }) => {
      console.log(data);
      return data;
    });
  return {
    props: { data },
  };
};
