import axios from "axios";
import React from "react";
import { Header } from "../components/Header";
import { backPort } from "../globalVars/globals";

interface testProps {
  props: object;
}

export default function TestPage(props: testProps) {

  return (
    <div>
      <Header />
      <div>

      </div>

    </div>
  );
}

// export const getStaticProps = async () => {
//   return {
//     props: {},
//   };
// };
