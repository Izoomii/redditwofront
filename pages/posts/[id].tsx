import { backURL, Post, postImagesPath, User } from "../../globalVars/globals";
import { Header } from "../../components/Header";
import Vote from "../../components/Vote";
import Link from "next/link";
import { Container } from "../../components/Container";
import Popup from "../../components/Popup";
import PostSettings from "../../components/PostSettings";
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
  const [editable, setEditable] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .get(`${backURL}/users/verifyme`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const user = data.user as User;
        if (user) {
          if (user.nickname === post.authorName) return setEditable(true);
        }
      });
  }, []);

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
            {editable ? (
              <div>
                <Popup
                  show={showPopup}
                  onClose={() => {
                    setShowPopup(false);
                  }}
                >
                  <PostSettings post={post} />
                </Popup>
                <button
                  className="p-2 bg-blue-600"
                  onClick={() => {
                    setShowPopup(true);
                  }}
                >
                  Edit Post
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticPaths() {
  const results = await fetch(backURL + "/posts"); //CHNL
  const data: idList[] = await results.json();
  console.log(data);
  const paths = data.map((elem) => {
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
    props: data,
  };
}

export default PostPage;
