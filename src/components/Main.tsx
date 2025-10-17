import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";

function Main() {
  return (
    <div className="main-content bg-backgroundColor flex flex-col [&>*:first-child]:h-1/12 [&>*:last-child]:h-11/12">
      <TopBar />
      <Outlet />
    </div>
  );
}

export default Main;
