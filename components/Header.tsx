import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { backPort } from "../globalVars/globals";

// interface searchResults {
//   words: string;
// }

export const Header = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [avatar, setAvatar] = React.useState("");

  const searchQuery = () => {
    // if (window.location.pathname === "/search") router.reload();
    router.push(`/search?query=${search}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:${backPort}/users/verifyme`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (!data.user) {
          setAvatar("NOAV");
        } else {
          setAvatar(data.user);
        }
      });
  }, []);

  return (
    <div id="header" className="bg-blue-400 w-100 h-10 flex ">
      <div className="flex w-1/4 h-100 justify-around">
        <div className="grid place-items-center text-xl font-bold hover:text-blue-800 transition-all ease-linear duration-100">
          <a href="/">RedditTwo</a>
        </div>
        <div className="grid place-items-center">
          <a href="/createpost">Create Post</a>
        </div>
        <div className="grid place-items-center">
          <a href="/login">Login</a>
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
      <div className="flex h-100 w-1/4 justify-end place-items-center">
        <h3>profile here or whatever</h3>
        <div className="h-10 w-20 text-center">
          <Link href={`/settings`}>{avatar}</Link>
          {/* <img src="avatar icon.jpg" className="object-contain rounded-full" /> */}
        </div>
      </div>
    </div>
  );
};
