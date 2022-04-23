export const Container = (props: any) => {
  return (
    <div id="main" className="bg-gray-700 flex-grow p-5">
      <div className="flex h-full w-full">{props.children}</div>
    </div>
  );
};
