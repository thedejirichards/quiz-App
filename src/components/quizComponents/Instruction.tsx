import { useQuiz } from "../../contexts/QuizContextProvider";
import NextPrevFooter from "./NextPrevFooter";

function Instruction() {
  const {
    difficultyType,
    questionsToAttempt,
    attestedToInstruction,
    questionData,
    dispatch,
  } = useQuiz();
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "quiz/attestInstruction", payload: e.target.checked });
  };
  const questionAvailable = questionData !== null ? true : false;
  const handleStartQuiz = () => {
    dispatch({type: "quiz/startQuiz"})
  }
  return (
    <div className="customize h-full flex flex-col items-center justify-between">
      <div className="welcome-content flex flex-col justify-center h-10/12 w-10/12 mx-auto py-10">
        <div className="customization-boxes-parent flex flex-col h-full">
          <div className="title h1 text-3xl font-bold mb-5 w-full text-center">
            Instructions
          </div>
          <div className="instruction-box h-full bg-white border-2 border-reactBlue rounded-2xl p-10 flex flex-col gap-3">
            <p className="text-formFontColor font-medium">
              You will be asked{" "}
              <span className="font-semibold text-deepGreen">
                {questionsToAttempt}
              </span>{" "}
              questions selected from our{" "}
              <span className="font-semibold text-deepGreen ">
                {difficultyType}
              </span>{" "}
              question bank. Each question has a 30-second time limit. Be sure
              to answer within the given time, otherwise, the system will
              automatically move you to the next question. You also can only
              click on an option only once.
            </p>
            <div className="check-info-container flex items-center gap-2">
              <input
                type="checkbox"
                checked={attestedToInstruction}
                onChange={handleChecked}
                className="w-4 h-4 accent-deepGreen border-2 border-deepGreen rounded focus:ring-deepGreen cursor-pointer"
              />
              <p className="text-formFontColor font-medium">
                I have read and understood the instructions.
              </p>
            </div>
            {attestedToInstruction && questionAvailable && (
              <div className="startQuiz-btn-div flex w-full justify-center mt-3">
                <button className="btn px-5 py-3 bg-deepGreen text-white rounded-md cursor-pointer" onClick={handleStartQuiz}>
                  Start Quiz
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <NextPrevFooter
        nextAction={handleStartQuiz}
        prevAction={() => {dispatch({type: "quiz/customize"})}}
        displayNext={attestedToInstruction && questionAvailable}
      />
    </div>
  );
}

export default Instruction;
