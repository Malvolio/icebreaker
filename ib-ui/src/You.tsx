import { FC } from "react";
import { Link } from "react-router-dom";
import { useLogOutUser } from "./loggedInUser";
import PageFrame from "./PageFrame";
import { urlOfQuiz } from "./urlOf";
import { SelfUser } from "./User";

const You: FC<{ loggedInUser: SelfUser }> = ({ loggedInUser }) => {
  const logOut = useLogOutUser(loggedInUser);
  const quizUrl = urlOfQuiz(loggedInUser.network);

  return (
    <PageFrame headline={`Hi, ${loggedInUser.firstName}`}>
      {loggedInUser.takenQuiz ? (
        <div>
          You have already taken the quiz.
          <Link to={quizUrl}>Change your answers?</Link>
        </div>
      ) : (
        <Link to={quizUrl}>Take the quiz?</Link>
      )}
      <button onClick={logOut}>log out</button>
    </PageFrame>
  );
};
export default You;
