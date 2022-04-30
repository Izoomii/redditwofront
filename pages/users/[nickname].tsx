import axios from "axios";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Page } from "../../components/Page";
import { Main } from "../../components/Main";
import { PostComponent } from "../../components/PostComponent";
import { Sidebar } from "../../components/Sidebar";
import { backURL, User } from "../../globalVars/globals";
import AccountInfo from "../../components/AccountInfo";

interface NicknameList {
  nickname: string;
}

function Account(props: any) {
  const user = props.data as User;
  console.log(props, props.data);
  return (
    <Container>
      <Main>
        {user.posts.map((e, i) => {
          return (
            <div key={i}>
              <PostComponent post={e} withVotes={true} />
            </div>
          );
        })}
      </Main>
      <Sidebar>
        <AccountInfo user={user} />
      </Sidebar>
    </Container>
  );
}

//staticprops and staticpaths search for all users then the specific user at every refresh, bit inefficient, IMPL
export const getStaticPaths = async () => {
  const getUsers = async () => {
    const users: Promise<NicknameList[]> = axios
      .get(backURL + "/users/all")
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
    .get(backURL + "/users/", {
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
