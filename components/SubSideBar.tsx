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
        <Link href={`/createpost?sub=${sub.name}`}>
          <button className="p-2 my-3 w-full bg-blue-600 text-center">
            Create Post
          </button>
        </Link>
      </div>
    </Sidebar>
  );
}
