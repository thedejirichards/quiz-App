import type { PillType } from "../../types/types";

function Pill({ title, bgColor, value }: PillType) {
  return (
    <div
      className={`w-fit px-4 py-2 mx-1 rounded-full border-2 border-deepGreen ${
        bgColor === "green"
          ? "bg-deepGreen text-white"
          : "bg-white text-deepGreen"
      }`}
    >
      {`${title}: ${value}`}
    </div>
  );
}

export default Pill;
