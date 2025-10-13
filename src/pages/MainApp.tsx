import { useNavigate } from "react-router-dom";
import { useUserMgtAuth } from "../contexts/UserMgtContextProvider";
import { useEffect } from "react";

function MainApp() {
  const { currentLoggedInUser } = useUserMgtAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentLoggedInUser) {
      navigate("/login");
    }
  }, [currentLoggedInUser, navigate]);
  return <div>Welcome to Main App {currentLoggedInUser?.name}</div>;
}

export default MainApp;
