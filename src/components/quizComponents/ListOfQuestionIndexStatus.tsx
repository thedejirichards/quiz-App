import { MdOutlineCancel } from "react-icons/md";
import { useQuiz } from "../../contexts/QuizContextProvider";
import { FaRegCheckCircle } from "react-icons/fa";

function ListOfQuestionIndexStatus() {
  const { questionDataForResult } = useQuiz();
  if (!questionDataForResult) return <p>Can't get question data for result</p>;
  return (
    <div className="flex flex-wrap gap-y-4 gap-x-2">
      {questionDataForResult.map((data, index) => {
        const gotQuestion = data.selectedOption === data.answer;
        const attemptedQuestion = data.attempted;
        const serialNumber = index + 1;
        return (
          <li
          key={index}
            className={`list-none h-fit w-20 py-1 px-3 flex items-center justify-between border-2 border-quizbtnStroke rounded-full bg-quizbtnFill gap-5 ${
              gotQuestion ? "" : ""
            }`}
          >
            <span>{serialNumber}</span>
            <span>
              {gotQuestion ? (
                <FaRegCheckCircle className="text-deepGreen" />
              ) : (
                <MdOutlineCancel
                  className={`${
                    attemptedQuestion ? "text-errorColor" : "text-formFontColor"
                  }`}
                />
              )}
            </span>
          </li>
        );
      })}
    </div>
  );
}

export default ListOfQuestionIndexStatus;
