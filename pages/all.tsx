import { Header } from "../components/Header";
import { Page } from "../components/Page";
import { Sidebar } from "../components/Sidebar";
import { Main } from "../components/Main";
import { Container } from "../components/Container";
import { PostComponent } from "../components/PostComponent";
import { backURL, Post } from "../globalVars/globals";
import SubList from "../components/SubList";
import axios from "axios";

interface postsProp {
  data: Post[];
}

export async function getServerSideProps() {
  const res = await fetch(backURL + "/posts/all"); //CHNL ??????
  const data = await res.json();
  // console.log(data);
  return {
    props: { data },
  };
}

function AllPage(props: postsProp) {
  const posts = props.data;
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

export default AllPage;
