import axios from "axios";
import { Container } from "../components/Container";
import { backURL } from "../globalVars/globals";

interface testProps {
  props: object;
}

export default function TestPage(props: testProps) {
  const testRequest = () => {
    const formData = new FormData();
    formData.append("thing1", "bruh");
    formData.append("bruh2", "idk");

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
