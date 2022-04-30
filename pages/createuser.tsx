import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Page } from "../components/Page";
import { backURL, verifyPasswordStrength, showPw } from "../globalVars/globals";

//add the essentials then see about adding the extra things.
interface Requirements {
  nickname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

export default function CreateUser() {
  const router = useRouter();

  const [alert, setAlert] = useState("");
  const [image, setImage] = useState("");
  const imageRef = useRef<any>();

  const [showOriginalPw, setShowOriginalPw] = useState(false);
  const [showRepeatPw, setShowRepeatPw] = useState(false);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  //see if this can be written in a better way IMPL
  //fuck me it can
  const checkInfo = () => {
    if (!nickname) {
      setAlert("Nickname cannot be left empty");
      return false;
    }
    if (!email) {
      setAlert("Email cannot be left empty");
      return false;
    }
    if (!verifyPasswordStrength(password)) {
      setAlert(
        "Password must be a combination of at least 8 lowercase and uppercase letters, digits and special characters."
      );
      return false;
    }
    setAlert("");
    return true;
  };

  const submitInfo = async () => {
    if (!checkInfo()) return;
    const newUserInfo = new FormData();
    newUserInfo.append("nickname", nickname);
    newUserInfo.append("email", email);
    newUserInfo.append("password", password);
    newUserInfo.append("repeatPassword", repeatPassword);
    if (image) newUserInfo.append("avatar", image);
    axios
      .post(`${backURL}/users/createuser`, newUserInfo, {
        withCredentials: true,
        headers: {
          "Content-Type": "Multipart/form-data",
        },
      })
      .then(({ data }) => {
        console.log(data);
        setAlert(data.message);
        window.location.href = "/";
      });
  };

  return (
    <Container>
      <Main>
        <div className="grow flex flex-col items-center">
          <div className="w-2/3 bg-gray-700 text-black">
            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td>Nickname: </td>
                  <td>
                    <input
                      value={nickname}
                      onChange={(event) => {
                        setNickname(event.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Email: </td>
                  <td>
                    <input
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password: </td>
                  <td>
                    <input
                      value={password}
                      type={showPw(showOriginalPw)}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        setShowOriginalPw(!showOriginalPw);
                      }}
                    >
                      <i>Show</i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Repeat Password: </td>
                  <td>
                    <input
                      value={repeatPassword}
                      type={showPw(showRepeatPw)}
                      onChange={(event) => {
                        setRepeatPassword(event.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        setShowRepeatPw(!showRepeatPw);
                      }}
                    >
                      <i>Show</i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <p className="text-xs text-red-400 break-words">{alert}</p>
                  </td>
                </tr>
                <tr>
                  <td>Select an Image: </td>
                  <td>
                    <input
                      type="file"
                      name="avatar"
                      onChange={() => {
                        setImage(imageRef.current.files[0]);
                      }}
                      ref={imageRef}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={() => {
                submitInfo();
              }}
              className="p-2 bg-blue-900"
            >
              Create Account
            </button>
          </div>
        </div>
      </Main>
    </Container>
  );
}
