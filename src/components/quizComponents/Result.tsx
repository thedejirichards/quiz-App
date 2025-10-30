import { useQuiz } from "../../contexts/QuizContextProvider";
import NextPrevFooter from "./NextPrevFooter";
import ResultTopMetricChildCard from "./ResultTopMetricChildCard";

function Result() {
  const { dispatch, difficultyType, percentScore } = useQuiz();
  return (
    <div className="welcome h-full flex flex-col items-center justify-between">
      <div className="welcome-content flex flex-col justify-center h-10/12 w-10/12 mx-auto">
        <div className="title text-3xl font-bold mb-5 w-full text-center py-3 border-reactBlue">
          Result
        </div>
        <div className="result flex flex-col gap-2 h-full [&>*:first-child]:h-1/3 [&>*:last-child]:h-2/3">
          <div className="top-metrics w-full gap-2 flex">
            <ResultTopMetricChildCard
              leftText="Question Type"
              rightText={difficultyType}
              iconSelector="difficulty"
            />
            <ResultTopMetricChildCard
              leftText="Score"
              rightText={percentScore? `${percentScore}%`: percentScore}
              iconSelector="result"
            />
            <ResultTopMetricChildCard
              leftText="Rank"
              rightText={difficultyType}
              iconSelector="rank"
            />
          </div>
          <div className="buttom-metrics w-full gap-2 flex [&>*:first-child]:w-1/3 [&>*:last-child]:w-2/3">
            <div className="top-metrics-child bg-white h-full rounded-2xl border-2 border-borderGrey"></div>
            <div className="top-metrics-child bg-white h-full rounded-2xl border-2 border-borderGrey"></div>
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

export default Result;
