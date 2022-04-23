import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import { backURL, verifyPasswordStrength } from "../globalVars/globals";

export default function PasswordReset() {
  const [originalPw, setOriginalPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [repeatPw, setRepeatPw] = useState("");
  const [showOriginalPw, setShowOriginalPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showRepeatPw, setShowRepeatPw] = useState(false);
  const [alert, setAlert] = useState("");

  const showPw = (check: boolean) => {
    if (check) {
      return "text";
    } else {
      return "password";
    }
  };

  const resetPassword = () => {
    if (!verifyPasswordStrength(newPw)) {
      setAlert(
        "Password must be a combination of at least 8 lowercase and uppercase letters, digits and special characters."
      );
      return;
    } else if (originalPw === newPw) {
      setAlert("You cannot set the same password.");
      return;
    }
    setAlert("");
    axios
      .post(
        backURL + "/auth/passwordchange",
        {
          original: originalPw,
          new: newPw,
          repeat: repeatPw,
        },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        if (!data.passwordChanged) return setAlert("An error occurred");
        Router.push("/login");
      });
  };

  return (
    <div>
      <table className="w-full h-1/4">
        <tbody>
          <tr>
            <td>Old Password:</td>
            <td>
              <input
                className="w-full"
                value={originalPw}
                onChange={(event) => {
                  setOriginalPw(event.target.value);
                }}
                type={showPw(showOriginalPw)}
              />
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
              <input
                className="w-full"
                value={newPw}
                onChange={(event) => {
                  setNewPw(event.target.value);
                }}
                type={showPw(showNewPw)}
              />
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
              <input
                className="w-full"
                value={repeatPw}
                onChange={(event) => {
                  setRepeatPw(event.target.value);
                }}
                type={showPw(showRepeatPw)}
              />
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
          <tr>
            <td></td>
            <td className="w-min">
              <p className="text-xs text-red-900">
                <i>{alert}</i>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex mt-2">
        <button
          className="w-1/2 mr-1 bg-blue-300"
          onClick={() => {
            resetPassword();
          }}
        >
          Reset Password
        </button>
        <button
          className="w-1/2 ml-1 bg-blue-300"
          onClick={() => {
            setOriginalPw("");
            setNewPw("");
            setRepeatPw("");
          }}
        >
          Clear fields
        </button>
      </div>
    </div>
  );
}
