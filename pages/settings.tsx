import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import AccountInfo from "../components/AccountInfo";
import AvatarUpdate from "../components/AvatarUpdate";
import { Container } from "../components/Container";
import PasswordReset from "../components/PasswordReset";
import Popup from "../components/Popup";
import PremiumSettings from "../components/PremiumSettings";
import { Sidebar } from "../components/Sidebar";
import { backURL, User } from "../globalVars/globals";

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);

  const [alert, setAlert] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [originalEmail, setOriginalEmail] = useState("");
  const [originalNickname, setOriginalNickname] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");

  const [avatar, setAvatar] = useState("");
  const avatarRef = useRef<any>();

  const [pwPopupShow, setPwPopupShow] = useState(false);
  const editButtonText = (disabled: boolean) => {
    return disabled ? "Edit info" : "Discard";
  };

  // checks if there is a user first, dont need it now
  const router = useRouter();

  const logout = async () => {
    axios
      .post(
        backURL + "/users/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        window.location.href = "/login";
        console.log(data);
      });
  };

  const deleteAvatar = () => {
    axios
      .post(
        `${backURL}/users/deleteavatar`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log(data);
        window.location.href = "/settings";
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(backURL + "/users/verifyme", {
          withCredentials: true,
        })
        .then(({ data }) => {
          const user = data.user as User;
          if (!user) return router.push("/login");
          setUser(user);
          //CHNL
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
  const updateInfo = async () => {
    if (
      email === originalEmail &&
      name === originalName &&
      nickname === originalNickname &&
      avatar === ""
    ) {
      //using the one line if return here doesn't stop axios from sending the request, probably bc its async ?
      return console.log("You haven't changed anything.");
    } else {
      const updateForm = new FormData();
      updateForm.append("email", email);
      updateForm.append("nickname", nickname);
      updateForm.append("name", name);
      updateForm.append("avatar", avatar);
      axios
        .post(backURL + "/users/update", updateForm, {
          withCredentials: true,
          headers: {
            "Content-Type": "Multipart/form-data",
          },
        })
        .then(({ data }) => {
          if (data.updated === true) {
            // return router.push("/");
            window.location.href = "/";
          }
          setAlert(data.message ? data.message : "");
        });
    }
  };

  return (
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
                      <td>Avatar: </td>
                      <td className="flex">
                        <input
                          type={"file"}
                          disabled={disabled}
                          ref={avatarRef}
                          onChange={() => {
                            setAvatar(avatarRef.current.files[0]);
                          }}
                        />
                        <button
                          disabled={disabled}
                          onClick={() => {
                            deleteAvatar();
                          }}
                          className="p-1 bg-red-500 disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>Password:</td>
                      <td>
                        <button
                          disabled={disabled}
                          onClick={() => {
                            setPwPopupShow(!pwPopupShow); // maybe change this one to true only ? IMPL
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
                <p>{alert}</p>
                <div className="flex w-full justify-between p-2">
                  <button
                    className={`${
                      disabled ? "bg-blue-600 " : "bg-red-600"
                    } rounded-sm w-24`}
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
                      updateInfo();
                    }}
                    className="bg-blue-600 w-1/2 disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
              </div>
              {/* <AvatarUpdate /> */}
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
          <Sidebar>
            {user ? (
              <div>
                <AccountInfo user={user} />
                <PremiumSettings user={user} />
              </div>
            ) : null}
          </Sidebar>
        </div>
      </div>
    </Container>
  );
}
