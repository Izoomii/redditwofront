import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { backURL, Post } from "../globalVars/globals";

export default function PostSettings(props: any) {
  const router = useRouter();

  const post = props.post as Post;
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [selectedImage, setSelectedImage] = useState("");
  const imageRef = useRef<any>();
  const [alert, setAlert] = useState("");

  const updatePost = () => {
    if (!title) return setAlert("Cannot have an empty title");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    axios
      .post(`${backURL}/posts/updatepost/${post.id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "Multipart/form-data",
        },
      })
      .then(({ data }: AxiosResponse<any>) => {
        router.reload();
      });
  };

  return (
    <div className="flex flex-col w-full h-full p-3">
      <div className="flex h-full w-full  text-black">
        <div className="w-1/3 bg-gray-600">
          <label htmlFor="title">Title:</label>
          <br />
          <label htmlFor="image">Image:</label>
          <br />
          <label htmlFor="content">Content:</label>
        </div>
        <div className="grow ">
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <input
            type={"file"}
            accept="image/*"
            ref={imageRef}
            onChange={() => {
              setSelectedImage(imageRef.current.files[0]);
            }}
          />
          <textarea
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
            className="w-2/3 h-1/2"
          ></textarea>
        </div>
      </div>
      <p>{alert}</p>
      <button
        onClick={() => {
          updatePost();
        }}
        className="w-full bg-green-400 p-2"
      >
        Update Post
      </button>
    </div>
  );
}
