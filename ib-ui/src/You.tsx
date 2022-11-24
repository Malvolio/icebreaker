import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSummarizeMatchesQuery } from "./backend/generated/graphql";
import useQuizStore from "./backend/useQuizStore";
import { countOf, pluralize } from "./countOf";
import { fakeImage } from "./fakeImage";
import { useLogOutUser } from "./loggedInUser";
import PageFrame from "./PageFrame";
import { urlOfQuiz } from "./urlOf";
import { SelfUser } from "./User";

const OxfordComma = <A,>({
  source,
  children,
}: {
  source: A[];
  children: (_: A) => JSX.Element;
}) => (
  <>
    {source.map((item, key) => (
      <Fragment key={key}>
        {children(item)}
        {key === source.length - 1 || source.length === 2 ? "" : ", "}
        {key === source.length - 2 ? " and " : ""}
      </Fragment>
    ))}
  </>
);

const Scorecard: FC<{ loggedInUser: SelfUser }> = ({ loggedInUser }) => {
  const { data } = useSummarizeMatchesQuery({
    variables: { network: loggedInUser.network, badgeId: loggedInUser.badgeId },
  });
  return data ? (
    <div>
      <div>
        You have networked with{" "}
        <span className="font-bold">{data.summarizeMatches.matches}</span>{" "}
        {pluralize(data.summarizeMatches.matches, "person", "people")}, scoring{" "}
        <span className="font-bold">{data.summarizeMatches.score}</span>{" "}
        {pluralize(
          data.summarizeMatches.matches + data.summarizeMatches.score,
          "point"
        )}
      </div>
      {data.getBesties.length ? (
        <span>
          You have the most in common with{" "}
          <OxfordComma source={data.getBesties}>
            {({ user: { firstName } }) => (
              <span className="font-bold">{firstName}</span>
            )}
          </OxfordComma>
          .
        </span>
      ) : null}
    </div>
  ) : null;
};

const You: FC<{ loggedInUser: SelfUser }> = ({ loggedInUser }) => {
  const { takenQuiz } = useQuizStore(loggedInUser.network);
  const logOut = useLogOutUser(loggedInUser);
  const quizUrl = urlOfQuiz(loggedInUser.network);

  return (
    <PageFrame headline={`Hi, ${loggedInUser.firstName}`}>
      {takenQuiz ? (
        <div>
          You have already taken the quiz.{" "}
          <Link to={quizUrl}>Change your answers?</Link>
        </div>
      ) : (
        <Link to={quizUrl}>Take the quiz?</Link>
      )}
      <Scorecard loggedInUser={loggedInUser} />

      <div>
        <button className="p-2 border rounded" onClick={logOut}>
          log out
        </button>
      </div>
    </PageFrame>
  );
};
export default You;
