import { useErrorStack, useTryError } from "./../ErrorDetection";
import useQuizStore from "./useQuizStore";
import { SelfUser } from "../User";
import { useSubmitPinMutation } from "./generated/graphql";

export const useSubmitPin = (network: string, badgeId: number) => {
  const { questions } = useQuizStore(network);
  const [loginMutation] = useSubmitPinMutation();
  const tryError = useTryError();
  return async (pin: string): Promise<SelfUser | null> => {
    const { data } = await tryError(() =>
      loginMutation({
        variables: { badgeId, network, pin },
      })
    );
    return data?.login ?? null;
  };
};
