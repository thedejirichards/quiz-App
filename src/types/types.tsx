export type QuestionInfoType = {
  questionId: string;
  question: string;
  options: string[];
  correctOption: string;
  answered: boolean,
  userSelectedOption: string;
};

export type QuizHistoryType = {
  quizId: string;
  difficultyType: string;
  numberOfQuestions: number;
  totalQuestionsAnswered: number;
  correctlyAnswered: number;
  durationUsed: string;
  score: number;
  rankScore: number;
  percentScore: number;
  dateStamp: number;
  remark: string;
  questionInfo: QuestionInfoType[];
};

export type RegisteredUserType = {
  id: number;
  name: string;
  Email: string;
  password: string;
  signUpDate: string;
  lastLogInDate: string;
  quizHistory: QuizHistoryType[] | [];
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
  updateUserInfoAfterQuiz: (
    currentUserEmail: string,
    questionsAttempted: number,
    rankingScore: number,
  ) => void;
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
  | { type: "getAllUsers"; payLoad: RegisteredUserType[] }
  | { type: "registeredUsers/add"; payLoad: RegisteredUserType }
  | { type: "validateUser"; payLoad: loginUserType }
  | { type: "getCurrUser" }
  | { type: "updateUserAfterQuizSubmission"; payload: RegisteredUserType }
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
  difficulty: "" | "Easy" | "Intermediate" | "Difficult";
};

export type QuestionDataForResultType = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  difficulty: "" | "Easy" | "Intermediate" | "Difficult";
  attempted: boolean;
  selectedOption: string | null;
};

export type quizReducerStateTypes = {
  currentlyDefaultQuizPage: boolean;
  getStarted: boolean;
  displayWelcome: boolean;
  customizeQuiz: boolean;
  difficultyType: "" | "Easy" | "Intermediate" | "Difficult";
  questionsToAttempt: 0 | 25 | 30 | 35 | 40;
  questionsAttempted: number;
  displayInstruction: boolean;
  attestedToInstruction: boolean;
  startQuiz: boolean;
  questionReady: boolean;
  quizReady: boolean;
  selectedAnswers: Record<string, string>;
  questionData: QuestionType[] | null;
  questionDataForResult: QuestionDataForResultType[] | null;
  showResult: boolean;
  score: number;
  percentScore: number;
  ratingScore: number;
  quizTimeAllocated: number,
  quizTimeRemaining: number,
  timerCanStart: boolean,
  isLoading: boolean;
  error: string;
};
export type quizReducerActionTypes =
  | { type: "loading" }
  | { type: "quiz/getStarted" }
  | { type: "quiz/welcome" }
  | { type: "quiz/customize" }
  | { type: "quiz/setPercentScore"; payload: number }
  | { type: "quiz/setRatingScore"; payload: number }
  | {
      type: "quiz/setDifficultyType";
      payload: "Easy" | "Intermediate" | "Difficult";
    }
  | { type: "quiz/setUserQuestionNumberChoice"; payload: 25 | 30 | 35 | 40 }
  | { type: "quiz/displayInstruction" }
  | { type: "quiz/attestInstruction"; payload: boolean }
  | { type: "quiz/getQuestion"; payload: QuestionType[] }
  | { type: "quiz/getInitialQuestionDataForResult"; payload: QuestionDataForResultType[] }
  | { type: "quiz/updateQuestionDataForResult"; payload: QuestionDataForResultType[] }
  | { type: "quiz/startQuiz" }
  | { type: "updateScore"; payload: number }
  | { type: "updateSelectedAnswers"; payload: Record<string, string> }
  | { type: "updateQuestionsAttempted"; payload: number }
  | { type: "updateTimeAllocated"; payload: number }
  | { type: "updateTimeRemaining"; payload: number }
  | { type: "decreaseTimeRemaining" }
  | { type: "quiz/submitQuiz" }
  | { type: "error"; payload: string };

export type QuizContextTypes = {
  isLoading: boolean;
  currentlyDefaultQuizPage: boolean;
  getStarted: boolean;
  displayWelcome: boolean;
  customizeQuiz: boolean;
  difficultyType: "" | "Easy" | "Intermediate" | "Difficult";
  questionsToAttempt: number;
  questionsAttempted: number;
  displayInstruction: boolean;
  attestedToInstruction: boolean;
  startQuiz: boolean;
  questionReady: boolean;
  quizReady: boolean;
  selectedAnswers: Record<string, string>;
  questionData: QuestionType[] | null;
  questionDataForResult: QuestionDataForResultType[] | null;
  showResult: boolean;
  score: number;
  percentScore: number;
  ratingScore: number;
  quizTimeAllocated: number,
  quizTimeRemaining: number,
  timerCanStart: boolean,
  error: string;
  dispatch: (action: quizReducerActionTypes) => void;
};

export type QuizButtonType = {
  name: "prev" | "next" | "submit";
  action: () => void;
};

export type NextPreFooterType = {
  prevAction: () => void;
  nextAction: () => void;
  displayPrev?: boolean;
  displayNext?: boolean;
  displaySubmit?: boolean;
};

// action={() => dispatch({ type: "quiz/getStarted" })}
// action={() => dispatch({ type: "quiz/customize" })}

//----------------------------- SpecialObjects

export type possibleDifficultyType = {
  name: "Easy" | "Intermediate" | "Difficult";
  id: string;
  rankScore: number
};

export type possibleNumberType = {
  choiceNumber: 25 | 30 | 35 | 40;
  id: string;
};

export type PillType = {
  title: string;
  value?: number | string;
  bgColor: "green" | "white";
  width?: "fixed" | "fit"
};

export type ResultTopMetricChildCardType = {
  leftText: string;
  rightText: string | number;
  iconSelector: "difficulty" | "result" | "rank";
};
