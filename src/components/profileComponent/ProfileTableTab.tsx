import { useProfile } from "../../contexts/ProfileContextProvider";
import type { ProfileTableTabTypes } from "../../types/types";

const PossibleDifficultyTypes = ["All", "Easy", "Intermediate", "Difficult"];

function ProfileTableTab({ setCurrPage }: ProfileTableTabTypes) {
  const { activeDifficultyType, dispatch } = useProfile();

  return (
    <div className="tab w-full border-b-2 border-borderGrey">
      <div className="flex">
        {PossibleDifficultyTypes.map((item, index) => {
          const isActive = activeDifficultyType === item;
          const handleTabBtnClick = () => {
            setCurrPage(1);
            dispatch({ type: "updateActiveDifficultyType", payload: item });
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

export default ProfileTableTab;
