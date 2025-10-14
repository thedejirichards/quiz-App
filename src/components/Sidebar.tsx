import { FaReact } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";
import { useLogOut } from "../hooks/useLogOut";

function Sidebar() {
  const { handleLogOutUser } = useLogOut();
  return (
    <div className="sidebar bg-deepGreen h-screen py-10 flex flex-col justify-between">
      <div className="top">
        <Link
          to="/app"
          className="logo text-white font-bold flex items-center px-8 pb-8 cursor-pointer"
        >
          <span>
            <FaReact className="text-4xl" />
          </span>
          <span className="text-xl">React Quiz</span>
        </Link>
        <ul className="text-xl">
          <NavLink
            to="quiz"
            className={({ isActive }) =>
              `py-5 flex items-center  px-8 ${isActive ? "bg-reactBlue" : ""}`
            }
          >
            <span>
              <img
                src="/quiz-icon.svg"
                alt="quiz-icon"
                className="w-2/3 me-1"
              />
            </span>
            <span className="text-white">Quiz</span>
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `py-5 flex items-center  px-8 ${isActive ? "bg-reactBlue" : ""}`
            }
          >
            <span>
              <img
                src="/profile-icon.svg"
                alt="quiz-icon"
                className="w-2/3 me-1"
              />
            </span>
            <span className="text-white">Profile</span>
          </NavLink>
          <NavLink
            to="leaderboard"
            className={({ isActive }) =>
              `py-5 flex items-center  px-8 ${isActive ? "bg-reactBlue" : ""}`
            }
          >
            <span>
              <img
                src="/leaderboard-icon.svg"
                alt="quiz-icon"
                className="w-2/3 me-1"
              />
            </span>
            <span className="text-white">Leaderboard</span>
          </NavLink>
        </ul>
      </div>
      <div
        className="log-out text-xl text-white flex items-center px-8 cursor-pointer"
        onClick={handleLogOutUser}
      >
        <span>
          <LuLogOut className="me-1" />
        </span>
        <span>Log Out</span>
      </div>
    </div>
  );
}

export default Sidebar;
