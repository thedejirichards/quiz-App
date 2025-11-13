import { useProfile } from "../../contexts/ProfileContextProvider";

const PossibleDifficultyTypes = ["Easy", "Intermediate", "Difficult"];

function ProfileTableTab() {
      const { activeDifficultyType, dispatch } = useProfile();

    return (
        <div className="tab w-full border-b-2 border-borderGrey">
        <div className="flex">
          {PossibleDifficultyTypes.map((item, index) => {
            const isActive = activeDifficultyType === item;
            const handleTabBtnClick = () => {
              dispatch({ type: "updateActiveDifficultyType", payload: item });
            };
            return (
              <button
                key={index}
                onClick={handleTabBtnClick}
                className={`cursor-pointer ${
                  isActive ? "border-b-2 border-deepGreen text-deepGreen" : "text-mytext"
                } px-7 py-2 text-md  font-semibold`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    )
}

export default ProfileTableTab
