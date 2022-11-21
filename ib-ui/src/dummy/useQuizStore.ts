import create from "zustand";
import { combine } from "zustand/middleware";

import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import { pipe } from "fp-ts/lib/function";
import QuizData from "../quiz.json";

type Question = {
  id: string;
  prompt: string;
  options: string[];
};

const getLocalStorage = <T>(key: string, dflt: () => T): T => {
  if (typeof window !== "undefined") {
    const v = window.localStorage.getItem(key);
    if (v) {
      return JSON.parse(v) as T;
    }
  }
  return dflt();
};

const setLocalStorage = <T>(key: string, v: T) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(v));
  }
};

const getAnswers = () =>
  A.map((n: number | null) => O.fromNullable(n))(
    getLocalStorage("myanswers", () =>
      A.replicate<number | null>(QuizData.length, null)
    )
  );
const saveAnswers = (p: O.Option<number>[]) => {
  setLocalStorage("myanswers", A.map(O.getOrElseW(() => null))(p));
};

const useQuizStore = create(
  combine(
    {
      questions: QuizData as Question[],
      answers: getAnswers(),
    },
    (set) => ({
      answer: (questionIndex: number, optionIndex: number) =>
        set((state) => {
          const answers = pipe(
            state.answers,
            A.mapWithIndex((n, currentAnswer) =>
              n === questionIndex ? O.some(optionIndex) : currentAnswer
            )
          );
          saveAnswers(answers);
          return {
            answers,
          };
        }),
    })
  )
);

export default useQuizStore;
