import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useLogOut } from "../hooks/useLogOut";
import { useTimeOfDay } from "../hooks/useTimeOfDay";
import { useUserFirstName } from "../hooks/useUser";

function TopBar() {
  const { handleLogOutUser } = useLogOut();
  const {getTimeOfDay} = useTimeOfDay()
  const timeOfTheDay= getTimeOfDay()
  const {userFirstName} = useUserFirstName()
  return (
    <div className="topbar flex items-center justify-end w-full border-b-1 border-reactBlue">
      <div className="topbar-content flex items-center justify-between gap-7 w-fit p-10">
        <div className="welcome flex items-center gap-2">
          <span className="flex items-center p-2 border-2 border-reactBlue rounded-md">
            <FaRegUser className="text-deepGreen"/>
          </span>
          <span className="text-formFontColor">{timeOfTheDay}, {userFirstName}</span>
        </div>
        <button
          className="logout flex items-center gap-2 cursor-pointer"
          onClick={handleLogOutUser}
        >
          <span className="flex items-center p-2 border-2  border-reactBlue rounded-md">
            <MdLogout className="text-deepGreen"/>
          </span>
          <span className="text-formFontColor">Log Out</span>
        </button>
      </div>
    </div>
  );
}

export default TopBar;
