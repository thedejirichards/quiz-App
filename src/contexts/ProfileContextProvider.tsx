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
  searchBy: "",
  sortby: "sort by",
  sortOrder: "select",
};

const reducer = (state: ProfileStateTypes, action: ProfileReducerType) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "updateActiveDifficultyType":
      return { ...state, activeDifficultyType: action.payload };
    case "updateUserRank":
      return { ...state, userRank: action.payload };
    case "updateSearchBy":
      return { ...state, searchBy: action.payload };
    case "updateSortby":
      return { ...state, sortby: action.payload };
    case "updateSortOrder":
      return { ...state, sortOrder: action.payload };
  }
};

const getDateFromTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // e.g., "11/13/2025"
};
function ProfileContextProvider({ children }: { children: React.ReactNode }) {
  const [{ isLoading, activeDifficultyType, userRank, searchBy, sortby, sortOrder }, dispatch] = useReducer(
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
        searchBy,
        sortby,
        sortOrder,
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
