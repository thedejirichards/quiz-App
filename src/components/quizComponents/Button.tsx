import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { QuizButtonType } from "../../types/types";

function QuizButton({ name, action }: QuizButtonType) {
  return (
    <button
      onClick={action}
      className="w-fit cursor-pointer flex items-center gap-2 justify-center text-mytext font-semibold  px-5 py-2 bg-quizbtnFill border-2 border-quizbtnStroke rounded-md"
    >
      {name === "prev" && <FaArrowLeft />}
      {name}
      {name === "next" && <FaArrowRight />}
    </button>
  );
}

export { QuizButton };
