import { useReducer } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useUserMgtAuth } from "../contexts/UserMgtContextProvider";
import type {
  loginSignUpReducerActions,
  loginSignUpReducerStates,
} from "../types/types";

function LoginSignup() {
  const { addNewUser } = useUserMgtAuth();
  const location = useLocation();

  const displayForSignup = location.pathname.includes("/signup");
  const displayForLogin = location.pathname.includes("/login");

  const getTodaysDate = () => {
    const today = new Date();
    const formattedDate = today
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .replace(",", "");
    return formattedDate;
  };

  const initialState = {
    passwordVisible: false,
    fullName: "",
    email: "",
    password: "",
  };

  const reducer = (
    state: loginSignUpReducerStates,
    action: loginSignUpReducerActions
  ) => {
    switch (action.type) {
      case "togglePasswordVisibility":
        return { ...state, passwordVisible: !state.passwordVisible };
      case "setFullName":
        return { ...state, fullName: action.payload };
      case "setEmail":
        return { ...state, email: action.payload };
      case "setPassword":
        return { ...state, password: action.payload };
      default:
        return state;
    }
  };

  const [{ email, fullName, password, passwordVisible }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const createdUser = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    name: fullName,
    Email: email,
    password: password,
    signUpDate: getTodaysDate(),
    lastLogInDate: "",
    results: null,
  };

  const handleSubmitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!fullName || !email || !password) return
    addNewUser(createdUser);
    console.log(createdUser);
  };
  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    alert("logged in");
    e.preventDefault();
  };

  return (
    <div className="parent flex w-full h-screen bg-backgroundColor">
      <div
        className="child w-1/2 h-full bg-cover bg-no-repeat bg-center flex justify-center items-center"
        style={{
          backgroundImage:
            "linear-gradient(175deg, #000 3.67%, rgba(0, 217, 255, 0.205) 42.08%, #000 113.13%), url('/reactQuizBgImg.png')",
        }}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <img src="/reactLogo.svg" alt="reactlogo" />
          <h1 className="h1 text-white font-montserrat font-bold text-4xl">
            React Quiz
          </h1>
        </div>
      </div>{" "}
      <div className="child w-1/2 flex justify-center items-center font-montserrat">
        <div className="subparent flex flex-col w-1/2">
          <div className="form-header w-full mb-10">
            <div className="h1 text-5xl font-bold mb-3">
              {displayForSignup && !displayForLogin ? "Sign Up" : "Log In"}
            </div>
            <div className="span-parent flex">
              <span className="form-span-content me-3">
                {displayForSignup && !displayForLogin
                  ? "Already have an account?"
                  : "Don't have an Account"}
              </span>
              <Link
                to={displayForSignup && !displayForLogin ? "/login" : "/signup"}
                className="form-span-content text-deepGreen font-semibold underline"
              >
                {displayForSignup && !displayForLogin ? "Log In" : "Sign Up"}
              </Link>
            </div>
          </div>
          <form
            action=""
            className="form w-full"
            onSubmit={
              displayForSignup
                ? handleSubmitSignup
                : displayForLogin
                ? handleSubmitLogin
                : undefined
            }
          >
            {displayForSignup && !displayForLogin ? (
              <div className="inputContainer flex flex-col mb-4">
                <label htmlFor="fullName">Full Name</label>
                <input
                  className="font-medium text-formFontColor px-4 py-4 bg-white focus:outline-2 focus:outline-offset-2 focus:outline-none border border-formBorderColor rounded-[12px] p-[5px] h-[55px] w-full"
                  type="text"
                  id="#fullName"
                  value={fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({ type: "setFullName", payload: e.target.value })
                  }
                />
              </div>
            ) : (
              ""
            )}
            <div className="inputContainer flex flex-col mb-4">
              <label htmlFor="email">Email Address</label>
              <input
                className="font-medium text-formFontColor px-4 py-4 bg-white focus:outline-2 focus:outline-offset-2 focus:outline-none border border-formBorderColor rounded-[12px] p-[5px] h-[55px] w-full"
                type="email"
                id="#email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({ type: "setEmail", payload: e.target.value })
                }
              />
            </div>
            <div className="inputContainer flex flex-col mb-4">
              <label htmlFor="password">Password</label>
              <div className="pwd-input-div text-formFontColor bg-white border border-formBorderColor rounded-[12px] p-[5px] pe-15 h-[55px] relative flex items-center justify-between">
                <input
                  className={`border-0 border-e-2 border-e-formBorderColor px-4  pt-4 ${
                    passwordVisible ? "pb-4" : "pb-6"
                  } focus:outline-none w-full ${
                    passwordVisible ? "text-xl" : "text-6xl"
                  } h-1/2`}
                  type={`${passwordVisible ? "text" : "password"}`}
                  id="#password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({ type: "setPassword", payload: e.target.value })
                  }
                />
                <div
                  className="icon-div absolute top-50% end-5"
                  onClick={() => dispatch({ type: "togglePasswordVisibility" })}
                >
                  {passwordVisible ? (
                    <FaEyeSlash className="text-gray-500 text-xl" />
                  ) : (
                    <FaEye className="text-gray-500 text-xl" />
                  )}
                </div>
              </div>
            </div>
            <button className="btn w-full rounded-lg my-5 py-4 bg-deepGreen text-white font-bold">
              {displayForSignup && !displayForLogin ? "Sign Up" : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
