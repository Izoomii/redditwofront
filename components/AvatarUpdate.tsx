import axios from "axios";
import Router from "next/router";
import React from "react";
import { backPort } from "../globalVars/globals";

export default function AvatarUpdate() {
  const [selectedImage, setSelectedImage] = React.useState("");
  const inputRef = React.useRef<any>(); //CHNL

  const changeAvatar = async () => {
    if (selectedImage === "") return console.log("No file selected");
    const formData = new FormData();
    formData.append("avatar", selectedImage);
    console.log(formData);
    console.log(selectedImage);
    axios
      .post(`http://localhost:${backPort}/users/updateavatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        if (data.updated) Router.push("/");
      });
  };

  return (
    <div>
      <input
        type="file"
        name="newavatar"
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
    </div>
  );
}
