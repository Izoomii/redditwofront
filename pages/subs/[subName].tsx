import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Main } from "../../components/Main";
import { PostComponent } from "../../components/PostComponent";
import { Sidebar } from "../../components/Sidebar";
import SubInfo from "../../components/SubInfo";
import SubSideBar from "../../components/SubSideBar";
import { backURL, Post, Sub, User } from "../../globalVars/globals";

export default function SubPage(props: any) {
  const sub = props.data as Sub;
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    axios
      .get(`${backURL}/users/verifyme`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const user = data.user as User;
        if (user) {
          if (user.nickname === sub.ownerName) {
            setEditable(true);
          }
        }
      });
  });

  return (
    <Container>
      <Main>
        <div className="grow bg-gray-800">
          {sub.posts.map((e, i) => {
            return (
              <div key={i}>
                <PostComponent post={e} withVotes={true} />
              </div>
            );
          })}
        </div>
      </Main>
      <SubSideBar sub={sub} editable={editable} />
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
      return data;
    });
  return {
    props: { data },
  };
};
