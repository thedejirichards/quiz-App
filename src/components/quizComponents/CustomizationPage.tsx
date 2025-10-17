import { useQuiz } from "../../contexts/QuizContextProvider";
import {
  possibleDifficultyObject,
  possibleNumberChoice,
} from "./SpecialObjects";
import NextPrevFooter from "./NextPrevFooter";

function CustomizePage() {
  const { dispatch } = useQuiz();

  //   possibleDifficultyOb
  return (
    <div className="customize h-full flex flex-col items-center justify-between">
      <div className="welcome-content flex flex-col justify-center h-10/12 w-10/12 mx-auto pt-36 pb-10">
        <div className="title h1 text-3xl font-bold mb-5">Customize Exam</div>
        <div className="customization-boxes-parent flex flex-col gap-4 h-full">
          <div className="customizationbox flex flex-1 flex-col justify-between w-full bg-white border-2 border-reactBlue rounded-2xl py-5 px-5">
            <div className="h3 font-semibold text-mytext flex justify-center items-center h-1/3">
              Select Difficulty type
            </div>
            <div className="option-canopy px-5 my-2 flex items-center justify-between gap-5 h-2/3">
              {possibleDifficultyObject.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    dispatch({
                      type: "quiz/setDifficultyType",
                      payload: item.name,
                    })
                  }
                  className="options flex items-center justify-center text-xl font-semibold text-reactBlue flex-1 border-2 border-reactBlue rounded-xl h-full"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div className="customizationbox flex flex-1 flex-col justify-between w-full bg-white border-2 border-reactBlue rounded-2xl py-5 px-5">
            <div className="h3 font-semibold text-mytext flex justify-center items-center h-1/3">
              How Many Questions Do you want To Answer?
            </div>
            <div className="option-canopy px-5 my-2 flex items-center justify-between gap-5 h-2/3">
              {possibleNumberChoice.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    dispatch({
                      type: "quiz/setUserQuestionNumberChoice",
                      payload: item.choiceNumber,
                    });
                  }}
                  className="options flex items-center justify-center text-xl font-semibold text-reactBlue flex-1 border-2 border-reactBlue rounded-xl h-full"
                >
                  {item.choiceNumber}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <NextPrevFooter
        nextAction={() => dispatch({ type: "quiz/customize" })}
        prevAction={() => dispatch({ type: "quiz/getStarted" })}
      />
    </div>
  );
}

export default CustomizePage;
