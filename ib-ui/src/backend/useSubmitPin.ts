import { pipe } from "fp-ts/lib/function";
import * as A from "fp-ts/lib/Array";
import * as R from "fp-ts/lib/Record";
import * as O from "fp-ts/lib/Option";

import useQuizStore from "./useQuizStore";
import { SelfUser } from "../User";
import {
  useGetAnswersLazyQuery,
  useSubmitPinMutation,
} from "./generated/graphql";

export const useSubmitPin = (network: string, badgeId: number) => {
  const { questions } = useQuizStore(network);
  const [loginMutation] = useSubmitPinMutation();
  //   const [answersQuery] = useGetAnswersLazyQuery();
  return async (pin: string): Promise<SelfUser | null> => {
    const { data } = await loginMutation({
      variables: { badgeId, network, pin },
    });
    // const user = data?.login;
    // if (!user) {
    //   return null;
    // }
    // const { data: aData } = await answersQuery({
    //   variables: { badgeId, network },
    // });
    // const rawAnswers = pipe(
    //   aData?.getAnswers || [],
    //   A.map(({ questionId, optionIndex }): [string, number] => [
    //     questionId,
    //     optionIndex,
    //   ]),
    //   R.fromEntries
    // );
    // const answers = pipe(
    //   questions,
    //   A.map(({ id }) => O.fromNullable(rawAnswers[id]))
    // );
    // const takenQuiz = O.isSome(A.findFirst(O.isSome)(answers));
    return data?.login ?? null;
  };
};
