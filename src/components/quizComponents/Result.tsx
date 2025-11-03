import { useQuiz } from "../../contexts/QuizContextProvider";
import GaugeChart from "./GaugeChart";
import NextPrevFooter from "./NextPrevFooter";
import ResultTopMetricChildCard from "./ResultTopMetricChildCard";

function Result() {
  const { dispatch, difficultyType, percentScore, score } = useQuiz();
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
              leftText="Rank"
              rightText={difficultyType}
              iconSelector="rank"
            />
            <ResultTopMetricChildCard
              leftText="Score"
              rightText={score ? `${score}` : score}
              iconSelector="result"
            />
          </div>
          <div className="buttom-metrics w-full gap-2 flex [&>*:first-child]:w-1/3 [&>*:last-child]:w-2/3">
            <div className="buttom-metrics-child bg-white h-full rounded-2xl border-2 border-borderGrey relative">
              <div className="chart w-full h-full">
                <GaugeChart percentage={percentScore} />
              </div>
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <h1 className="font-medium text-xl">Percent Score</h1>
                <h1 className="font-bold text-2xl">{percentScore}%</h1>
              </div>
            </div>
            <div className="buttom-metrics-child bg-white h-full rounded-2xl border-2 border-borderGrey"></div>
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