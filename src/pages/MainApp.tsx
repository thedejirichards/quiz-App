import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

function MainApp() {
  return (
    <div className="main-app flex [&>*:first-child]:w-2/12 [&>*:last-child]:w-10/12 font-montserrat">
      <Sidebar />
      <Main/>
    </div>
  );
}

export default MainApp;
