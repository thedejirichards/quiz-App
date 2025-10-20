import { useState } from "react";
import { useQuiz } from "../../contexts/QuizContextProvider";
import NextPrevFooter from "./NextPrevFooter";
import Pill from "./Pill";

function Questions() {
  const {
    questionData,
    questionsToAttempt,
    difficultyType,
    dispatch,
    score,
    questionsAttempted,
  } = useQuiz();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const customizedQuestions = questionData
    ?.filter((question) => question.difficulty === difficultyType)
    .sort(() => Math.random() - 0.5)
    .slice(0, questionsToAttempt);
  console.log(customizedQuestions);

  const questionsPerPage = 5;
  const startIndex = (pageNumber - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const totalPages = questionsToAttempt / questionsPerPage;
  const finalPage = pageNumber === totalPages
  const questionDataToDisplay = customizedQuestions
    ? customizedQuestions?.slice(startIndex, endIndex)
    : [];

  const handleClickPrev = () => {
    if (pageNumber === 1) dispatch({ type: "quiz/displayInstruction" });
    setPageNumber((prev) => prev - 1);
  };
  const handleClickNext = () => {

    if (finalPage) return;
    setPageNumber((prev) => prev + 1);
  };
  return (
    <div className="customize h-full flex flex-col [&>*:first-child]:h-2/12 [&>*:last-child]:h-10/12">
      <div className="title-n-pillDiv flex flex-col h-full gap-1">
        <div className="title h1 text-3xl font-bold mb-5 w-full text-center py-3 border-reactBlue">
          Questions
        </div>
        <div className="pill-div flex items-center justify-center w-10/12 mx-auto mb-2">
          <Pill
            bgColor="white"
            title="Page"
            value={`${pageNumber}/ ${totalPages}`}
          />
          <Pill
            bgColor="white"
            title="Questions Left"
            value={questionsToAttempt - questionsAttempted}
          />
          <Pill bgColor="white" title="Current Score" value={score} />
          <Pill bgColor="white" title="Question Type" value={difficultyType} />
        </div>
      </div>
      <div className="h-full flex flex-col">
        <div className="h-[700px] overflow-y-scroll hide-scrollbar w-full">
          <div className="five-question-list  flex flex-col w-10/12 mx-auto">
            {questionDataToDisplay.map((item, index) => (
              <div
                className="question-box mb-2 p-10 rounded-2xl bg-white border-2 border-reactBlue w-full flex flex-col gap-8"
                key={index + 1}
              >
                <div className="sNumandQns flex gap-3 text-mytext">
                  <div className="s-number">{index + startIndex + 1}.</div>
                  <div className="question">{item.question}</div>
                </div>
                <ul className="w-full">
                  {item.options.map((option, index) => (
                    <li
                      key={index + 1}
                      className="w-full text-mytext p-4 border-2 border-deepGreen rounded-full mb-2 cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <NextPrevFooter
            nextAction={handleClickNext}
            prevAction={handleClickPrev}
            displayNext= {finalPage ? false: true}
            displaySubmit= {finalPage ? true: false}
          />
        </div>
      </div>
    </div>
  );
}

export default Questions;
