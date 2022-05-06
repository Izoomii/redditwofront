import axios from "axios";
import { backURL, User } from "../globalVars/globals";

export default function PremiumSettings(props: any) {
  const user = props.user as User;

  const activatePremium = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);
    axios
      .post(
        `${backURL}/users/premium/activate`,
        {
          expiration: currentDate,
        },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log(data);
      });
  };
  return (
    <div>
      Premium
      <button
        onClick={() => {
          activatePremium();
        }}
        className="p-2 bg-orange-600"
      >
        Activate Premium
      </button>
    </div>
  );
}
