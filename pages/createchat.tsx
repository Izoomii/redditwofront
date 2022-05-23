import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { backURL, User } from "../globalVars/globals";

export default function CreateChat() {
  const router = useRouter();

  const [validUsers, setValidUsers] = useState<boolean>(true);

  const [alert, setAlert] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [chatName, setChatName] = useState("");
  const [addedUsers, setAddedUsers] = useState<string[]>([]);
  const checkUser = () => {
    axios
      .get(`${backURL}/users/verifyme`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const user = data.user as User;
        if (user === null) return router.push("/login");
        setUser(user);
      });
  };

  //makes sure array is valid before sending it to create request
  const validateUsers = async () => {
    //removes empty spaces and duplicates
    const usersArr = addedUsers
      .filter((n) => n)
      .filter((c, i) => {
        return addedUsers.indexOf(c) === i;
      });
    if (usersArr.length === 0) return setAlert("Please fill this section");
    axios
      .post(
        `${backURL}/users/verifymultiple`,
        {
          users: usersArr,
        },
        { withCredentials: true }
      )
      .then(({ data }) => {
        const valid = data.valid as boolean;
        if (!valid) return setAlert("One or more nicknames are wrong.");
        setAlert("All good");
        const users = data.users as object[];
        axios
          .post(
            `${backURL}/chats/createchat`,
            { participants: users, name: chatName },
            {
              withCredentials: true,
            }
          )
          .then(({ data }) => {
            setAlert("Chat created!");
          });
      });
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Container>
      <Main>
        <div>Give your chat a name:</div>
        <input
          value={chatName}
          onChange={(event) => {
            setChatName(event.target.value);
          }}
          className="text-black"
        />
        <div>Add participants:</div>
        <input
          value={addedUsers.join(" ")}
          onChange={(event) => {
            setAddedUsers(event.target.value.split(" "));
          }}
          className="w-full text-black"
        ></input>
        <p className="text-sm text-red-500">{alert}</p>
        <button
          onClick={() => {
            validateUsers();
          }}
        >
          Create chat
        </button>
      </Main>
    </Container>
  );
}
