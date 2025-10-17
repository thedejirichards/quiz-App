export type ResultType = {
  quizId: string;
  difficultyType: string;
  numberOfQuestions: number;
  correctlyAnswered: number;
  durationUsed: string;
  dateStamp: number;
  remark: string;
};

export type RegisteredUserType = {
  id: number;
  name: string;
  Email: string;
  password: string;
  signUpDate: string;
  lastLogInDate: string;
  results: ResultType[] | null;
};

export type UserMgtContextType = {
  registeredUsers: RegisteredUserType[] | null;
  errMsg: string;
  isLoading: boolean;
  addNewUser: (newUser: RegisteredUserType) => void;
  signedUpSuccessResponse: boolean;
  logInSuccessResponse: boolean;
  validateUser: (user: loginUserType) => void;
  getCurrUser: () => void;
  currentLoggedInUser: RegisteredUserType | null;
  logOutUser: () => void;
  dispatch: (action: ReducerActions) => void;
};

export type ReducerAvailableStatesType = {
  registeredUsers: RegisteredUserType[] | null;
  errMsg: string;
  isLoading: boolean;
  signedUpSuccessResponse: boolean;
  logInSuccessResponse: boolean;
  currentLoggedInUser: RegisteredUserType | null;
  userToLogInCredentials: loginUserType | null;
};

export type ReducerActions =
  | { type: "registeredUsers/loading" }
  | { type: "registeredUsers/loaded"; payLoad: RegisteredUserType[] }
  | { type: "registeredUsers/add"; payLoad: RegisteredUserType }
  | { type: "validateUser"; payLoad: loginUserType }
  | { type: "getCurrUser" }
  | { type: "user/logOut" }
  | { type: "error"; payLoad: string };

export type loginSignUpReducerStates = {
  passwordVisible: boolean;
  fullName: string;
  email: string;
  password: string;
};
export type loginSignUpReducerActions =
  | { type: "togglePasswordVisibility" }
  | { type: "setFullName"; payload: string }
  | { type: "setEmail"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "reset" };

export type ModalType = {
  headerText: string;
  subtext: string;
  displayIcon: string;
  actionMainContent?: string;
  actionOtherContent?: string;
  mainAction?: () => void;
  otherAction?: () => void;
};
export type loginUserType = {
  Email: string;
  password: string;
};

//-------------------------------------Quiz
export type QuestionType = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: "" | "easy" | "intermediate" | "difficult";
};

export type quizReducerStateTypes = {
  currentlyDefaultQuizPage: boolean;
  getStarted: boolean;
  displayWelcome: boolean;
  customizeQuiz: boolean;
  difficultyType: "" | "easy" | "intermediate" | "difficult";
  questionsToAttempt: 0 | 25 | 30| 35 | 50;
  displayInstruction: boolean;
  attestedToInstruction: boolean;
  startQuiz: boolean;
  questionReady: boolean;
  quizReady: boolean;
  questionData: QuestionType[] | null;
  score: number;
  isLoading: boolean;
  error: string;
};
export type quizReducerActionTypes =
  | { type: "loading" }
  | { type: "quiz/getStarted" }
  | { type: "quiz/welcome" }
  | { type: "quiz/customize" }
  | {
      type: "quiz/setDifficultyType";
      payload: "easy" | "intermediate" | "difficult";
    }
  | { type: "quiz/setUserQuestionNumberChoice"; payload: 25 | 30 | 35 | 50 }
  | { type: "quiz/displayInstruction" }
  | { type: "quiz/attestInstruction", payload: boolean }
  | { type: "quiz/getQuestion"; payload: QuestionType[] }
  | { type: "quiz/startQuiz" }
  | { type: "quiz/quizReady" }
  | { type: "quiz/submitQuiz" }
  | { type: "error"; payload: string };

export type QuizContextTypes = {
  isLoading: boolean;
  currentlyDefaultQuizPage: boolean;
  getStarted: boolean;
  displayWelcome: boolean;
  customizeQuiz: boolean;
  difficultyType: "" | "easy" | "intermediate" | "difficult";
  questionsToAttempt: number;
  displayInstruction: boolean;
  attestedToInstruction: boolean;
  startQuiz: boolean;
  questionReady: boolean;
  quizReady: boolean;
  questionData: QuestionType[] | null;
  score: number;
  error: string;
  dispatch: (action: quizReducerActionTypes) => void;
};

export type QuizButtonType = {
  name: "prev" | "next";
  action: () => void;
};

export type NextPreFooterType = {
  prevAction: () => void;
  nextAction: () => void;
  displayPrev?: boolean;
  displayNext?: boolean;
};

// action={() => dispatch({ type: "quiz/getStarted" })}
// action={() => dispatch({ type: "quiz/customize" })}



//----------------------------- SpecialObjects


export type possibleDifficultyType = {
    name: "easy" | "intermediate" | "difficult",
    id: string,
  }

export type possibleNumberType = {
    choiceNumber: 25 | 30 |35 |50,
    id: string,
  }
