import { useEffect, useState } from "react";
import { avatarPath } from "../globalVars/globals";

export default function Avatar(props: any) {
  const userAvatar = props.avatar as string | null;
  const [avatar, setAvatar] = useState(avatarPath + "0.png");
  useEffect(() => {
    if (userAvatar !== null) setAvatar(avatarPath + userAvatar);
  });

  return <img src={avatar} className="object-contain h-full rounded-full" />;
}
