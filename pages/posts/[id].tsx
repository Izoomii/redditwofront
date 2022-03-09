import React from "react";
import { backPort } from "../../globalVars/globals";
import { Header } from "../../components/header";

interface Post {
  id: number;
  sub: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  author: string; //is actually "User", which is another model
  authorName: string;
}

interface postProp {
  data: {
    post: Post;
  };
}

interface idList {
  id: number;
}

function PostPage(data: postProp) {
  const postInfo = data.data.post;
  // console.log(postInfo);

  return (
    <div className="w-full bg-gray-900 flex flex-col h-screen">
      <Header></Header>
      <div className="w-full grow flex flex-col">
        <div className="bg-gray-700 m-3 p-4 grow flex">
          <div className="w-3/4 bg-gray-600">
            <div id="postHead" className="p-5">
              <h1 className="italic">
                r/{postInfo.sub} · {postInfo.authorName}
              </h1>
              <h1 className="text-3xl">{postInfo.title}</h1>
            </div>
            <div id="postBody" className=" p-5 flex flex-col items-center">
              <div className="border-2 border-gray-900 w-full p-3">
                <p>{postInfo.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const results = await fetch(`http://localhost:${backPort}/posts`);
  const data: Promise<idList[]> = results.json();
  const paths = (await data).map((elem) => {
    return {
      params: { id: elem.id.toString() },
    };
  });
  return {
    paths: paths,
    fallback: false, // false or 'blocking'
  };
}

export async function getStaticProps(props: any) {
  const id = props.params.id;
  const res = await fetch(`http://localhost:${backPort}/posts/${id}`);
  const data = await res.json();
  // console.log(data);

  return {
    props: { data },
  };
}

export default PostPage;
