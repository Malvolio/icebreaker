import { string } from "fp-ts";
import { FC, useState } from "react";
import BreakTheIce from "./BreakTheIce";
import { useGetLoggedInUser, useLogInUser } from "./loggedInUser";
import PageFrame from "./PageFrame";
import { useSubmitPin } from "./backend/useSubmitPin";
import You from "./You";
import { useStandardParams } from "./useStandardParams";

const IsYou: FC<{ badgeId: number; network: string }> = ({
  badgeId,
  network,
}) => {
  const [loginError, setLoginError] = useState("");
  const [pin, setPin] = useState("");
  const submitPin = useSubmitPin(network, badgeId);
  const logIn = useLogInUser(network);
  const tryLogIn = async () => {
    setLoginError("");

    const user = await submitPin(pin);

    if (user) {
      logIn(user);
    } else {
      setLoginError("Sorry, we could not match that PIN with that badge");
    }
  };
  return (
    <PageFrame headline="Is this your badge?">
      <div>
        <h2 className="text-xl">Yes?</h2>
        <div>Enter your PIN:</div>
        <div>
          <input
            className="w-24 bg-gray-600"
            maxLength={4}
            onChange={(e) => setPin(e.currentTarget.value)}
          />
          <button className="rounded border-2 ml-2 px-2" onClick={tryLogIn}>
            login
          </button>
          <div className="h-3 text-red-600">{loginError}</div>
        </div>

        <h2 className="text-xl mt-12">No?</h2>
        <div>
          Well, you are not signed in, so scan your own badge and sign in so you
          can play.
        </div>
      </div>

      <div></div>
    </PageFrame>
  );
};

const ScanError: FC<{}> = () => (
  <PageFrame headline="Error!">
    <h2>Sorry, something went wrong!</h2>
    <p>Dunno, maybe try scanning the badge again...</p>
  </PageFrame>
);

const Badge = () => {
  const { network, badgeId } = useStandardParams();
  const loggedInUser = useGetLoggedInUser(network);
  if (!badgeId || !network) {
    return <ScanError />;
  }
  if (!loggedInUser) {
    return <IsYou badgeId={badgeId} network={network} />;
  }
  if (loggedInUser.badgeId === badgeId) {
    return <You loggedInUser={loggedInUser} />;
  }
  return <BreakTheIce loggedInUser={loggedInUser} badgeId={badgeId} />;
};
export default Badge;
