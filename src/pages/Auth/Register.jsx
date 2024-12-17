import { useContext, useEffect, useState } from "react";
import { Lock, Mail, User, Image } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";

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
      navigate("/login");
    }
    setErrors(result.message);
    setIsSubmitting(false);
  };

  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_BackendUrl}/google`;
  };

  return (
    <div className=" my-24 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl w-full max-w-4xl flex overflow-hidden">
        {/* Illustration Section */}
        <div className="md:block hidden w-1/2 bg-gradient-to-tr from-indigo-600  p-8 flex items-center justify-center">
          <div className="text-center text-white">
            <Image size={200} className="mx-auto mb-6 " />
            <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-lg opacity-80">
              Create your account and explore new possibilities
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8">
          <form onSubmit={handleSubmit(handlerRegister)} className="space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Register
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
              className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition-all`}
              disabled={isSubmitting}
            >
              Create Account
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center text-white border border-gray-300  py-3 rounded-lg transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                className="mr-3"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.916l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>
              Sign up with Google
            </button>

            {/* <button onClick={handleGoogleAuth}>Google</button> */}
            <div className="text-center">
              <Link to="/login">
                <button type="button" className="text-blue-600 hover:underline">
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
