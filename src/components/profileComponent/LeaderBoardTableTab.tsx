import type { LeaderboardTableTabTypes } from "../../types/types";

const PossibleDifficultyTypes = ["All", "Easy", "Intermediate", "Difficult"];

function LeaderboardTableTab({ setCurrPage, activeDifficultyType, setActiveDifficultyType }: LeaderboardTableTabTypes) {

  return (
    <div className="tab w-full border-b-2 border-borderGrey flex justify-between">
      <div className="flex">
        {PossibleDifficultyTypes.map((item, index) => {
          const isActive = activeDifficultyType === item;
          const handleTabBtnClick = () => {
            setCurrPage(1);
            setActiveDifficultyType(item)
          };
          return (
            <button
              key={index}
              onClick={handleTabBtnClick}
              className={`cursor-pointer ${
                isActive
                  ? "border-b-2 border-deepGreen text-deepGreen"
                  : "text-mytext"
              } px-7 py-2 text-md  font-semibold`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LeaderboardTableTab;
