import { Post } from "../globalVars/globals";
import Link from "next/link";
import Vote from "./Vote";

//IMPL maybe change it's name to just Post
export const PostComponent = (props: any) => {
  const post = props.post as Post;
  const withVotes = props.withVotes as boolean;
  return (
    <div className="bg-gray-900 text-white p-2 m-1 hover:bg-gray-700 flex transition-all ease-linear">
      <div className="flex justify-center">
        <div className="w-max">
          <Vote post={post} withVotes={withVotes} />
        </div>
      </div>
      <div className="grow">
        <Link href={`/posts/${post.id}`}>
          <div className="h-full flex flex-col justify-center">
            <div className="text-2xl text-blue-400 text-center">
              {post.title}
            </div>
            <div className="text-xl text-blue-300 text-center">
              <Link
                href={`${post.authorName ? "/users/" + post.authorName : ""}`}
              >
                <i>by {post.authorName ? post.authorName : "[deleted]"}</i>
              </Link>{" "}
              <Link href={`/subs/${post.subName}`}>
                <i className="text-gray-600">[r/{post.subName}]</i>
              </Link>
            </div>
            <br />
            <p className="text-center p-2">{post.content}</p>
            <p className="text-center p-1 text-gray-600 italic">
              {post.images.length === 0 ? "" : `[Image]`}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
