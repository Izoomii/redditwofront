import axios from "axios";
import { useRef, useState } from "react";
import { Container } from "../components/Container";
import { backURL } from "../globalVars/globals";

export default function TestPage(props: any) {
  const [selectedImage, setSelectedImage] = useState("");
  const imageRef = useRef<any>();

  const testRequest = () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    axios
      .post(`${backURL}/test/post/lookback`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        console.log(data);
      });
  };

  return (
    <Container>
      <input
        type={"file"}
        ref={imageRef}
        onChange={() => {
          setSelectedImage(imageRef.current.files[0]);
        }}
      />

      <button
        onClick={() => {
          testRequest();
        }}
        className="p-2 bg-blue-600"
      >
        Click
      </button>
    </Container>
  );
}

// export const getStaticProps = async () => {
//   return {
//     props: {},
//   };
// };
