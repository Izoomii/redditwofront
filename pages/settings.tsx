import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import AvatarUpdate from "../components/AvatarUpdate";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Page } from "../components/Page";
import PasswordReset from "../components/PasswordReset";
import Popup from "../components/Popup";
import { backPort, User } from "../globalVars/globals";

export default function Settings(props: any) {
  const [disabled, setDisabled] = React.useState(true);
  const [originalEmail, setOriginalEmail] = React.useState("");
  const [originalNickname, setOriginalNickname] = React.useState("");
  const [originalName, setOriginalName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [name, setName] = React.useState("");
  // const [password, setPassword] = React.useState("");

  const [pwPopupShow, setPwPopupShow] = React.useState(false);
  const editButtonText = (disabled: boolean) => {
    return disabled ? "Edit info" : "Discard";
  };

  // checks if there is a user first, dont need it now
  const router = useRouter();

  const logout = async () => {
    axios
      .post(
        `http://localhost:${backPort}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log(data);
      });
    router.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`http://localhost:${backPort}/users/verifyme`, {
          withCredentials: true,
        })
        .then(({ data }) => {
          const user = data.user as User;
          if (!user) return router.push("/login");
          setOriginalNickname(user.nickname);
          setOriginalEmail(user.email);
          setOriginalName(user.name === null ? "" : (user.name as string));
          setEmail(user.email);
          setNickname(user.nickname);
          setName(user.name === null ? "" : (user.name as string));
        });
    };
    fetchData();
  }, []);

  //refresh the page after applying
  const validateInfo = async () => {
    if (
      email === originalEmail &&
      name === originalName &&
      nickname === originalNickname
    ) {
      //using the one line if return here doesn't stop axios from sending the request, probably bc its async ?
      return console.log("You haven't changed anything.");
    } else {
      axios
        .post(
          `http://localhost:${backPort}/users/update`,
          {
            email,
            nickname,
            name,
          },
          {
            withCredentials: true,
          }
        )
        .then(({ data }) => {
          console.log(data);
          if (data.updated) router.push("/");
        });
    }
  };

  return (
    <div>
      <Page>
        <Header />
        <Container>
          <div className="flex flex-col w-full h-full">
            <h1 className="text-4xl m-2">Settings</h1>
            <div className="w-full flex justify-center">
              <div className="w-11/12 bg-gray-600 flex flex-col p-3">
                <div className="w-full flex justify-between">
                  <div className="w-2/5">
                    <table className="table-auto  w-full">
                      <tbody>
                        <tr>
                          <td>Email:</td>
                          <td>
                            <input
                              disabled={disabled}
                              value={email}
                              onChange={(event) => {
                                setEmail(event.target.value);
                              }}
                              className="w-full"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Nickname:</td>
                          <td>
                            <input
                              disabled={disabled}
                              value={nickname}
                              onChange={(event) => {
                                setNickname(event.target.value);
                              }}
                              className="w-full"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Name:</td>
                          <td>
                            <input
                              disabled={disabled}
                              value={name}
                              onChange={(event) => {
                                setName(event.target.value);
                              }}
                              className="w-full"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Password:</td>
                          <td>
                            <button
                              disabled={disabled}
                              onClick={() => {
                                setPwPopupShow(!pwPopupShow);
                              }}
                              className="bg-blue-500 rounded-sm w-full disabled:opacity-50"
                            >
                              Change Password
                            </button>

                            <Popup
                              show={pwPopupShow}
                              onClose={() => {
                                setPwPopupShow(false);
                              }}
                            >
                              <PasswordReset />
                            </Popup>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex w-full justify-between p-2">
                      <button
                        className="bg-blue-600 rounded-sm w-24"
                        onClick={() => {
                          setDisabled(!disabled);
                          if (!disabled) {
                            setEmail(originalEmail);
                            setNickname(originalNickname);
                            setName(originalName);
                          }
                        }}
                      >
                        {editButtonText(disabled)}
                      </button>
                      <button
                        disabled={disabled}
                        onClick={() => {
                          validateInfo();
                        }}
                        className="bg-blue-600 w-1/2 disabled:opacity-50"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  <AvatarUpdate />
                </div>
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => {
                      logout();
                    }}
                    className="bg-red-600 p-2"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Page>
    </div>
  );
}
