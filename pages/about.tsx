import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { backURL, User } from "../globalVars/globals";

export default function AboutPage() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    axios
      .get(`${backURL}/users/verifyme`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const user = data.user as User;
        if (user) setNickname(user.nickname);
      });
  }, []);

  return (
    <Container>
      <Main>
        <div className="w-1/2">
          <div className="text-3xl text-blue-600 font-bold">Redditwo</div>
          <div className="m-4">
            The hit-smash instant-catch crowd-funded crowd-favorite
            crowd-nominated award-winning dick-sucking balls-licking site made
            by the famous never-disappointing always-levitating money-grabbing
            cash-collecting Izumi.
          </div>
          <div className="text-3xl text-blue-600 font-bold">
            Privacy policy:
          </div>
          <div className="m-4">
            We take your data, all of it, we don't leave a single thing,
            address, lovers, route to work, we got it all. We sell all of it to
            the highest bidder, everybody knows you secrets. The targetted ads
            you see? That's us, we sold the data that was processed to show you
            those products. You have nothing to hide anymore, we know it all, we
            know where you sleep, how you sleep, when you sleep and who you
            sleep with. Your diets that you just can't follow for more than a
            week? We got 'em. All of them. In fact we sold that data just last
            week. It's okey, you don't have to panic, nothing will change, just
            pretend you don't know, it will change nothing. What are you going
            to do? Stop using this site? We already sold the data to your web
            browser, they know. Remove the browser? Your device provider knows.
            They all know your favorite sex positions. They all know your sexual
            interests that you aren't even aware you have. They know it all.
            Just take the blue pill. Or the red one. We made them both. Just for
            you.{" "}
            {nickname ? `Go to sleep ${nickname}, it will all be okey.` : ""}
          </div>
        </div>
      </Main>
    </Container>
  );
}
