import { Header } from "../components/Header";
import { Page } from "../components/Page";
import { Sidebar } from "../components/Sidebar";
import { Main } from "../components/Main";
import { Container } from "../components/Container";
import { PostComponent } from "../components/PostComponent";
import { backURL, Post } from "../globalVars/globals";
import SubList from "../components/SubList";
import axios from "axios";
import { useEffect, useState } from "react";

interface postsProp {
  data: Post[];
}

// export async function getStaticProps() {
//   return {
//     props: {},
//   };
// }

function IndexPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchFeed = async () => {
    const data = await axios
      .get(`${backURL}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setPosts(data);
      });
    return data;
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const click = async () => {
    const user = await axios
      .get(backURL + "/users/verifyme", {
        withCredentials: true,
      })
      .then(({ data }) => {
        return data;
      });
    console.log(user);
  };

  return (
    <div>
      <button
        onClick={() => {
          click();
        }}
        className="fixed w-20 h-10 top-1/2 right-0 bg-blue-500 rounded-sm hover:bg-blue-700"
      >
        Button
      </button>
      <Page>
        <Header />
        <Container>
          <Main>
            {posts.map((e, i) => {
              return (
                <div key={i}>
                  <PostComponent post={e} withVotes={true} />
                </div>
              );
            })}
          </Main>
          <Sidebar>
            <SubList />
          </Sidebar>
        </Container>
      </Page>
    </div>
  );
}

export default IndexPage;
