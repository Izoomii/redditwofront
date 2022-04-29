import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { backURL, Sub, User } from "../globalVars/globals";
import Popup from "./Popup";
import { Sidebar } from "./Sidebar";
import SubInfo from "./SubInfo";
import SubSettings from "./SubSettings";

export default function SubSideBar(props: any) {
  const sub = props.sub as Sub;
  const [subscriptionStatus, setSubscriptionStatus] = useState("Subscribe");
  const [showSubSettingsPopup, setShowSubSettingsPopup] = useState(false);

  const [editable, setEditable] = useState(false);

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
        setSubscriptionStatus(
          data.subscribed === true ? "Subscribed" : "Subscribe"
        );
      });
  };

  const checkOwnership = () => {
    axios
      .get(`${backURL}/users/verifyme`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const user = data.user as User;
        if (user) {
          if (user.nickname === sub.ownerName) {
            setEditable(true);
          }
        }
      });
  };

  useEffect(() => {
    checkSubscription();
    checkOwnership();
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
        <div>
          {editable ? (
            <button
              onClick={() => {
                setShowSubSettingsPopup(true);
              }}
              className="p-1 bg-red-600"
            >
              Edit Your Sub
            </button>
          ) : null}
        </div>
        <Popup
          show={showSubSettingsPopup}
          onClose={() => {
            setShowSubSettingsPopup(false);
          }}
        >
          <SubSettings sub={sub} />
        </Popup>
      </div>
    </Sidebar>
  );
}
