import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Container } from "../components/Container";
import { backURL } from "../globalVars/globals";

export default function CreatePost() {
  const router = useRouter();

  const subNameFromQuery = router.query.sub as string;

  const [title, setTitle] = useState("");
  const [subName, setSubName] = useState("");
  const [content, setContent] = useState("");
  const [update, setUpdate] = useState("");

  const [selectedImage, setSelectedImage] = useState("");
  const imageRef = useRef<any>();

  useEffect(() => {
    setSubName(subNameFromQuery ? subNameFromQuery : "");
  }, []);

  const submitPost = async () => {
    let data = { subName, title, content };
    const formData = new FormData();
    formData.append("subName", subName);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", selectedImage);
    if (title == "") return setUpdate("No title given.");
    if (subName == "") return setUpdate("No sub given.");
    axios
      .post(backURL + "/posts/createpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
      });
  };

  return (
    <Container>
      <div className="flex flex-col justify-center w-full h-full bg-gray-700">
        <div
          onFocus={() => {
            setUpdate("");
          }}
        >
          <label>
            Sub
            <input
              name="subName"
              value={subName}
              onChange={(event) => {
                setSubName(event.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Title
            <input
              name="title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Content
            <textarea
              name="content"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            ></textarea>
          </label>
          <label>
            Image
            <input
              name="image"
              type={"file"}
              onChange={() => {
                setSelectedImage(imageRef.current.files[0]);
              }}
              ref={imageRef}
            />
          </label>
          <br />
          <br />
          <button
            className="bg-blue-800 hover:bg-blue-600 w-32"
            onClick={() => {
              submitPost();
            }}
          >
            Submit or whatever
          </button>
          <p>{update}</p>
        </div>
      </div>
    </Container>
  );
}
