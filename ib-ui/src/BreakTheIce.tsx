import * as O from "fp-ts/Option";
import { FC, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { SelfUser } from "./User";
import PageFrame from "./PageFrame";
import { urlOfBadge } from "./urlOf";
import { useMatchWith } from "./backend/useMatchWith";
import useQuizStore from "./backend/useQuizStore";
import { fakeImage } from "./fakeImage";
import CheckMark from "./CheckMark";
import XMark from "./Xmark";

const pluralizedWord = (word: string) => {
  const lastChar = word.substring(word.length - 1);
  switch (lastChar) {
    case "y": {
      return word.substring(0, word.length - 1) + "ies";
    }
    case "s":
    case "x": {
      return word + "es";
    }
    default: {
      return word + "s";
    }
  }
};
const pluralize = (n: number, word: string) =>
  n === 1 ? word : pluralizedWord(word);
const countOf = (n: number, item: string) => `${n} ${pluralize(n, item)}`;

const DisplayMatch: FC<{
  network: string;
  questionIndex: number;
  didMatch: boolean;
}> = ({ questionIndex, network, didMatch }) => {
  const { answers, questions } = useQuizStore(network);
  const { prompt, options } = questions[questionIndex];
  const answer = answers[questionIndex];
  const chosenOption = O.isSome(answer) ? options[answer.value] : "";
  return (
    <div>
      <div className="flex justify-center gap-3">
        {didMatch ? <CheckMark /> : <XMark />} <span>{prompt}</span>
      </div>
      {didMatch && <div className="font-bold">{chosenOption}</div>}
    </div>
  );
};

const BreakTheIce: FC<{
  loggedInUser: SelfUser;
  badgeId: number;
}> = ({ loggedInUser, badgeId }) => {
  const { questions, answers } = useQuizStore(loggedInUser.network);
  const { match } = useMatchWith(loggedInUser, badgeId);

  const didMatch = useMemo(() => {
    const indices = new Set(match?.matchingAnswers);
    return (questionIndex: number) => indices.has(questionIndex);
  }, [match?.matchingAnswers]);

  return match ? (
    <PageFrame headline={`You have networked with ${match.user.firstName}`}>
      <div className="flex flex-col items-center justify-between">
        {match.user.profile && (
          <div
            className="h-24 w-24 round-20 bg-cover rounded-full"
            style={{ backgroundImage: fakeImage(match.user.badgeId) }}
          />
        )}
        <h2 className="text-lg mt-10">
          You have {countOf(match.matchingAnswers.length, "thing")} in common
        </h2>
        <div>
          {questions.map((_, key) => (
            <DisplayMatch
              key={key}
              network={loggedInUser.network}
              questionIndex={key}
              didMatch={didMatch(key)}
            />
          ))}
        </div>
      </div>
      <div>
        You scored {1 + match.matchingAnswers.length} points for matching with{" "}
        {match.user.firstName}
      </div>
      <Link to={urlOfBadge(loggedInUser)}>home</Link>
    </PageFrame>
  ) : null;
};
export default BreakTheIce;
