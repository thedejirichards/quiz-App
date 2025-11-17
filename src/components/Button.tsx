import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { ButtonType } from "../types/types";

function Button({ name, action }: ButtonType) {
  return (
    <button
      onClick={action}
      className={`w-fit cursor-pointer flex items-center gap-2 justify-center ${
        name === "submit" ? "text-white" : "text-mytext"
      } font-semibold  px-5 py-2 ${
        name === "submit" ? "bg-deepGreen" : "bg-quizbtnFill"
      } border-2 ${
        name === "submit" ? "border-deepGreen" : "border-quizbtnStroke"
      } rounded-md`}
    >
      {name === "prev" && <FaArrowLeft />}
      {name}
      {name === "next" && <FaArrowRight />}
    </button>
  );
}

export { Button };