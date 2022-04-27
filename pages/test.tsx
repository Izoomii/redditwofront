import { Container } from "../components/Container";
import { Header } from "../components/Header";

interface testProps {
  props: object;
}

export default function TestPage(props: testProps) {
  return (
    <Container>
      <div></div>
    </Container>
  );
}

// export const getStaticProps = async () => {
//   return {
//     props: {},
//   };
// };
