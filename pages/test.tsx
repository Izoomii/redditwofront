import axios from "axios";
import React from "react";
import { Header } from "../components/Header";
import { backPort } from "../globalVars/globals";

interface testProps {
  props: object;
}

export default function TestPage(props: testProps) {
  const [selectedImage, setSelectedImage] = React.useState<any>();

  const sendImage = async () => {
    const formData = new FormData();
    formData.append("imageTest", selectedImage);
    axios
      .post(`http://localhost:${backPort}/test/post/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        console.log(data);
      });
  };

  return (
    <div>
      <Header />
      <div>
        <input
          type="file"
          name="imageTest"
          onChange={(event) => {
            setSelectedImage(event.target.value);
          }}
        />
      </div>
      <button
        className="p-3 m-5 bg-blue-400"
        onClick={() => {
          sendImage();
        }}
      >
        Send Image
      </button>
    </div>
  );
}

// export const getStaticProps = async () => {
//   return {
//     props: {},
//   };
// };
