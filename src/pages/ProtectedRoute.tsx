import { useNavigate } from "react-router-dom";
import { useUserMgtAuth } from "../contexts/UserMgtContextProvider";
import { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { logInSuccessResponse } = useUserMgtAuth();
  // console.log(logInSuccessResponse)
  const navigate = useNavigate();
  useEffect(() => {
    if (!logInSuccessResponse) {
      navigate("/login");
    }
  }, [logInSuccessResponse, navigate]);
  return <div>{children}</div>;
}

export default ProtectedRoute;
