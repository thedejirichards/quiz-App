import { useQuiz } from "../contexts/QuizContextProvider";
import CustomizePage from "./quizComponents/CustomizationPage";
import GetStarted from "./quizComponents/GetStarted";
import WelcomeInfo from "./quizComponents/WelcomeInfo";

function Quiz() {
  const {currentlyDefaultQuizPage, displayWelcome, customizeQuiz} = useQuiz()
  return (
    <div className="quiz w-full bg-backgroundColor">
      {currentlyDefaultQuizPage && <GetStarted/>}
      {displayWelcome && <WelcomeInfo/>}
      {customizeQuiz && <CustomizePage/>}
    </div>
  );
}
export default Quiz;