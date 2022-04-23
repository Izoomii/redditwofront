export default function Popup(props: any) {
  return (props.show as boolean) ? (
    <div
      id="mainDiv"
      className="h-screen w-full bg-black bg-opacity-40 fixed top-0 left-0 flex justify-center items-center"
    >
      <div className="flex flex-col h-1/2 w-1/2 bg-gray-500 p-2">
        <div className="grow flex flex-col justify-center">
          {props.children}
        </div>
        <button onClick={props.onClose} className="bg-blue-500 w-full">
          Close
        </button>
      </div>
    </div>
  ) : null;
}
