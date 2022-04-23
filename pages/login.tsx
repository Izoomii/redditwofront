import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Header } from "../components/Header";
import { Page } from "../components/Page";
import { backURL } from "../globalVars/globals";

interface User {
  id: string;
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

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [accountCheck, setAccountCheck] = useState("");

  const checkUser = () => {
    if (nickname == "") {
      setAccountCheck("Please fill the nickname section.");
    } else {
      axios.get<User>(backURL + "/auth/" + nickname).then(({ data }) => {
        if (data.nickname === nickname) {
          setAccountCheck(`${nickname} exists!`);
        } else {
          setAccountCheck(`${nickname} does not exist.`);
        }
      });
    }
  };

  const loginUser = async () => {
    axios
      .post<authRes>(
        backURL + "/auth/login",
        JSON.stringify({ nickname, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      // data has any type, works, but should be fixed when possible
      .then(({ data }) => {
        if (data.authenticate == false) {
          setAccountCheck(data.message);
        } else {
          router.push("/");
          console.log(data);
        }
      });
  };

  return (
    <div>
      <Page>
        <Header />
        <div className="flex w-full flex-grow bg-gray-800 items-center justify-center">
          <div
            className={
              "flex w-1/4 h-1/4 bg-gray-700 justify-center items-center"
              //  + " focus-within:h-1/3 hover:w-1/3 transition-all ease-in-out duration-300"
            }
          >
            <div className="w-fit p-2 ">
              <form
                className="bg-white p-2"
                action={backURL + "/auth/login"}
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
              <div className="text-center text-blue-100">
                <Link href={"/createuser"}>Create an account</Link>
              </div>
              <div className="fixed bottom-0 m-2 bg-gray-800 text-white">
                <p>{accountCheck}</p>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </div>
  );
}
