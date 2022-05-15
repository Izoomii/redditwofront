import { backURL, Post, Sub } from "../../globalVars/globals";
import { Container } from "../../components/Container";
import PostFull from "../../components/PostFull";
import SubSideBar from "../../components/SubSideBar";
import { useEffect, useState } from "react";
import axios from "axios";

interface postProp {
  post: Post;
}
interface idList {
  id: string;
}

function PostPage(data: postProp) {
  const post = data.post;
  const [sub, setSub] = useState<Sub | null>(null);
  useEffect(() => {
    axios
      .get(`${backURL}/subs/${post.subName}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setSub(data);
      });
  }, [post]);

  return (
    <Container>
      <div className="w-full grow flex flex-col">
        <div className="bg-gray-700 m-3 p-4 grow flex">
          <PostFull post={post} />
          {sub ? <SubSideBar sub={sub} /> : null}
        </div>
      </div>
    </Container>
  );
}

// export async function getStaticPaths() {
//   const results = await fetch(backURL + "/posts"); //CHNL
//   const data: idList[] = await results.json();
//   console.log(data);
//   const paths = data.map((elem) => {
//     return {
//       params: { id: elem.id.toString() }, //CHNL
//     };
//   });
//   return {
//     paths: paths,
//     fallback: false, // false or 'blocking'
//   };
// }

//improve this IMPL
export async function getServerSideProps(props: any) {
  const id = props.params.id;
  const res = await fetch(`${backURL}/posts/${id}`); //CHNL
  const data = await res.json();
  return {
    props: data,
  };
}

export default PostPage;
