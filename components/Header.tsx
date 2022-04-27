import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { backURL, User } from "../globalVars/globals";
import Avatar from "./Avatar";

// interface searchResults {
//   words: string;
// }

export const Header = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  //could merge nickname and avatar into user but it's not much, IMPL
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const searchQuery = () => {
    router.push("/search?query=" + search);
  };

  useEffect(() => {
    axios
      .get(backURL + "/users/verifyme", {
        withCredentials: true,
      })
      .then(({ data }) => {
        const user = data.user as User;
        if (!user) return setAvatar(null), setNickname("No user logged in");
        setNickname(user.nickname);
        setAvatar(user.avatar as string | null);
      });
    // console.log("header useEffect triggered");
  }, []);

  return (
    <div id="header" className="bg-blue-400 w-100 h-10 flex ">
      <div className="flex w-1/4 h-100 justify-around">
        <div className="grid place-items-center text-xl font-bold hover:text-blue-800 transition-all ease-linear duration-100">
          <Link href="/">RedditTwo</Link>
        </div>
        <div className="grid place-items-center">
          <Link href="/subs">All Subs</Link>
        </div>
        <div className="grid place-items-center">
          <Link href="/all">r/All</Link>
        </div>
      </div>
      <div className="flex h-100 w-2/4 p-1">
        <input
          className="w-3/4 h-100"
          name="searchQuery"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <button
          onClick={() => {
            searchQuery();
          }}
          className="w-1/5 h-100 bg-gray-300 ml-1"
        >
          Search
        </button>
      </div>
      <div className="flex h-100 w-1/4 justify-end">
        <div className="grow text-center flex flex-col justify-center">
          <Link
            href={
              nickname === "No user logged in" ? "/login" : "/users/" + nickname
            }
          >
            {nickname}
          </Link>
        </div>
        <div className="h-10 w-fit rounded-full hover:bg-blue-600 ease-in transition-all duration-100 p-1">
          <Link passHref href={`/settings`}>
            <div className="w-full h-full">
              <Avatar avatar={avatar} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
