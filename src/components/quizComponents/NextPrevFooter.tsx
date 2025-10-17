import type { NextPreFooterType } from "../../types/types";
import { QuizButton } from "./Button";

function NextPrevFooter({
  prevAction,
  nextAction,
  displayNext = true,
  displayPrev= true,
}: NextPreFooterType) {
  return (
    <div className="next-prev-footer btn-div h-2/12 flex items-center w-10/12 mx-auto justify-between">
      {displayPrev && <QuizButton action={prevAction} name="prev" />}
      {displayNext && <QuizButton action={nextAction} name="next" />}
    </div>
  );
}

export default NextPrevFooter;
