import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  LoginUserAsync,
  resetAuthError,
  selectLoggedInUser,
} from "../../redux";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user?.error) {
      enqueueSnackbar(user.error.message, { variant: "error" });
      dispatch(resetAuthError());
    }
  }, [dispatch, user]);
  

  if (user && user.role === "user") {
    
    return <Navigate to="/" replace={true}/>;
  }

  if (user && user.role === "admin") {
    return <Navigate to="/admin" replace={true}/>;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center h-screen">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 ">
            <div className="mt-10 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <form
                    noValidate
                    method="POST"
                    onSubmit={handleSubmit((data) => {
                      dispatch(
                        LoginUserAsync({
                          email: data.email,
                          password: data.password,
                        })
                      );
                    })}
                  >
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Email not valid",
                        },
                      })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                      autoComplete="true"
                    />
                    <p className="text-xs text-warning">
                      {errors?.email?.message}
                    </p>

                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      autoComplete="true"
                    />
                    {/* <p className="flex"> */}
                    <span className="text-xs text-warning flex-1 text-left">
                      {errors?.password?.message}
                    </span>

                    {/* </p> */}
                    <span className="text-xs text-warning flex-1 text-left">
                      {user?.error?.message}
                    </span>
                    <button
                      onClick={() => navigate("/forgot-password")}
                      className="text-xs text-gray-600 flex-1 text-right w-full"
                    >
                      Forgot Password?
                    </button>

                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-primary text-gray-100 w-full py-4 rounded-lg hover:bg-primary-hover transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-user-check w-6 h-6 -ml-2"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy={7} r={4} />
                        <polyline points="17 11 19 13 23 9" />
                      </svg>

                      <span className="ml-3">Sign In</span>
                    </button>
                  </form>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    <span>Not a member? </span>
                    <button
                      onClick={() => navigate("/signup")}
                      className="border-b border-primary border-dotted text-primary hover:text-primary-hover font-bold"
                    >
                      Create an Account
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-[#afe3ffed] text-center hidden lg:flex justify-center">
            <img src="/images/login-image.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
