import { User } from "../globalVars/globals";
import Avatar from "./Avatar";

export default function AccountInfo(props: any) {
  const user = props.user as User;

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-1/5 w-fit flex justify-center m-2">
        <Avatar avatar={user.avatar} />
      </div>
      <div className="text-center">
        <h1 className="text-2xl">{user.nickname}</h1>
        <h2 className="text-lg text-gray-700">
          <i>
            {user.name === null ? "User hasn't defined a name." : user.name}
          </i>
        </h2>
      </div>
    </div>
  );
}
