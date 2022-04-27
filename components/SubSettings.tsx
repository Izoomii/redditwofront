import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { backURL, Sub } from "../globalVars/globals";

//sub settings that show on popup
export default function SubSettings(props: any) {
  const router = useRouter();

  const sub = props.sub as Sub;
  const [alert, setAlert] = useState("");

  const [name, setName] = useState(sub.name);
  const [description, setDescription] = useState(
    sub.description ? sub.description : ""
  );

  const [selectedImage, setSelectedImage] = useState("");
  const imageRef = useRef<any>();

  const updateSub = () => {
    const formData = new FormData();
    if (name === "") return setAlert("Invalid Name.");
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", selectedImage);

    axios
      .post(`${backURL}/subs/updatesub/${sub.id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        router.push(`/subs/${name}`);
      });
  };

  return (
    <div className="flex flex-col h-full w-full p-3 text-black">
      <div className="flex h-full w-full">
        <div className="w-1/3 h-full bg-gray-700">
          <label htmlFor="name">Name: </label>
          <br />
          <label htmlFor="image">Image: </label>
          <br />
          <label htmlFor="description">Description: </label>
        </div>
        <div className="grow h-full bg-gray-600">
          <input
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            id="image"
            type={"file"}
            onChange={() => {
              setSelectedImage(imageRef.current.files[0]);
            }}
            ref={imageRef}
          />
          <textarea
            id="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
      </div>
      <p>{alert}</p>
      <button
        onClick={() => {
          updateSub();
        }}
      >
        Update
      </button>
    </div>
  );
}
