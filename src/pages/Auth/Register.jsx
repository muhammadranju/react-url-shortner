import { useContext, useEffect, useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

const RegistrationLoginPage = () => {
  const [eye, setEye] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isErrors, setErrors] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoggedIn, setIsLoggedIn, setRefetch } = useContext(AuthContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken");

    if (token) {
      Cookies.set("__myapp_token", token, { expires: 30, secure: true }); // Expires in 30 day, secure flag for HTTPS
      Cookies.set("__myapp_refreshToken", refreshToken, {
        expires: 30,
        secure: true,
      }); // Expires in 30 day, secure flag for HTTPS
      Cookies.set("__myapp_isLoggedIn", true);
      Cookies.set("__myapp_user_updated", false);

      setIsLoggedIn(Cookies.get("__myapp_isLoggedIn"));
      setRefetch(Date.now());
      toast.success("User logged in successfully with Google!");
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [setIsLoggedIn, setRefetch]);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handlerRegister = async (data) => {
    setIsSubmitting(true);
    const name = data.fullName;
    const email = data.email;
    const password = data.password;

    const response = await fetch(
      `${import.meta.env.VITE_BackendUrl}/v1/api/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("__myapp_token"),
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      }
    );

    const result = await response.json();

    if (result.success) {
      toast.success("User created successfully!");
      Cookies.set("__myapp_user_updated", false);
      navigate("/auth/login");
    }
    setErrors(result.message);
    setIsSubmitting(false);
  };

  const handleGoogleAuth = () => {
    setIsSubmitting(true);
    window.location.href = `${import.meta.env.VITE_BackendUrl}/google`;
    setIsSubmitting(false);
  };

  return (
    <div className=" my-20 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl w-full lg:max-w-4xl flex overflow-hidden">
        {/* Illustration Section */}
        <div className="md:block hidden w-1/2 bg-gradient-to-tr from-indigo-600  p-8 flex items-center justify-center">
          <div className="text-center text-white">
            {/* <Image size={200} className="mx-auto mb-6 " /> */}
            <img
              src="/svg/Sign-up-amico.svg"
              className=" w-full drop-shadow-2xl flex overflow-hidden"
              alt=""
            />
            <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-lg opacity-80">
              Create your account in Linkly and start exploring new
              possibilities.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <form onSubmit={handleSubmit(handlerRegister)} className="space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-100">
              Create an Account
            </h1>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-2 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("fullName", {
                    required: {
                      value: true,
                      message: "Full Name is required.",
                    },
                    minLength: {
                      value: 3,
                      message: "Full Name must be at least 3 characters.",
                    },
                  })}
                />
                {errors.fullName && (
                  <span className="text-red-500 text-xs mt-1 font-medium">
                    {errors.fullName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-gray-800 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required.",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address.",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs block mt-1 font-medium">
                  {errors.email.message}
                </span>
              )}
              {isErrors && (
                <span className="text-red-500 text-xs block mt-1 font-medium">
                  {isErrors}
                </span>
              )}
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-2 text-gray-400" />
              <input
                type={`${eye ? "text" : "password"}`}
                name="password"
                placeholder="Password"
                className="w-full bg-gray-800 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                    message:
                      "Password must contain at least one uppercase letter, lowercase letter, and number",
                  },
                })}
              />
              <button
                onClick={() => setEye(!eye)}
                type="button"
                className="absolute top-[6px] right-2 p-2 text-gray-500 hover:text-gray-700 focus:outline-none "
              >
                {eye ? (
                  <LuEyeOff className="text-gray-400" />
                ) : (
                  <LuEye className="text-gray-400" />
                )}
              </button>
              {errors.password && (
                <span className="text-red-500 text-xs block mt-1 font-medium">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`w-full  flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition-all  ${
                isSubmitting &&
                " hover:opacity-90 opacity-50 cursor-not-allowed bg-gradient-to-r from-blue-900 to-purple-900 text-white"
              }`}
              disabled={isSubmitting}
            >
              {!isSubmitting && <> Create Account Now</>}
              {isSubmitting && (
                <>
                  <span className="loading loading-spinner loading-sm ml-1"></span>
                </>
              )}
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center text-white border border-gray-300  py-3 rounded-lg hover:border-indigo-500 hover:text-white transition-colors"
            >
              <FcGoogle className="text-2xl mr-2" />
              Sign up with Google
            </button>
            <div className="text-center">
              <Link to="/auth/login">
                <button
                  type="button"
                  className="text-indigo-400 hover:underline"
                >
                  Already have an account? Login
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationLoginPage;
