import { useNavigate } from "react-router-dom";
import { useUserMgtAuth } from "../contexts/UserMgtContextProvider";
import { useQuiz } from "../contexts/QuizContextProvider";

function useLogOut() {
    const {dispatch} = useUserMgtAuth()
    const {resetQuiz} = useQuiz()
    const navigate = useNavigate()
    const handleLogOutUser = ()=> {
        dispatch({type: "user/logOut"})
        navigate("/")
        resetQuiz()
    }
  return {handleLogOutUser};
}

export { useLogOut };