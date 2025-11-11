import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import type {
  UserMgtContextType,
  ReducerActions,
  ReducerAvailableStatesType,
  RegisteredUserType,
  loginUserType,
  QuizHistoryType,
} from "../types/types";
import { useQuiz } from "./QuizContextProvider";

const BASE_URL = "http://localhost:8000";
const UserMgtContext = createContext<UserMgtContextType | null>(null);

function UserMgtContextProvider({ children }: { children: React.ReactNode }) {
  const {
    showResult,
    score,
    difficultyType,
    questionsToAttempt,
    questionsAttempted,
    questionData,
    selectedAnswers,
    quizTimeAllocated,
    quizTimeRemaining,
    ratingScore,
  } = useQuiz();

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
        return { ...state, isLoading: true };
      case "getAllUsers":
      case "registeredUsers/loaded":
        return { ...state, isLoading: false, registeredUsers: action.payLoad };
      case "registeredUsers/add":
        return {
          ...state,
          isLoading: false,
          registeredUsers: state.registeredUsers
            ? [...state.registeredUsers, action.payLoad]
            : [action.payLoad],
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
      case "updateUserAfterQuizSubmission":
        return {
          ...state,
          registeredUsers: state.registeredUsers
            ? state.registeredUsers.map((user) =>
                user.id === action.payload.id ? action.payload : user
              )
            : [action.payload],
        };
      case "user/logOut":
        return {
          ...state,
          logInSuccessResponse: false,
          currentLoggedInUser: null,
          userToLogInCredentials: null,
        };
      case "error":
        return { ...state, errMsg: action.payLoad };
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

  // ✅ Load all users on mount
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

  // ✅ Add new user
  const addNewUser = async (newUser: RegisteredUserType) => {
    dispatch({ type: "registeredUsers/loading" });
    try {
      const res = await fetch(`${BASE_URL}/userData`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "content-type": "application/json" },
      });
      const data = await res.json();
      if (
        registeredUsers?.some(
          (item) => item.Email === data.Email || item.name === data.name
        )
      ) {
        dispatch({ type: "error", payLoad: "User already exist" });
        return;
      }
      dispatch({ type: "registeredUsers/add", payLoad: data });
    } catch {
      dispatch({ type: "error", payLoad: "Error creating data" });
    }
  };

  // ✅ Validate login
  const validateUser = (user: loginUserType) => {
    if (!registeredUsers) {
      dispatch({ type: "error", payLoad: "User data not loaded yet" });
      return;
    }

    dispatch({ type: "registeredUsers/loading" });

    const matchedUser = registeredUsers.find(
      (item) =>
        item.Email?.toLowerCase() === user.Email?.toLowerCase() &&
        item.password === user.password
    );

    if (!matchedUser) {
      dispatch({
        type: "error",
        payLoad: "Invalid credentials, recheck email or password.",
      });
      return;
    }

    dispatch({ type: "validateUser", payLoad: matchedUser });
  };

  const getCurrUser = useCallback(() => {
    dispatch({ type: "registeredUsers/loading" });
    try {
      dispatch({ type: "getCurrUser" });
    } catch {
      dispatch({ type: "error", payLoad: "Unable to get current user" });
    }
  }, [dispatch]);

  const updateUserInfoAfterQuiz = async (
    currentUserEmail: string,
    totalAnswered: number,
    rankingScore: number
  ) => {
    try {
      const matchedUser = registeredUsers?.find(
        (user) => user.Email === currentUserEmail
      );
      const answeredCorrectly = score / 10;
      const percentScore = (answeredCorrectly / questionsToAttempt) * 100;
      const timeUsed = quizTimeAllocated - quizTimeRemaining;

      if (!matchedUser) return;

      const newQuizResult: QuizHistoryType = {
        quizId: `${crypto.randomUUID()}`,
        difficultyType,
        numberOfQuestions: questionsToAttempt,
        totalQuestionsAnswered: totalAnswered,
        correctlyAnswered: answeredCorrectly,
        durationUsed: `${timeUsed} sec`,
        score,
        rankScore: rankingScore,
        percentScore,
        dateStamp: Date.now(),
        remark: (questionsToAttempt * 10) / 2 > score ? "fail" : "passed",
        questionInfo: questionData
          ? questionData
              .filter((data) => selectedAnswers[data.id] !== undefined)
              .map((data) => ({
                questionId: data.id,
                question: data.question,
                options: data.options,
                correctOption: data.answer,
                answered: !!selectedAnswers[data.id],
                userSelectedOption: selectedAnswers[data.id] ?? null,
              }))
          : [],
      };

      const updatedUserInfoAfterQuiz: RegisteredUserType = {
        ...matchedUser,
        quizHistory: [...(matchedUser.quizHistory ?? []), newQuizResult],
      };

      const res = await fetch(`${BASE_URL}/userData/${matchedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserInfoAfterQuiz),
      });

      if (!res.ok) throw new Error("Failed to update quiz history");

      const data = await res.json();
      dispatch({ type: "updateUserAfterQuizSubmission", payload: data });
    } catch {
      dispatch({ type: "error", payLoad: "Failed to update quiz history" });
    }
  };

  // ✅ This will now only run once when showResult becomes true
  useEffect(() => {
    if (showResult && currentLoggedInUser) {
      updateUserInfoAfterQuiz(
        currentLoggedInUser.Email,
        questionsAttempted,
        ratingScore
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResult]);

  const logOutUser = () => {
    dispatch({ type: "registeredUsers/loading" });
    try {
      dispatch({ type: "user/logOut" });
    } catch {
      dispatch({ type: "error", payLoad: "Unable to logOut current user" });
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
        logOutUser,
        dispatch,
        updateUserInfoAfterQuiz,
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
