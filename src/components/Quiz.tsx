import { useQuiz } from "../contexts/QuizContextProvider";
import CustomizePage from "./quizComponents/CustomizationPage";
import GetStarted from "./quizComponents/GetStarted";
import Instruction from "./quizComponents/Instruction";
import Questions from "./quizComponents/Questions";
import Result from "./quizComponents/Result";
import WelcomeInfo from "./quizComponents/WelcomeInfo";

function Quiz() {
  const {
    currentlyDefaultQuizPage,
    displayWelcome,
    customizeQuiz,
    displayInstruction,
    startQuiz,
    showResult,
  } = useQuiz();
  return (
    <div className="quiz w-full bg-backgroundColor">
      {currentlyDefaultQuizPage && <GetStarted />}
      {displayWelcome && <WelcomeInfo />}
      {customizeQuiz && <CustomizePage />}
      {displayInstruction && <Instruction />}
      {startQuiz && <Questions />}
      {showResult && <Result />}
    </div>
  );
}
export default Quiz;
