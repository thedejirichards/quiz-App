import { useQuiz } from "../../contexts/QuizContextProvider";

function GetStarted() {
  const { dispatch } = useQuiz();
  return (
    <div className="get-started w-full h-full flex items-center justify-center">
      <div className="get-started-content flex flex-col justify-center">
        <div className="text-center text-deepGreen font-semibold mb-2 text-">
          Click button to start
        </div>
        <button
          onClick={() => dispatch({ type: "quiz/welcome" })}
          className="bg-deepGreen cursor-pointer px-5 py-3 rounded-md text-white font-semibold"
        >
          Get started
        </button>
      </div>
    </div>
  );
}

export default GetStarted;
