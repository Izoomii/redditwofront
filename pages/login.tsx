import { useRouter } from "next/router";
import React from "react";
import { Header } from "../components/header";
import { backPort } from "../globalVars/globals";

interface User {
  id: number;
  email: string;
  nickname: string;
  password: string;
  name?: string;
  post: string;
}

interface authRes {
  authenticate: Boolean;
  message: string;
}

export default function Login() {
  const router = useRouter();

  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [accountCheck, setAccountCheck] = React.useState("");

  const checkUser = () => {
    if (nickname == "") {
      setAccountCheck("Please fill the nickname section.");
    } else {
      fetch(`http://localhost:${backPort}/auth/${nickname}`)
        .then((response) => response.json())
        .then((data: User) => {
          if (data.nickname === nickname) {
            setAccountCheck(`${nickname} exists!`);
          } else {
            setAccountCheck(`${nickname} does not exist.`);
          }
        });
    }
  };

  const loginUser = async () => {
    fetch(`http://localhost:${backPort}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, password }),
    })
      .then((response) => response.json())
      .then((data: authRes) => {
        if (data.authenticate == false) {
          setAccountCheck(data.message);
        } else {
          //need to actually remember the user with cookies and shit bruh
          router.push("/main");
        }
      });
  };

  return (
    <div>
      <div className="h-screen w-full flex flex-col">
        <button
          className="fixed right-0 top-1/2 w-20 h-10 bg-blue-500 hover:bg-blue-700"
          onClick={() => {
            console.log("Clicked. :)");
          }}
        >
          Click me
        </button>
        <Header />
        <div className="flex w-full flex-grow bg-gray-800 items-center justify-center">
          <div className="flex w-1/4 h-1/4 focus-within:h-1/3 hover:w-1/3 bg-gray-700 justify-center items-center transition-all ease-in-out duration-300">
            <div className="w-fit p-2 ">
              <form
                className="bg-white p-2"
                action={`http://localhost:${backPort}/auth/login`}
                method="POST"
                style={{ border: "1px solid black" }}
              >
                <label>
                  Nickname:
                  <input
                    className="m-2 mt-0"
                    name="nickname"
                    value={nickname}
                    placeholder="Nickname"
                    onFocus={() => {
                      setAccountCheck("");
                    }}
                    onChange={(event) => {
                      setNickname(event.target.value);
                    }}
                  />
                </label>
                <br />
                <label>
                  Password:
                  <input
                    className="m-2 mt-0"
                    name="password"
                    type="text"
                    value={password}
                    placeholder="Password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    onFocus={() => {
                      checkUser();
                    }}
                  />
                </label>
                <br />
                <button
                  type="button"
                  className="bg-blue-300 w-full hover:bg-blue-400"
                  onClick={() => {
                    loginUser();
                  }}
                >
                  Connect
                </button>
              </form>
              <div className="fixed bottom-0 m-2 bg-gray-800 text-white">
                <p>{accountCheck}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
