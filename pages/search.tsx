import React from "react";
import { Header } from "../components/Header";
import { useRouter } from "next/router";
import axios from "axios";
import { backPort } from "../globalVars/globals";
import { Post } from "../globalVars/globals";

export function Search() {
  const router = useRouter();
  const [results, setResults] = React.useState<Post[]>([]);
  const [executeOnce, setExecuteOnce] = React.useState(true);
  //for some reason this request is made like 4 times, but it works, probably just a nextjs thing, IMPL

  //CHNL employ useEffect instead
  const fetchQuery = () => {
    // dont know if this is the right way to go about things but if it costs one boolean const for it to work then sure /shrug
    if (!executeOnce) return;
    setExecuteOnce(false);
    const query = router.query;
    axios
      .get(`http://localhost:${backPort}/search`, {
        params: query,
      })
      .then(({ data }) => {
        console.log(data);
        setResults(data);
      });
  };

  if (router.isReady) {
    fetchQuery();
  }

  return (
    <div>
      <Header />
      <div>
        {results.map((e, i) => {
          return (
            <div key={i}>
              {e.authorName}
              <br />
              {e.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
