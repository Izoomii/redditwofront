import React from "react";

export const Main = (props: any) => {
  return (
    <div className="flex-col flex-grow h-full bg-gray-800 text-white p-5">
      {props.children}
    </div>
  );
};
