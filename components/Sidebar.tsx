import React from "react";

export const Sidebar = (props: any) => {
  return (
    <div className="w-1/4 bg-gray-800 ml-5 p-5">
      <div className="bg-gray-900 w-full h-full text-white p-1">
        {props.children}
      </div>
    </div>
  );
};
