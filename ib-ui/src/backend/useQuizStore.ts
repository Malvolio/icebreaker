import { useGetLoggedInUser } from "./../loggedInUser";

import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import * as R from "fp-ts/lib/Record";

import { pipe } from "fp-ts/lib/function";
import QuizData from "../quiz.json";
import {
  GetAnswersQuery,
  useGetAnswersQuery,
  useSetAnswerMutation,
} from "./generated/graphql";
import { useCallback } from "react";
import { usePushError, useTryError } from "../ErrorDetection";

type Question = {
  id: string;
  prompt: string;
  options: string[];
};

const questions = QuizData as Question[];

export const processAnswers = (
  dataAnswers: GetAnswersQuery["getAnswers"] | undefined
) => {
  const rawAnswers = pipe(
    dataAnswers || [],
    A.map(({ questionId, optionIndex }): [string, number] => [
      questionId,
      optionIndex,
    ]),
    R.fromEntries
  );
  return pipe(
    questions,
    A.map(({ id }) => O.fromNullable(rawAnswers[id]))
  );
};

const useQuizStore = (network: string) => {
  const user = useGetLoggedInUser(network);
  const tryError = useTryError();

  const [setAnswer] = useSetAnswerMutation();
  const { data, refetch, error } = useGetAnswersQuery({
    variables: { network, badgeId: user?.badgeId || 0 },
    skip: !user?.badgeId,
  });
  usePushError(error);
  const answer = useCallback(
    async (questionIndex: number, optionIndex: number) =>
      tryError(async () => {
        const r = await setAnswer({
          variables: {
            network,
            badgeId: user?.badgeId || 0,
            answer: {
              questionId: questions[questionIndex].id,
              optionIndex,
            },
          },
        });
        refetch();
        return r;
      }),
    []
  );
  const answers = processAnswers(data?.getAnswers);

  const takenQuiz = O.isSome(A.findFirst(O.isSome)(answers));

  return {
    questions: QuizData as Question[],
    answers,
    answer,
    takenQuiz,
  };
};

export default useQuizStore;
