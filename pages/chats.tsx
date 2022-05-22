import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { Sidebar } from "../components/Sidebar";
import { backURL, Chat, Ticket, Message, User } from "../globalVars/globals";

export default function Chats() {
  const router = useRouter();

  const [userMessage, setUserMessage] = useState("");

  const [currentChatId, setCurrentChatId] = useState<String>("");

  const [messages, setMessages] = useState<Message[]>([]);
  const [chatsList, setChatsList] = useState<Ticket[]>([]);
  const [user, setUser] = useState<User | null>(null);

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

  const checkAddedUser = () => {
    //`${backURL}/auth/${nickname}`
  };

  const sendMessage = () => {
    if (userMessage === "") return console.log("Message empty");
    axios
      .post(
        `${backURL}/chats/${currentChatId}/sendmessage`,
        {
          content: userMessage,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        setUserMessage("");
        updateMessages();
      });
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user === null) return;
    axios
      .get(`${backURL}/chats/`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const chats = data as Ticket[];
        console.log(chats); //logs twice, IMPL
        setChatsList(chats);
        setCurrentChatId(chats[0].chatId);
      });
  }, [user]);

  const updateMessages = () => {
    if (currentChatId === ("" || null) && chatsList.length > 0)
      setCurrentChatId(chatsList[0].chatId);
    axios
      .get(`${backURL}/chats/${currentChatId}`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        // if (currentChatId === ("" || null)) return setMessages([]);
        const messages = data as Message[];
        setMessages(messages);
      });
  };
  useEffect(() => {
    if (user === null) return;
    updateMessages(); //this should be improved to updated automatically every couple seconds
  }, [currentChatId]);

  return (
    <Container>
      <Main>
        <div>
          {messages.length < 1 ? (
            <div className="italic">nothing here..</div>
          ) : (
            messages.map((e, i) => {
              return (
                <div key={i}>
                  [{e.ownerName}]: {e.content}
                </div>
              );
            })
          )}
        </div>
        <div className="bg-gray-700 text-black p-2">
          <input
            value={userMessage}
            onChange={(event) => {
              setUserMessage(event.target.value);
            }}
            className="w-3/4"
          />
          <button
            onClick={() => {
              sendMessage();
            }}
            className="m-1 p-1 bg-blue-600 "
          >
            Send
          </button>
        </div>
      </Main>
      <Sidebar>
        Chat list here
        {chatsList.map((e, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                setCurrentChatId(e.chatId);
              }}
              className="m-2 p-2 bg-slate-600"
            >
              {e.chat.name === null ? `[UNNAMED CHAT]` : e.chat.name}
            </div>
          );
        })}
      </Sidebar>
    </Container>
  );
}
