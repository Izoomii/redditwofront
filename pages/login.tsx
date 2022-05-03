import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Page } from "../components/Page";
import { backURL, showPw } from "../globalVars/globals";

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

  const [showPassword, setShowPassword] = useState(false);

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [accountCheck, setAccountCheck] = useState("");

  useEffect(() => {
    axios
      .get(`${backURL}/users/verifyme`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        if (data.user) return router.push("/");
      });
  }, []);

  const checkUser = () => {
    if (nickname == "") {
      setAccountCheck("Please fill the nickname section.");
    } else {
      axios.get<User>(`${backURL}/auth/${nickname}`).then(({ data }) => {
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
        `${backURL}/auth/login`,
        JSON.stringify({ nickname, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      // data has any type, works, but should be fixed when possible CHNL
      .then(({ data }) => {
        if (data.authenticate == false) {
          setAccountCheck(data.message);
          setPassword("");
        } else {
          //this triggers a hard refresh to update header
          window.location.href = "/";
          console.log(data);
        }
      });
  };

  return (
    <Container>
      <div className="flex w-full flex-grow bg-gray-800 items-center justify-center">
        <div
          className={
            "flex w-1/4 h-1/4 bg-gray-700 justify-center items-center"
            //  + " focus-within:h-1/3 hover:w-1/3 transition-all ease-in-out duration-300"
          }
        >
          <div className="w-fit p-2 ">
            <div className="bg-white p-2 border-2 border-black">
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
                  type={showPw(showPassword)}
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
              <button
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <i>Show</i>
              </button>
              <br />
              <button
                className="bg-blue-300 w-full hover:bg-blue-400"
                onClick={() => {
                  loginUser();
                }}
              >
                Connect
              </button>
            </div>
            <div className="text-center text-blue-100">
              <Link href={"/createuser"}>Create an account</Link>
            </div>
            <div className="fixed bottom-0 m-2 bg-gray-800 text-white">
              <p>{accountCheck}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
