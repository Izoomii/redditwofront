import Link from "next/link";
import { useEffect, useState } from "react";
import { Sub, subImagesPath } from "../globalVars/globals";

export default function SubInfo(props: any) {
  const sub = props.sub as Sub;
  const [subImage, setSubImage] = useState(subImagesPath + "0.png");

  useEffect(() => {
    if (sub.image) {
      setSubImage(subImagesPath + sub.image);
    }
  }, []);

  return (
    <div className="text-center text-white">
      <div className="flex h-32 justify-center">
        <img
          src={subImage}
          className="object-cover h-full aspect-square rounded-full"
        />
      </div>
      <div className="text-2xl">{sub.name}</div>
      <div className="text-sm text-gray-600">
        <Link href={`/users/${sub.ownerName}`}>
          <i>Owned by {sub.ownerName}</i>
        </Link>
      </div>
      <div className="text-l">
        <i>
          {sub.description ? sub.description : "Sub has no description yet"}
        </i>
      </div>
    </div>
  );
}
