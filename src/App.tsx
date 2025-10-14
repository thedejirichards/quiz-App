import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import LoginSignup from "./pages/LoginSignup";
import MainApp from "./pages/MainApp";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ProtectedRoute>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="/app" element={<MainApp />}>
            <Route index element={<Navigate to="quiz" replace />} />
            <Route path="quiz" element={<p>quiz</p>} />
            <Route path="profile" element={<p>Profile Page</p>} />
            <Route path="leaderboard" element={<p>leaderboard Page</p>} />
          </Route>
        </Routes>
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
