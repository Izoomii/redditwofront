import React from "react";

export default function PasswordReset() {
  const [showOriginalPw, setShowOriginalPw] = React.useState(false);
  const [showNewPw, setShowNewPw] = React.useState(false);
  const [showRepeatPw, setShowRepeatPw] = React.useState(false);

  const showPw = (check: boolean) => {
    if (check) {
      return "text";
    } else {
      return "password";
    }
  };
  
  return (
    <table className="w-full h-1/4 border-solid border-2">
      <tbody>
        <tr>
          <td>Old Password:</td>
          <td>
            <input className="w-full" type={showPw(showOriginalPw)} />
          </td>
          <td>
            <button
              onClick={() => {
                setShowOriginalPw(!showOriginalPw);
              }}
            >
              <i>Show</i>
            </button>
          </td>
        </tr>
        <tr>
          <td>New Password:</td>
          <td>
            <input className="w-full" type={showPw(showNewPw)} />
          </td>
          <td>
            <button
              onClick={() => {
                setShowNewPw(!showNewPw);
              }}
            >
              <i>Show</i>
            </button>
          </td>
        </tr>
        <tr>
          <td>Repeat Password:</td>
          <td>
            <input className="w-full" type={showPw(showRepeatPw)} />
          </td>
          <td>
            <button
              onClick={() => {
                setShowRepeatPw(!showRepeatPw);
              }}
            >
              <i>Show</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
