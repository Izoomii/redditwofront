import React from "react";
import { Header } from "../components/Header";
import { Page } from "../components/Page";
import { Sidebar } from "../components/Sidebar";
import { Main } from "../components/Main";
import { Container } from "../components/Container";
import { PostComponent } from "../components/PostComponent";
import { backPort, Post } from "../globalVars/globals";
import Vote from "../components/Vote";

interface postsProp {
  data: Post[];
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:${backPort}/posts/all`);
  const data = await res.json();
  // console.log(data);
  return {
    props: { data },
  };
}

function IndexPage(props: postsProp) {
  let posts = props.data;
  //remember func should only work one way, only when scrolling down and past 'limit', goodnight me, and goodmorning future me. hope i do well
  // if (typeof window !== "undefined") {
  //   document.addEventListener("scroll", () => {
  //     console.log(window.scrollY / 100);
  //   });
  // }
  return (
    <div>
      <button
        onClick={() => {
          console.log("Clicked!");
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
                  <PostComponent post={e} />
                  <Vote post={e} />
                </div>
              );
            })}
          </Main>
          <Sidebar>This is the sidebar on the left (right)</Sidebar>
        </Container>
      </Page>
    </div>
  );
}

export default IndexPage;
