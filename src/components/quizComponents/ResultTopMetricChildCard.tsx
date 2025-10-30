import type { ResultTopMetricChildCardType } from "../../types/types";


const possibleIconsSource: Record<string, string> = {
    difficulty: "/questionIcon.svg",
    result: "/resultIcon.svg",
    rank: "/rankIcon.svg"
}

function ResultTopMetricChildCard({leftText, rightText, iconSelector}: ResultTopMetricChildCardType) {
  return (
    <div className="top-metrics-child bg-white flex items-center justify-center flex-1 h-full rounded-2xl border-2 border-borderGrey relative">
      <div className="sub-child flex items-center mx-auto h-1/3 gap-4">
        <p className="text-xl font-medium h-full flex items-center ">
          <small className="h-fit">{leftText}</small>
        </p>
        <div className="h3 text-2xl font-bold h-full flex items-center border-s-2 ps-5 border-black">
          <span className="h-fit">{rightText}</span>
        </div>
      </div>
      <div className="displayIcon absolute top-5 start-5 border-2 border-deepGreen p-2 rounded-md">
        <img src={possibleIconsSource[iconSelector]} alt="questionIcon" />
      </div>
    </div>
  );
}

export default ResultTopMetricChildCard;
