import axios from "axios";
import React from "react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Page } from "../components/Page";
import PasswordReset from "../components/PasswordReset";
import Popup from "../components/Popup";
import { backPort } from "../globalVars/globals";

export default function Settings(props: any) {
  const [disabled, setDisabled] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  // const [password, setPassword] = React.useState("");

  const [pwPopupShow, setPwPopupShow] = React.useState(false);
  const editButtonText = (disabled: boolean) => {
    return disabled ? "Edit info" : "Discard";
  };

  //checks if there is a user first, dont need it now
  // const router = useRouter();
  // axios
  //   .get(`http://localhost:${backPort}/users/verifyme`, {
  //     withCredentials: true,
  //   })
  //   .then(({ data }) => {
  //     if (!data.user) {
  //       router.push("/login");
  //     }
  //   });

  return (
    <div>
      <Page>
        <Header />
        <Container>
          <div className="flex flex-col w-full h-full">
            <h1 className="text-4xl m-2">Settings</h1>
            <div className="w-full flex justify-center">
              <div className="w-11/12 bg-gray-600 flex flex-col">
                <div className="w-1/2">
                  <table className="table-auto h-24 w-2/3">
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
                  <button
                    className="bg-blue-600 rounded-sm w-24 m-2"
                    onClick={() => {
                      setDisabled(!disabled);
                      setEmail("");
                      setName("");
                    }}
                  >
                    {editButtonText(disabled)}
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
