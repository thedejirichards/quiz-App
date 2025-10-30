import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import LoginSignup from "./pages/LoginSignup";
import MainApp from "./pages/MainApp";
import ProtectedRoute from "./pages/ProtectedRoute";
import Quiz from "./components/Quiz";
import { QuizContextProvider } from "./contexts/QuizContextProvider";
import { UserMgtContextProvider } from "./contexts/UserMgtContextProvider";

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
              <Route path="profile" element={<p>Profile Page</p>} />
              <Route path="leaderboard" element={<p>leaderboard Page</p>} />
            </Route>
          </Routes>
        </UserMgtContextProvider>
      </QuizContextProvider>
    </BrowserRouter>
  );
}

export default App;
