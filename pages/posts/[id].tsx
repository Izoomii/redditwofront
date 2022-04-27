import { backURL, Post, postImagesPath } from "../../globalVars/globals";
import { Header } from "../../components/Header";
import Vote from "../../components/Vote";
import Link from "next/link";
import { Container } from "../../components/Container";

interface postProp {
  data: {
    post: Post;
  };
}

interface idList {
  id: string;
}

function PostPage(data: postProp) {
  const post = data.data.post;

  return (
    <Container>
      <div className="w-full grow flex flex-col">
        <div className="bg-gray-700 m-3 p-4 grow flex">
          <div className="w-3/4 bg-gray-600">
            <div id="postHead" className="p-5">
              <h1 className="italic">
                <Link href={`/subs/${post.subName}`}>
                  {`r/${post.subName}`}
                </Link>
                {" · "}
                <Link href={`/users/${post.authorName}`}>
                  {post.authorName}
                </Link>
              </h1>
              <h1 className="text-3xl">{post.title}</h1>
            </div>
            <div id="postBody" className=" p-5 flex flex-col items-center">
              <div className="border-2 border-gray-900 w-full p-3">
                <p>{post.content}</p>
                {/* CHNL img looks for index 0, hard code bruh */}
                <img
                  src={
                    post.images[0] ? `${postImagesPath + post.images[0]}` : ""
                  }
                />
              </div>
            </div>
            <Vote post={post} withVotes={true} />
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticPaths() {
  const results = await fetch(backURL + "/posts"); //CHNL
  const data: Promise<idList[]> = results.json();
  const paths = (await data).map((elem) => {
    return {
      params: { id: elem.id.toString() }, //CHNL
    };
  });
  return {
    paths: paths,
    fallback: false, // false or 'blocking'
  };
}

//improve this IMPL
export async function getStaticProps(props: any) {
  const id = props.params.id;
  const res = await fetch(`${backURL}/posts/${id}`); //CHNL
  const data = await res.json();

  return {
    props: { data },
  };
}

export default PostPage;
