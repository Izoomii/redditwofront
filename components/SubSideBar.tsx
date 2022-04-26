import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { backURL, Sub } from "../globalVars/globals";
import { Sidebar } from "./Sidebar";
import SubInfo from "./SubInfo";

export default function SubSideBar(props: any) {
  const sub = props.sub as Sub;
  const [subscriptionStatus, setSubscriptionStatus] = useState("Subscribe");

  const subscribe = () => {
    axios
      .post(
        `${backURL}/subs/subscribe/${sub.id}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log(data);
        checkSubscription();
      });
  };

  const checkSubscription = () => {
    axios
      .get(`${backURL}/subs/subscribe/${sub.id}`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        setSubscriptionStatus(
          data.subscribed === true ? "Subscribed" : "Subscribe"
        );
      });
  };

  useEffect(() => {
    checkSubscription();
  }, []);

  return (
    <Sidebar>
      <SubInfo sub={sub} />
      <div>
        <button
          onClick={async () => {
            subscribe();
          }}
          className="my-2 bg-blue-900 w-full"
        >
          {subscriptionStatus}
        </button>
        <div className="p-2 my-3 bg-blue-600 text-center">
          <Link href={`/createpost?sub=${sub.name}`}>Create Post</Link>
        </div>
      </div>
    </Sidebar>
  );
}
