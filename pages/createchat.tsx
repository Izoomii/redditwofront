import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Main } from "../components/Main";
import { backURL, User } from "../globalVars/globals";

export default function CreateChat() {
  const router = useRouter();

  const [validUsers, setValidUsers] = useState<boolean>(true);

  const [alert, setAlert] = useState("");
  const [user, setUser] = useState<User | null>(null);
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

  const validateUsers = async () => {
    //removes empty spaces and duplicates
    const usersArr = addedUsers
      .filter((n) => n)
      .filter((c, i) => {
        return addedUsers.indexOf(c) === i;
      });
    console.log(usersArr);
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
        const users = data.users as object[];
        setAlert("All good");
        axios
          .post(
            `${backURL}/chats/createchat`,
            { participants: users },
            {
              withCredentials: true,
            }
          )
          .then(({ data }) => {
            console.log(data);
          });
      });
  };

  return (
    <div>
      <Main>
        <p>{alert}</p>
        <input
          value={addedUsers.join(" ")}
          onChange={(event) => {
            setAddedUsers(event.target.value.split(" "));
          }}
          className="w-full text-black"
        ></input>
        <button
          onClick={() => {
            validateUsers();
          }}
        >
          Create chat
        </button>
      </Main>
    </div>
  );
}
