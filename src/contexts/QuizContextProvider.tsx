import { createContext, useContext, useEffect, useReducer } from "react";
import type {
  QuizContextTypes,
  QuizHistoryType,
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
  questionsAttempted: 0,
  displayInstruction: false,
  attestedToInstruction: false,
  startQuiz: false,
  questionReady: false,
  quizReady: false,
  selectedAnswers: {},
  questionData: null,
  questionDataForResult: null,
  showResult: false,
  score: 0,
  percentScore: 0,
  ratingScore: 0,
  quizInfo: null,
  quizTimeAllocated: 0,
  quizTimeRemaining: 0,
  timerCanStart: false,
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
        ...initialState,
        currentlyDefaultQuizPage: false,
        displayWelcome: true,
      };
    case "quiz/customize":
      return {
        ...state,
        isLoading: false,
        customizeQuiz: true,
        displayWelcome: false,
        displayInstruction: false,
        startQuiz: false,
        questionData: null,
      };
    case "quiz/setPercentScore":
      return { ...state, isLoading: false, percentScore: action.payload };
    case "quiz/setRatingScore":
      return { ...state, isLoading: false, ratingScore: action.payload };
    case "quiz/setDifficultyType":
      return { ...state, isLoading: false, difficultyType: action.payload };
    case "quiz/setUserQuestionNumberChoice":
      return { ...state, isLoading: false, questionsToAttempt: action.payload };
    case "quiz/displayInstruction":
      return {
        ...state,
        isLoading: false,
        customizeQuiz: false,
        displayInstruction: true,
        startQuiz: false,
      };
    case "quiz/attestInstruction":
      return {
        ...state,
        isLoading: false,
        attestedToInstruction: action.payload,
      };
    case "quiz/getQuestion":
      return {
        ...state,
        isLoading: false,
        questionData: action.payload,
        questionReady: true,
      };
    case "quiz/getInitialQuestionDataForResult":
      return {
        ...state,
        isLoading: false,
        questionDataForResult: action.payload,
        questionReady: true,
      };
    case "quiz/updateQuestionDataForResult":
      return {
        ...state,
        isLoading: false,
        questionDataForResult: action.payload,
        questionReady: true,
      };
    case "quiz/startQuiz":
      return {
        ...state,
        isLoading: false,
        startQuiz: true,
        displayInstruction: false,
      };
    case "updateScore":
      return { ...state, score: action.payload };
    case "updateSelectedAnswers":
      return {
        ...state,
        selectedAnswers: { ...state.selectedAnswers, ...action.payload },
      };
    case "updateQuestionsAttempted":
      return { ...state, questionsAttempted: action.payload };
    case "updateTimeAllocated":
      return { ...state, quizTimeAllocated: action.payload };
    case "updateTimeRemaining":
      return { ...state, quizTimeRemaining: action.payload, timerCanStart: true };
    case "decreaseTimeRemaining":
      return { ...state, quizTimeRemaining: state.quizTimeRemaining > 0
      ? state.quizTimeRemaining - 1
      : 0, };
    case "updateQuizInfo":
      return { ...state, quizInfo: action.payload};
    case "quiz/submitQuiz":
      return { ...state, isLoading: false, startQuiz: false, showResult: true };
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
      questionsAttempted,
      displayInstruction,
      attestedToInstruction,
      startQuiz,
      questionReady,
      questionData,
      questionDataForResult,
      showResult,
      quizReady,
      selectedAnswers,
      score,
      percentScore,
      ratingScore,
      quizInfo,
      quizTimeAllocated,
      quizTimeRemaining,
      timerCanStart,
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
        dispatch({ type: "quiz/getQuestion", payload: data });
      } catch {
        dispatch({ type: "error", payload: "Unable to get Question Data" });
      }
    };
    getQuestionData();
  }, [attestedToInstruction]);


  const getQuizInfo = (quizInfo: QuizHistoryType)=> {
    dispatch({type: "updateQuizInfo", payload: quizInfo})
  }

  const setQuizToDefault = () => {
    dispatch({type: "quiz/getStarted"})
  }
  return (
    <QuizContext.Provider
      value={{
        currentlyDefaultQuizPage,
        getStarted,
        displayWelcome,
        customizeQuiz,
        difficultyType,
        questionsToAttempt,
        questionsAttempted,
        displayInstruction,
        attestedToInstruction,
        startQuiz,
        questionReady,
        quizReady,
        selectedAnswers,
        questionData,
        questionDataForResult,
        showResult,
        score,
        percentScore,
        ratingScore,
        quizInfo,
        quizTimeAllocated,
        quizTimeRemaining,
        timerCanStart,
        error,
        isLoading,
        dispatch,
        getQuizInfo,
        setQuizToDefault
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