export default function Popup(props: any) {
  //uses two props, "show" which is boolean and "onClose" which you can define as a useState that turns "show" into false
  const show = props.show as boolean;
  const onClose = props.onClose as any; //CHNL
  return (show as boolean) ? (
    <div className="h-screen w-full bg-black bg-opacity-40 fixed top-0 left-0 flex justify-center items-center">
      <div className="flex flex-col h-1/2 w-1/2 bg-gray-500 p-2">
        <div className="grow flex flex-col justify-center">
          {props.children}
        </div>
        <button onClick={onClose} className="bg-blue-500 w-full">
          Close
        </button>
      </div>
      <div onClick={onClose} className="fixed w-full h-full -z-10"></div>
    </div>
  ) : null;
}
