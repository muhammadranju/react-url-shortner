import { useContext, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [eye, setEye] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);

  if (user || isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handlerLogin = async (data) => {
    setIsSubmitting(true);
    const email = data.email;
    const password = data.password;

    const response = await fetch(
      `${import.meta.env.VITE_BackendUrl}/v1/api/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("__myapp_token"),
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const result = await response.json();
    if (result.status === 401) {
      toast.error(result.message);
    }

    if (result.success) {
      toast.success("User login Successfully!");
      Cookies.set("__myapp_user_updated", false);
      Cookies.set("__myapp_token", result.userData.token);
      Cookies.set("__myapp_refreshToken", result.userData.refreshToken);
      Cookies.set("__myapp_isLoggedIn", true);
      Cookies.set("__myapp_user_profile_updated", true);

      navigate("/");
    }
    setIsSubmitting(false);
  };

  const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_BackendUrl}/google`;
  };

  return (
    <div className=" my-20 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl w-full lg:max-w-4xl flex overflow-hidden">
        {/* Illustration Section */}
        <div className="lg:block hidden lg:w-1/2 bg-gradient-to-tr from-indigo-600  lg:p-8 flex items-center justify-center">
          <div className="text-center text-white">
            <img
              className=" w-full drop-shadow-2xl flex overflow-hidden"
              src="/svg/Computer-login-bro.svg"
              alt=""
            />
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <p className="text-lg opacity-80">
              Welcome back to Linkly. Login to your account and start exploring
              new possibilities.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <form onSubmit={handleSubmit(handlerLogin)} className="space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-100">
              Login Now!
            </h1>

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
                    message: "Password is required.",
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
              className={`w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition-all  ${
                isSubmitting &&
                "  hover:opacity-90 opacity-50 cursor-not-allowed bg-gradient-to-r from-blue-900 to-purple-900 text-white"
              }`}
            >
              {!isSubmitting && <>Login Now</>}

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
              className="w-full flex items-center justify-center text-white border border-gray-300  py-3 rounded-lg  hover:border-indigo-500 hover:text-white transition-colors "
            >
              <FcGoogle className="text-2xl mr-2" />
              Sign in with Google
            </button>

            <div className="text-center">
              <Link to="/auth/register">
                <button
                  type="button"
                  className="text-indigo-400 hover:underline"
                >
                  Need an account? Register
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
