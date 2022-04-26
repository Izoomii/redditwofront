import { useEffect, useState } from "react";
import { Sub, subImagesPath } from "../globalVars/globals";

export default function SubInfo(props: any) {
  const sub = props.sub as Sub;
  const [subImage, setSubImage] = useState(subImagesPath + "0.png");

  useEffect(() => {
    if (sub.image) {
      setSubImage(subImagesPath + sub.image);
      console.log(sub.image);
    }
  });

  return (
    <div className="text-center text-white">
      <div>
        <img src={subImage} className="object-contain h-full rounded-full" />
      </div>
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
