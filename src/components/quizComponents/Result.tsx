// import { useEffect } from "react";
import { useQuiz } from "../../contexts/QuizContextProvider";
import { useUserMgtAuth } from "../../contexts/UserMgtContextProvider";
import GaugeChart from "./GaugeChart";
import ListOfQuestionIndexStatus from "./ListOfQuestionIndexStatus";
import ResultTopMetricChildCard from "./ResultTopMetricChildCard";

function Result() {
  const {
    dispatch,
    difficultyType,
    percentScore,
    quizTimeAllocated,
    quizTimeRemaining,
  } = useQuiz();
  const { registeredUsers } = useUserMgtAuth();
  const percentTimeUsed =
    ((quizTimeAllocated - quizTimeRemaining) / quizTimeAllocated) * 100;
  const approxPercentTimeUsed = Math.floor(percentTimeUsed);
  const approxPercentScore = Math.floor(percentScore);
  console.log(registeredUsers);
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
              rightText={
                percentScore ? `${approxPercentScore} %` : percentScore
              }
              iconSelector="result"
            />
            <ResultTopMetricChildCard
              leftText="Rank"
              rightText={difficultyType}
              iconSelector="rank"
            />
          </div>
          <div className="buttom-metrics w-full gap-2 flex [&>*:first-child]:w-1/3 [&>*:last-child]:w-2/3">
            <div className="buttom-metrics-child bg-white h-full rounded-2xl border-2 border-borderGrey relative">
              <div className="chart w-full h-full">
                <GaugeChart percentageTimeUsed={approxPercentTimeUsed} />
              </div>
              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                <h1 className="font-medium text-xl">Percent Time Used</h1>
                <h1 className="font-bold text-2xl">{approxPercentTimeUsed}%</h1>
              </div>
            </div>
            <div className="buttom-metrics-child bg-white h-full rounded-2xl border-2 border-borderGrey p-10">
              <ListOfQuestionIndexStatus />
            </div>
          </div>
        </div>
      </div>
      <div className="flex footer-btns h-2/12 items-center w-10/12 gap-5">
        <button
          onClick={() => {}}
          className="leaderboard flex-1 border-2 border-deepGreen bg-white text-deepGreen rounded-md h-1/3 cursor-pointer"
        >
          Leaderboard
        </button>
        <button
          onClick={() => dispatch({ type: "quiz/getStarted" })}
          className="new-quiz flex-1 border-2 border-deepGreen bg-deepGreen text-white rounded-md h-1/3 cursor-pointer"
        >
          New Quiz
        </button>
      </div>
    </div>
  );
}

export default Result;