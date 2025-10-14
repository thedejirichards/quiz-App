import { Outlet } from "react-router-dom";
import { useUserMgtAuth } from "../contexts/UserMgtContextProvider";

function Main() {
  const { currentLoggedInUser } = useUserMgtAuth();

  return (
    <div className="main-content bg-backgroundColor">
      <div>Welcome to Main App {currentLoggedInUser?.name}</div>
      <Outlet />
    </div>
  );
}

export default Main;
