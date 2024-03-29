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
import { useRouter } from "next/router";

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

  const router = useRouter();

  const fetchFeed = async () => {
    const data = await axios
      .get(`${backURL}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const posts = data as Post[];
        if (posts.length === 0) return router.push("/all");
        setPosts(posts);
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
  );
}

export default IndexPage;
