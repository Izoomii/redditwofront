import React from "react";
import { backPort } from "../../globalVars/globals";

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
  console.log(postInfo);

  return (
    <div className="w-full bg-gray-900 text-white h-screen">
      <div>
        <p>id params is {}</p>
        <div>
          Post: {postInfo.title} by {postInfo.authorName}
          <br />
          Content: {postInfo.content}
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
