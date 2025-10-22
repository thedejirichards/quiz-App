import { useEffect, useMemo, useState } from "react";
import { useQuiz } from "../../contexts/QuizContextProvider";
import NextPrevFooter from "./NextPrevFooter";
import Pill from "./Pill";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import Modal from "../Modal";

function Questions() {
  const {
    questionData,
    questionsToAttempt,
    difficultyType,
    dispatch,
    score,
    questionsAttempted,
    error,
    selectedAnswers,
  } = useQuiz();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [displayQuizCompleteModal, setDisplayQuizCompleteModal] =
    useState<boolean>(false);
  const customizedQuestions = useMemo(() => {
    if (!questionData) return [];
    return questionData
      .filter((question) => question.difficulty === difficultyType)
      .sort(() => Math.random() - 0.5)
      .slice(0, questionsToAttempt);
  }, [questionData, difficultyType, questionsToAttempt]);

  useEffect(() => {
    const numberOfAnsweredQuestions = Object.keys(selectedAnswers).length;
    dispatch({
      type: "updateQuestionsAttempted",
      payload: numberOfAnsweredQuestions,
    });
  }, [selectedAnswers, dispatch]);

  const questionsLeft = questionsToAttempt - questionsAttempted;
  const questionsPerPage = 5;
  const startIndex = (pageNumber - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const totalPages = Math.ceil(questionsToAttempt / questionsPerPage);
  const finalPage = pageNumber === totalPages;
  const questionDataToDisplay = customizedQuestions
    ? customizedQuestions?.slice(startIndex, endIndex)
    : [];

  const handleClickPrev = () => {
    if (pageNumber === 1) dispatch({ type: "quiz/displayInstruction" });
    setPageNumber((prev) => prev - 1);
  };
  const handleClickNext = () => {
    if (finalPage) {
      setDisplayQuizCompleteModal(true);
    }else{
      setPageNumber((prev) => prev + 1);
    }
    
  };

  const handleNavigateToResult = () => {
    
  };

  useEffect(() => {
    if (
      customizedQuestions &&
      customizedQuestions.length < questionsToAttempt
    ) {
      dispatch({
        type: "error",
        payload: `The amount of ${difficultyType} questions not up to ${questionsToAttempt}`,
      });
    }
  }, [customizedQuestions, difficultyType, questionsToAttempt, dispatch]);

  const handleOptionClick = (optionId: number, questionId: string) => {
    if (selectedAnswers && selectedAnswers[questionId]) return;
    const selectedQuestion = questionDataToDisplay.find(
      (item) => item.id === questionId
    );

    if (!selectedQuestion) return; // ✅ ensures not undefined
    const questionAnswer = selectedQuestion.answer;
    const selectedOption = selectedQuestion.options[optionId];
    const isCorrect = questionAnswer === selectedOption;

    dispatch({
      type: "updateSelectedAnswers",
      payload: { [questionId]: selectedQuestion?.options[optionId] },
    });
    dispatch({ type: "updateScore", payload: isCorrect ? score + 10 : score });
  };

  return error ? (
    <div className="error-display-div w-full h-full flex items-center justify-center">
      <div className="error-content flex flex-col justify-center items-center w-fit h-fit">
        <div className="text-xl">{error}</div>
        <button
          onClick={() => dispatch({ type: "quiz/customize" })}
          className="bg-deepGreen w-fit cursor-pointer px-5 py-3 rounded-md text-white font-semibold"
        >
          Back to customize
        </button>
      </div>
    </div>
  ) : (
    <div className="customize h-full flex flex-col [&>*:first-child]:h-2/12 [&>*:last-child]:h-10/12">
      {/* Title and Pills Section */}
      <div className="title-n-pillDiv flex flex-col h-full gap-1">
        <div className="title text-3xl font-bold mb-5 w-full text-center py-3 border-reactBlue">
          Questions
        </div>
        <div className="pill-div flex items-center justify-center w-10/12 mx-auto mb-2">
          <Pill
            bgColor="white"
            title="Page"
            value={`${pageNumber} / ${totalPages}`}
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

      {/* Questions and Navigation Section */}
      <div className="h-full flex flex-col">
        <div className="h-[700px] overflow-y-scroll hide-scrollbar w-full">
          <div className="five-question-list flex flex-col w-10/12 mx-auto">
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
                  {item.options.map((option, optIndex) => {
                    const anOptionHasBeenClicked = !!selectedAnswers[item.id];
                    const isSelected = selectedAnswers[item.id] === option;
                    const isCorrect = option === item.answer;

                    return (
                      <button
                        key={optIndex + 1}
                        onClick={() => handleOptionClick(optIndex, item.id)}
                        disabled={anOptionHasBeenClicked}
                        className={`w-full text-mytext py-4 px-6 border-2 flex items-center justify-between border-deepGreen rounded-full mb-2 text-start ${
                          anOptionHasBeenClicked
                            ? isCorrect
                              ? "bg-deepGreen cursor-not-allowed text-white"
                              : isSelected && !isCorrect
                              ? "bg-errorColor cursor-not-allowed text-white border-errorColor"
                              : "bg-disabledOption cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <span>{option}</span>{" "}
                        <span className="">
                          {anOptionHasBeenClicked ? (
                            isSelected && isCorrect ? (
                              <FaRegCircleCheck />
                            ) : isSelected && !isCorrect ? (
                              <MdOutlineCancel className="text-xl" />
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </span>
                      </button>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <NextPrevFooter
            nextAction={handleClickNext}
            prevAction={handleClickPrev}
            displayNext={!finalPage}
            displaySubmit={finalPage}
          />
          {displayQuizCompleteModal && (
            <Modal
              displayIcon="check"
              headerText="Confirm Submission"
              subtext={`Are you sure you want to submit? ${
                questionsLeft
                  ? `you still have ${questionsLeft} questions unanswered`
                  : ""
              }`}
              actionMainContent="Yes"
              actionOtherContent="No"
              mainAction={handleNavigateToResult}
              otherAction={() => setDisplayQuizCompleteModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;