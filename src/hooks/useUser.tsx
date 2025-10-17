import { useUserMgtAuth } from "../contexts/UserMgtContextProvider"

function useUserFirstName() {
     const {currentLoggedInUser} = useUserMgtAuth()
    const userFirstName = currentLoggedInUser?.name.split(" ")[0];
    return {userFirstName}
}

export {useUserFirstName}
