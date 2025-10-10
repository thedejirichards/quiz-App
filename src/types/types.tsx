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
};

export type ReducerAvailableStatesType = {
  registeredUsers: RegisteredUserType[] | null;
  errMsg: string;
  isLoading: boolean;
};

export type ReducerActions =
  | { type: "registeredUsers/loading" }
  | { type: "registeredUsers/loaded"; payLoad: RegisteredUserType[] }
  | { type: "registeredUsers/add"; payLoad: RegisteredUserType }
  | { type: "error"; payLoad: string };

export type loginSignUpReducerStates = {
  passwordVisible: boolean;
  fullName: string;
  email: string;
  password: string;
};
export type loginSignUpReducerActions =
  | { type: "togglePasswordVisibility" }
  | { type: "setFullName", payload: string }
  | { type: "setEmail", payload: string}
  | { type: "setPassword", payload: string };
  // | { type: "submitSignup", payload: RegisteredUserType };
