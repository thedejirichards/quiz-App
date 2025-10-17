import { FaSquare } from "react-icons/fa";
import { useUserFirstName } from "../../hooks/useUser";
import NextPrevFooter from "./NextPrevFooter";
import { useQuiz } from "../../contexts/QuizContextProvider";

function WelcomeInfo() {
  const { userFirstName } = useUserFirstName();
  const { dispatch } = useQuiz();
  return (
    <div className="welcome h-full flex flex-col items-center justify-between">
      <div className="welcome-content flex flex-col justify-center h-10/12 w-10/12 mx-auto">
        <h1 className="text-4xl font-black mb-2">
          <span>Welcome, </span>
          <span className="text-reactBlue">{userFirstName}</span>
        </h1>
        <div className="h3 mb-5 font-semibold text-formFontColor">
          You’re about to begin a quiz that would test your knowledge of React.
          Note the following instructions below:
        </div>
        <ul className="flex flex-col gap-5 my-5">
          <li className="flex items-center gap-2">
            <span>
              <FaSquare className="bg-reactBlue text-reactBlue" />
            </span>
            <span className="text-md text-formFontColor">
              The duration for the exam is based on the Difficulty type, for
              easy 30 seconds, intermediate 45 seconds, hard 60 seconds.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span>
              <FaSquare className="bg-reactBlue text-reactBlue" />
            </span>
            <span className="text-md text-formFontColor">
              Quiz ends when you submit or when time for the quiz ends.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span>
              <FaSquare className="bg-reactBlue text-reactBlue" />
            </span>
            <span className="text-md text-formFontColor">
              Every Question Carries <em>10points</em>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span>
              <FaSquare className="bg-reactBlue text-reactBlue" />
            </span>
            <span className="text-md text-formFontColor">
              You can check your performance after the end of quiz
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span>
              <FaSquare className="bg-reactBlue text-reactBlue" />
            </span>
            <span className="text-md text-formFontColor">
              You have the right to select the number of questions you want to
              attempt.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span>
              <FaSquare className="bg-reactBlue text-reactBlue" />
            </span>
            <span className="text-md text-formFontColor">
              You can see your result trail after running attempting two or more
              times.
            </span>
          </li>
        </ul>
      </div>
      <NextPrevFooter
        nextAction={() => dispatch({ type: "quiz/customize" })}
        prevAction={() => dispatch({ type: "quiz/getStarted" })}
      />
    </div>
  );
}

export default WelcomeInfo;
