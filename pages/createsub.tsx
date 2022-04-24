import axios from "axios";
import { useState } from "react";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Main } from "../components/Main";
import { Page } from "../components/Page";
import { backURL } from "../globalVars/globals";

export default function CreateSub() {
  const [name, setName] = useState("");
  const [alert, setAlert] = useState("");

  const createSub = async () => {
    if (!name) return setAlert("Name field is empty.");
    axios
      .post(
        `${backURL}/subs/createsub`,
        { name },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        setAlert(data.message);
      });
  };

  return (
    <div>
      <Page>
        <Header />
        <Container>
          <Main>
            <div className="flex flex-col text-black">
              <div>Sub Name: </div>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <button
                onClick={() => {
                  createSub();
                }}
                className="p-2 bg-blue-700"
              >
                Create Sub
              </button>
              <p>{alert}</p>
            </div>
          </Main>
        </Container>
      </Page>
    </div>
  );
}
