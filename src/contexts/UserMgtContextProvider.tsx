import { createContext, useContext, useEffect, useReducer } from "react";
import type {
  UserMgtContextType,
  ReducerActions,
  ReducerAvailableStatesType,
  RegisteredUserType,
  loginUserType,
} from "../types/types";

const BASE_URL = "http://localhost:8000";
const UserMgtContext = createContext<UserMgtContextType | null>(null);
function UserMgtContextProvider({ children }: { children: React.ReactNode }) {
  const initialState = {
    registeredUsers: null,
    errMsg: "",
    isLoading: false,
    signedUpSuccessResponse: false,
    logInSuccessResponse: false,
    currentLoggedInUser: null,
    userToLogInCredentials: null,
  };

  const reducer = (
    state: ReducerAvailableStatesType,
    action: ReducerActions
  ) => {
    switch (action.type) {
      case "registeredUsers/loading":
        return {
          ...state,
          isLoading: true,
        };
      case "registeredUsers/loaded":
        return {
          ...state,
          isLoading: false,
          registeredUsers: action.payLoad,
        };
      case "registeredUsers/add":
        return {
          ...state,
          isLoading: false,
          registeredUsers: state.registeredUsers
            ? [...state.registeredUsers, action.payLoad]
            : state.registeredUsers,
          signedUpSuccessResponse: true,
        };
      case "validateUser":
        return {
          ...state,
          isLoading: false,
          logInSuccessResponse: true,
          userToLogInCredentials: action.payLoad,
        };
      case "getCurrUser":
        return {
          ...state,
          isLoading: false,
          currentLoggedInUser:
            state.registeredUsers?.find(
              (user) => user.Email === state.userToLogInCredentials?.Email
            ) ?? null,
        };
      case "error":
        return {
          ...state,
          errMsg: action.payLoad,
        };
    }
  };

  const [
    {
      registeredUsers,
      errMsg,
      isLoading,
      signedUpSuccessResponse,
      logInSuccessResponse,
      currentLoggedInUser,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(() => {
    const getRegisteredUsers = async () => {
      dispatch({ type: "registeredUsers/loading" });
      try {
        const res = await fetch(`${BASE_URL}/userData`);
        const data = await res.json();
        dispatch({ type: "registeredUsers/loaded", payLoad: data });
      } catch {
        dispatch({ type: "error", payLoad: "error loading user data" });
      }
    };
    getRegisteredUsers();
  }, []);

  const addNewUser = async (newUser: RegisteredUserType) => {
    dispatch({ type: "registeredUsers/loading" });
    try {
      const res = await fetch(`${BASE_URL}/userData`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      if (
        registeredUsers?.some(
          (item) => item.Email === data.Email || item.name === data.name
        )
      )
        dispatch({ type: "error", payLoad: "User already exist" });
      dispatch({ type: "registeredUsers/add", payLoad: data });
    } catch {
      dispatch({ type: "error", payLoad: "Error creating data" });
    }
  };

  const validateUser = (user: loginUserType) => {
    dispatch({ type: "registeredUsers/loading" });
    const isValidUser = registeredUsers?.some(
      (item) => item.Email === user.Email && item.password === user.password
    );

    if (!isValidUser) {
      dispatch({
        type: "error",
        payLoad: "Invalid credentials, recheck email or password.",
      });
      return;
    }
    dispatch({ type: "validateUser", payLoad: user });
  };

  const getCurrUser = () => {
    dispatch({ type: "registeredUsers/loading" });
    try {
      dispatch({ type: "getCurrUser" });
    } catch {
      dispatch({ type: "error", payLoad: "Unable to get current user" });
    }
  };

  return (
    <UserMgtContext.Provider
      value={{
        registeredUsers,
        errMsg,
        isLoading,
        addNewUser,
        signedUpSuccessResponse,
        logInSuccessResponse,
        validateUser,
        getCurrUser,
        currentLoggedInUser,
      }}
    >
      {children}
    </UserMgtContext.Provider>
  );
}

const useUserMgtAuth = () => {
  const context = useContext(UserMgtContext);
  if (!context)
    throw new Error("FakeAuthenticationContext used outside provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { UserMgtContextProvider, useUserMgtAuth };