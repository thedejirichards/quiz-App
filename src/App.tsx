import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import LoginLogOut from "./pages/LoginLogOut";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginLogOut />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
