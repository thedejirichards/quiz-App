import { FaEyeSlash } from "react-icons/fa";
// import { FaEye } from "react-icons/fa";
function LoginLogOut() {
  const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault()
  }
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
            <div className="h1 text-5xl font-bold mb-3">Sign Up</div>
            <div className="span-parent flex">
              <span className="form-span-content me-3">
                Already have an account?
              </span>
              <span className="form-span-content text-deepGreen font-semibold underline">
                Log In
              </span>
            </div>
          </div>
          <form action="" className="form w-full" onSubmit={handleSubmit}>
            <div className="inputContainer flex flex-col mb-4">
              <label htmlFor="fullName">Full Name</label>
              <input
                className="font-medium text-formFontColor px-4 py-4 bg-white focus:outline-2 focus:outline-offset-2 focus:outline-none border border-formBorderColor rounded-[12px] p-[5px] h-[55px] w-full"
                type="text"
                id="#fullName"
              />
            </div>
            <div className="inputContainer flex flex-col mb-4">
              <label htmlFor="email">Email Address</label>
              <input
                className="font-medium text-formFontColor px-4 py-4 bg-white focus:outline-2 focus:outline-offset-2 focus:outline-none border border-formBorderColor rounded-[12px] p-[5px] h-[55px] w-full"
                type="email"
                id="#email"
              />
            </div>
            <div className="inputContainer flex flex-col mb-4">
              <label htmlFor="password">Password</label>
              <div className="pwd-input-div text-formFontColor bg-white border border-formBorderColor rounded-[12px] p-[5px] pe-15 h-[55px] relative flex items-center justify-between">
                <input
                  className="border-0 border-e-2 border-e-formBorderColor px-4  pt-4 pb-6 focus:outline-none w-full text-6xl h-1/2"
                  type="password"
                  id="#password"
                />
                <div className="icon-div absolute top-50% end-5">
                  <FaEyeSlash className="text-gray-500 text-xl" />
                  {/* <FaEye /> */}
                </div>
              </div>
            </div>
            <button className="btn w-full rounded-lg my-5 py-4 bg-deepGreen text-white font-bold">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginLogOut;
