import { createContext, useContext, useEffect, useReducer } from "react";
import type {
  QuizContextTypes,
  quizReducerActionTypes,
  quizReducerStateTypes,
} from "../types/types";

const QuizContext = createContext<QuizContextTypes | null>(null);

const initialState: quizReducerStateTypes = {
  currentlyDefaultQuizPage: true,
  getStarted: false,
  displayWelcome: false,
  customizeQuiz: false,
  difficultyType: "",
  questionsToAttempt: 0,
  attestedToInstruction: false,
  startQuiz: false,
  questionReady: false,
  quizReady: false,
  questionData: null,
  score: 0,
  isLoading: false,
  error: "",
};

const reducer = (
  state: quizReducerStateTypes,
  action: quizReducerActionTypes
) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "quiz/getStarted":
      return { ...initialState };
    case "quiz/welcome":
      return {
        ...state,
        isLoading: false,
        currentlyDefaultQuizPage: false,
        displayWelcome: true,
      };
    case "quiz/customize":
      return { ...state, isLoading: false, customizeQuiz: true, displayWelcome: false };
    case "quiz/setDifficultyType":
      return { ...state, isLoading: false, difficultyType: action.payload };
    case "quiz/setUserQuestionNumberChoice":
      return { ...state, isLoading: false, questionsToAttempt: action.payload };
    case "quiz/finalInstruction":
      return { ...state, isLoading: false, attestedToInstruction: true };
    case "quiz/startQuiz":
      return { ...state, isLoading: false, startQuiz: true };
    case "quiz/questionReady":
      return {
        ...state,
        isLoading: false,
        questionData: action.payload,
        questionReady: true,
      };
    case "quiz/quizReady":
      return { ...state, isLoading: false, quizReady: true };
    case "quiz/submitQuiz":
      return { ...state, isLoading: false };
    case "error":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return { ...state };
  }
};

const BASE_URL = "http://localhost:8000";
function QuizContextProvider({ children }: { children: React.ReactNode }) {
  const [
    {
      currentlyDefaultQuizPage,
      getStarted,
      displayWelcome,
      customizeQuiz,
      difficultyType,
      questionsToAttempt,
      attestedToInstruction,
      startQuiz,
      questionReady,
      questionData,
      quizReady,
      score,
      isLoading,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const getQuestionData = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/questionData`);
        const data = await res.json();
        dispatch({ type: "quiz/questionReady", payload: data });
      } catch {
        dispatch({ type: "error", payload: "Unable to get Question Data" });
      }
    };
    getQuestionData();
  }, [startQuiz]);

  return (
    <QuizContext.Provider
      value={{
        currentlyDefaultQuizPage,
        getStarted,
        displayWelcome,
        customizeQuiz,
        difficultyType,
        questionsToAttempt,
        attestedToInstruction,
        startQuiz,
        questionReady,
        quizReady,
        questionData,
        score,
        error,
        isLoading,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("QuizContext was used outside provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { QuizContextProvider, useQuiz };
