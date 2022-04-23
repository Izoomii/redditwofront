import { UserWithPosts } from "../globalVars/globals";
import Avatar from "./Avatar";

export default function AccountInfo(props: any) {
  const userInfo = props.userInfo as UserWithPosts;

  const hasName = () => {
    return userInfo.name === null
      ? "User hasn't defined a name."
      : userInfo.name;
  };
  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-1/5 w-fit flex justify-center m-2">
        <Avatar avatar={userInfo.avatar} />
      </div>
      <div className="text-center">
        <h1 className="text-2xl">{userInfo.nickname}</h1>
        <h2 className="text-lg text-gray-700">
          <i>{hasName()}</i>
        </h2>
      </div>
    </div>
  );
}
