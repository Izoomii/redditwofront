import { useEffect, useState } from "react";
import { avatarsPath } from "../globalVars/globals";

export default function Avatar(props: any) {
  const userAvatar = props.avatar as string | null;
  const [avatar, setAvatar] = useState(avatarsPath + "0.png");
  useEffect(() => {
    if (userAvatar !== null) setAvatar(avatarsPath + userAvatar);
  }, [userAvatar]);

  return (
    <div className="h-full aspect-square">
      <img src={avatar} className="object-cover h-full rounded-full" />
    </div>
  );
}
