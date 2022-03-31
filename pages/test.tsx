import axios from "axios";
import React from "react";
import { Header } from "../components/Header";
import Popup from "../components/Popup";
import { backPort } from "../globalVars/globals";

interface testProps {
  props: object;
}

export default function TestPage(props: testProps) {
  // console.log(props);
  const [results, setResults] = React.useState<any>();
  const [popupShow, setPopupShow] = React.useState(false);

  // const testFuncPost = async () => {
  //   const sentData = { you: "loved", me: "loving you" };
  //   axios
  //     .post(`http://localhost:${backPort}/test`, sentData, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then(({ data }) => {
  //       console.log(data);
  //     });
  // };

  const testFuncGet = async (check: boolean) => {
    return check
      ? console.log("yeaaah this get excuted")
      : console.log("naah man :(");
  };
  return (
    <div>
      <Header></Header>
      <div>
        <button
          className="w-32 h-10 bg-blue-700"
          onClick={() => {
            // testFuncGet(false);
            setPopupShow(true);
          }}
        >
          Button to click
        </button>
      </div>
      <div>
        <div>This is a test page</div>
        <div>Test results if any: {results}</div>
        <div>
          Popup check:
          <Popup show={popupShow}>
            <div className="bg-white h-1/3 w-1/2 p-2 flex flex-col">
              <div className="grow">finna give u nigga cancer</div>
              <button
                onClick={() => {
                  setPopupShow(false);
                }}
                className="bg-blue-700 w-full"
              >
                Close
              </button>
            </div>
          </Popup>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
