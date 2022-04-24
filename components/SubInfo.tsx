import { Sub } from "../globalVars/globals";

export default function SubInfo(props: any) {
  const sub = props.sub as Sub;
  return (
    <div className="text-center text-white">
      <div className="text-2xl">{sub.name}</div>
      <div className="text-sm text-gray-600">
        <i>Owned by {sub.ownerName}</i>
      </div>
      <div className="text-l">
        <i>
          {sub.description ? sub.description : "Sub has no description yet"}
        </i>
      </div>
    </div>
  );
}
