import { createContext, useContext, useReducer } from "react";
import type {
  ProfileContextTypes,
  ProfileReducerType,
  ProfileStateTypes,
} from "../types/types";

const ProfileContext = createContext<ProfileContextTypes | null>(null);

const initialState: ProfileStateTypes = {
  activeDifficultyType: "All",
  isLoading: false,
  userRank: null,
};

const reducer = (state: ProfileStateTypes, action: ProfileReducerType) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "updateActiveDifficultyType":
      return { ...state, activeDifficultyType: action.payload };
    case "updateUserRank":
      return { ...state, userRank: action.payload };
  }
};

const getDateFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // e.g., "11/13/2025"
}
function ProfileContextProvider({ children }: { children: React.ReactNode }) {
  const [{ isLoading, activeDifficultyType, userRank }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <ProfileContext.Provider
      value={{
        isLoading,
        activeDifficultyType,
        getDateFromTimestamp,
        dispatch,
        userRank,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("ProfileContext used outside provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { ProfileContextProvider, useProfile };
