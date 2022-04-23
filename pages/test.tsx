import { Header } from "../components/Header";

interface testProps {
  props: object;
}

export default function TestPage(props: testProps) {
  return (
    <div>
      <Header />
      <div></div>
    </div>
  );
}

// export const getStaticProps = async () => {
//   return {
//     props: {},
//   };
// };
