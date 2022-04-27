import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useRouter } from "next/router";
import axios from "axios";
import { backURL } from "../globalVars/globals";
import { Post } from "../globalVars/globals";
import { PostComponent } from "../components/PostComponent";
import { Main } from "../components/Main";
import { Container } from "../components/Container";
import { Page } from "../components/Page";

export function Search() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  //IMPL, handle 400 Bad Request status that's sent when query is empty
  const query = router.query;
  useEffect(() => {
    axios
      .get(backURL + "/search", {
        params: query,
      })
      .then(({ data }) => {
        console.log(data);
        setPosts(data);
      });
  }, [query]);

  return (
    <Container>
      <Main>
        <div>
          {posts.map((e, i) => {
            return (
              <div key={i}>
                <PostComponent post={e} withVotes={true} />
              </div>
            );
          })}
        </div>
      </Main>
    </Container>
  );
}

export default Search;
