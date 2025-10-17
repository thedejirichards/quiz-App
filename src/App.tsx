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
      <UserMgtContextProvider>
        <ProtectedRoute>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/signup" element={<LoginSignup />} />
            <Route path="/app" element={<MainApp />}>
              <Route index element={<Navigate to="quiz" replace />} />
              <Route
                path="quiz"
                element={
                  <QuizContextProvider>
                    <Quiz />
                  </QuizContextProvider>
                }
              />
              <Route path="profile" element={<p>Profile Page</p>} />
              <Route path="leaderboard" element={<p>leaderboard Page</p>} />
            </Route>
          </Routes>
        </ProtectedRoute>
      </UserMgtContextProvider>
    </BrowserRouter>
  );
}

export default App;
