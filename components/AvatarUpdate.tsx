import axios from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { backURL } from "../globalVars/globals";

export default function AvatarUpdate() {
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState("");
  const inputRef = useRef<any>(); //CHNL

  const changeAvatar = async () => {
    // if (selectedImage === "") return console.log("No file selected");
    const formData = new FormData();
    formData.append("avatar", selectedImage);
    axios
      .post(backURL + "/users/updateavatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        if (data.updated) window.location.href = "/";
      });
  };

  const deleteAvatar = () => {
    axios
      .post(
        `${backURL}/users/deleteavatar`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log(data);
        window.location.href = "/settings";
      });
  };

  return (
    <div>
      <input
        type="file"
        name="newavatar"
        accept="image/*"
        onChange={() => setSelectedImage(inputRef.current.files[0])}
        ref={inputRef}
      />
      <button
        className="p-3 m-5 bg-blue-400"
        onClick={() => {
          changeAvatar();
        }}
      >
        Change avatar
      </button>
      <button
        className="p-2 m-2 bg-red-600"
        onClick={() => {
          deleteAvatar();
        }}
      >
        Delete Avatar
      </button>
    </div>
  );
}
