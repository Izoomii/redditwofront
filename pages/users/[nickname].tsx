import axios from "axios";
import Link from "next/link";
import React from "react";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Page } from "../../components/Page";
import { Main } from "../../components/Main";
import { PostComponent } from "../../components/PostComponent";
import { Sidebar } from "../../components/Sidebar";
import { backPort, UserWithPosts } from "../../globalVars/globals";
import AccountInfo from "../../components/AccountInfo";

interface NicknameList {
  nickname: string;
}

function Account(props: any) {
  const userInfo = props.data as UserWithPosts;
  console.log(props, props.data);
  return (
    <Page>
      <Header></Header>
      <Container>
        <Main>
          {userInfo.posts.map((e, i) => {
            return (
              <div key={i}>
                <PostComponent post={e} withVotes={true} />
              </div>
            );
          })}
        </Main>
        <Sidebar>
          <AccountInfo userInfo={userInfo} />
        </Sidebar>
      </Container>
    </Page>
  );
}

//staticprops and staticpaths search for all users then the specific user at every refresh, bit inefficient, IMPL
export const getStaticPaths = async () => {
  const getUsers = async () => {
    const users: Promise<NicknameList[]> = axios
      .get(`http://localhost:${backPort}/users/all`)
      .then(({ data }) => {
        return data;
      });
    const paths = (await users).map((elem) => {
      return {
        params: { nickname: elem.nickname },
      };
    });
    return paths;
  };

  return {
    paths: await getUsers(),
    fallback: false,
  };
};

export const getStaticProps = async (props: any) => {
  const nickname = props.params.nickname;
  const data = await axios
    .get(`http://localhost:${backPort}/users/`, {
      params: {
        nickname,
      },
    })
    .then(({ data }) => {
      // console.log(data);
      return data;
    });
  return {
    props: { data },
  };
};

export default Account;
