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
  getCurrUser: ()=> void;
  currentLoggedInUser: RegisteredUserType | null;
  logOutUser: ()=> void;
  dispatch: (action: ReducerActions)=> void;
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
  | { type: "validateUser"; payLoad: loginUserType}
  | { type: "getCurrUser"; }
  | { type: "user/logOut"; }
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
  mainAction?:()=> void;
  otherAction?: ()=> void;
};
export type loginUserType = {
  Email: string;
  password: string;
};