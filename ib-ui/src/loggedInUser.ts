import useLocalStorage from "./useLocalStorage";
import { SelfUser } from "./User";

const keyOf = (network: string | undefined) =>
  network ? `user-${network}` : "blank";

export const useGetLoggedInUser = (
  network: string | undefined
): SelfUser | undefined => {
  const [loggedInUser] = useLocalStorage<SelfUser>(keyOf(network));
  return loggedInUser;
};

export const useLogInUser = (
  network: string | undefined
): ((_: SelfUser) => void) => {
  const [_, logIn] = useLocalStorage<SelfUser>(keyOf(network));
  return logIn;
};

export const useLogOutUser = ({ network }: SelfUser): (() => void) => {
  const [_1, _2, logOut] = useLocalStorage<SelfUser>(keyOf(network));
  return logOut;
};
