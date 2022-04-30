import axios from "axios";
import { useRef, useState } from "react";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { backURL } from "../globalVars/globals";

export default function CreateSub() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState("");

  const [selectedImage, setSelectedImage] = useState("");
  const imageRef = useRef<any>();

  const createSub = async () => {
    if (!name) return setAlert("Name field is empty.");
    const subInfo = new FormData();
    subInfo.append("name", name);
    subInfo.append("description", description);
    if (selectedImage) subInfo.append("image", selectedImage);
    axios
      .post(`${backURL}/subs/createsub`, subInfo, {
        withCredentials: true,
        headers: {
          "Content-Type": "Multipart/form-data",
        },
      })
      .then(({ data }) => {
        setAlert(data.message);
      });
  };

  return (
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
          <div>Sub Image: </div>
          <input
            type={"file"}
            ref={imageRef}
            onChange={() => setSelectedImage(imageRef.current.files[0])}
          />
          <div>Description: </div>
          <textarea
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          ></textarea>
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
  );
}
