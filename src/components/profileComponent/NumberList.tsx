import type { NumberListTypes } from "../../types/types";

function NumberList({ totalNumbersToDisplay, currActive }: NumberListTypes) {
    const realCurrActive = currActive -1
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalNumbersToDisplay }, (_, i) => (
        <p
          key={i}
          className={`${
            realCurrActive === i ? "border-2 border-deepGreen bg-deepGreen text-white rounded-md" : ""
          } px-1`}
        >
          {i + 1}
        </p>
      ))}
    </div>
  );
}

export default NumberList;
