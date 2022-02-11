import React from "react";

/*
model User {
  //id      Int     @id @default(autoincrement())
  email     String  @unique
  nickname  String  @unique
  password  String
  name      String?
  post      Post[]
}
*/

interface User {
  id: number;
  email: string;
  nickname: string;
  password: string;
  name?: string;
  post: string;
}

export default function Accounts() {
  const [user, setUser] = React.useState("");
  const [nicknameCheck, setNicknameCheck] = React.useState("");

  const checkUser = () => {
    if (user == "") {
      setNicknameCheck("Please fill the nickname section.");
    } else {
      fetch(`http://localhost:8080/auth/${user}`)
        .then((response) => response.json())
        .then((data: User) => {
          if (data.nickname === user) {
            setNicknameCheck(`${user} exists!`);
          } else {
            setNicknameCheck(`${user} does not exist.`);
          }
        });
    }
  };

  return (
    <div>
      <button
        className="fixed right-0 top-1/2 w-20 h-10 bg-blue-500 hover:bg-blue-700"
        onClick={() => {
          console.log("Clicked. :)");
        }}
      >
        Click me
      </button>
      <div className="w-fit p-2">
        <form
          action="http://localhost:8080/auth/login"
          method="POST"
          style={{ border: "1px solid black" }}
        >
          <label>
            Password:
            <input
              name="nickname"
              type="text"
              placeholder="Nickname"
              onFocus={() => {
                setNicknameCheck("");
              }}
              onChange={(event) => {
                setUser(event.target.value);
              }}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="text"
              placeholder="Password"
              onFocus={() => {
                checkUser();
              }}
            />
          </label>
          <br />
          <button
            type="submit"
            className="bg-blue-300 w-full hover:bg-blue-400"
          >
            Connect
          </button>
        </form>
        <div className="m-2 bg-gray-800 text-white">
          <p>{nicknameCheck}</p>
        </div>
      </div>
    </div>
  );
}
