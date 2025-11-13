import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import LoginSignup from "./pages/LoginSignup";
import MainApp from "./pages/MainApp";
import ProtectedRoute from "./pages/ProtectedRoute";
import Quiz from "./components/Quiz";
import { QuizContextProvider } from "./contexts/QuizContextProvider";
import { UserMgtContextProvider } from "./contexts/UserMgtContextProvider";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <BrowserRouter>
      <QuizContextProvider>
        <UserMgtContextProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/signup" element={<LoginSignup />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <MainApp />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="quiz" replace />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="profile" element={<Profile/>} />
              <Route path="leaderboard" element={<Leaderboard/>} />
            </Route>
          </Routes>
        </UserMgtContextProvider>
      </QuizContextProvider>
    </BrowserRouter>
  );
}

export default App;
