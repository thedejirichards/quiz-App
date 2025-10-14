import { useNavigate } from "react-router-dom";
import { useUserMgtAuth } from "../contexts/UserMgtContextProvider";

function useLogOut() {
    const {dispatch} = useUserMgtAuth()
    const navigate = useNavigate()
    const handleLogOutUser = ()=> {
        dispatch({type: "user/logOut"})
        navigate("/")
    }
  return {handleLogOutUser};
}


export { useLogOut };