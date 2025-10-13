import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import LoginSignup from "./pages/LoginSignup";
import { UserMgtContextProvider } from "./contexts/UserMgtContextProvider";
import MainApp from "./pages/MainApp";

function App() {
  return (
    <UserMgtContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="/app" element={<MainApp />} />
        </Routes>
      </BrowserRouter>
    </UserMgtContextProvider>
  );
}

export default App;
