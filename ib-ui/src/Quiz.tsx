import { FC, PropsWithChildren } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as O from "fp-ts/Option";
import classnames from "classnames";
import Checkbox from "./Checkbox";

import useQuizStore from "./backend/useQuizStore";
import PageFrame from "./PageFrame";
import { urlOfBadge, urlOfQuiz } from "./urlOf";
import { useGetLoggedInUser } from "./loggedInUser";
import { useStandardParams } from "./useStandardParams";
import { useTryError } from "./ErrorDetection";

const QuizButton: FC<
  PropsWithChildren<{ checked: boolean; onCheck: () => void }>
> = ({ checked, onCheck, children }) => (
  <div
    onClick={() => {
      if (!checked) {
        onCheck();
      }
    }}
    className={classnames("flex flex-row justify-start gap-2 h-5", {
      "cursor-pointer": !checked,
    })}
  >
    <Checkbox checked={checked} />
    <div>{children}</div>
  </div>
);

const QuizLink: FC<PropsWithChildren<{ network: string; goTo: number }>> = ({
  goTo,
  children,
  network,
}) => {
  const { questions } = useQuizStore(network);
  const navigate = useNavigate();
  const valid = goTo >= 0 && goTo < questions.length;
  const onClick = () => {
    if (valid) {
      navigate(urlOfQuiz(network, goTo));
    }
  };
  return (
    <a className={classnames({ "cursor-pointer": valid })} onClick={onClick}>
      {children}
    </a>
  );
};

const Quiz = () => {
  const { network } = useStandardParams();
  const loggedInUser = useGetLoggedInUser(network);
  const tryError = useTryError();

  const { answers, questions, answer } = useQuizStore(network);
  const navigate = useNavigate();
  const { pageNo } = useParams();
  const questionIndex = pageNo ? Number(pageNo) - 1 : 0;
  const { prompt, options } = questions[questionIndex];
  const currentAnswer = answers[questionIndex];
  const currentOptionIndex = O.getOrElse(() => -1)(currentAnswer);
  const onCheck = (optionIndex: number) => async () => {
    await tryError(() => answer(questionIndex, optionIndex));
    const next = questionIndex + 1;
    if (next < questions.length) {
      setTimeout(() => {
        navigate(urlOfQuiz(network!, next));
      }, 1000);
    }
  };
  return network ? (
    <PageFrame
      headline={`Answer these ${questions.length} quick poll questions.`}
    >
      <div className="flex flex-col h-full text-lg flex-start gap-5 items-center">
        <h3>
          Question #{questionIndex + 1}: {prompt}
        </h3>
        <div className="flex flex-col gap-5">
          {options.map((option, optionIndex) => (
            <QuizButton
              key={optionIndex}
              checked={optionIndex === currentOptionIndex}
              onCheck={onCheck(optionIndex)}
            >
              {option}
            </QuizButton>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-around w-full">
        {questionIndex > 0 && (
          <QuizLink network={network} goTo={questionIndex - 1}>
            back
          </QuizLink>
        )}
        {O.isSome(currentAnswer) && questionIndex < questions.length - 1 && (
          <QuizLink network={network} goTo={questionIndex + 1}>
            next
          </QuizLink>
        )}
        {loggedInUser && questionIndex === questions.length - 1 && (
          <Link to={urlOfBadge(loggedInUser)}>home</Link>
        )}
      </div>
    </PageFrame>
  ) : null;
};

export default Quiz;
