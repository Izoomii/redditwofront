import React from "react";

export default function Subreddits() {
  const [subSearch, setSubSearch] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  function historyHandler() {
    setHistory([subSearch, ...history]);
    setSubSearch("");
  }
  return (
    <div className="bg-blue-600 h-screen">
      <h1 className="text-6xl">Subreddits and shit</h1>
      <br />
      <label htmlFor="subSearch">Search for subreddits: </label>
      <input
        className=""
        id="subSearch"
        value={subSearch}
        onChange={(ev) => {
          setSubSearch(ev.target.value);
          console.log(subSearch);
        }}
      />
      <br />
      <button onClick={historyHandler}>Search them mf subs bruh</button>
      <br />
      <div className="flex flex-row w-100 bg-red-100">
        <div className="basis-1/2">
          <p>Searching for posts in {subSearch}...</p>
        </div>
        <div className="basis-1/2">
          <p>History:</p>
          <div>
            {history.map((e, i) => {
              return (
                <div key={i}>
                  <h4>{e}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
