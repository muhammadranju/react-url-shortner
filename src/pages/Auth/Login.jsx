import { useContext, useState } from "react";
import { Lock, Mail, Image } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    photoURL: "",
  });

  const navigate = useNavigate();
  const { user, isLoggedIn, setLoading } = useContext(AuthContext);

  if (user || isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setFormData((prev) => ({
      ...prev,
      emailError: "",
      passwordError: "",
    }));

    if (!formData.email) {
      setFormData((prev) => ({
        ...prev,
        emailError: "Email is required",
      }));
      return;
    } else if (!formData.password) {
      setFormData((prev) => ({
        ...prev,
        passwordError: "Password is required",
      }));
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      setLoading(false);
      toast.success("User login Successfully!");
      Cookies.set("isLoggedIn", true);
      navigate(location.state ? location.state : "/");
    } catch (error) {
      if (error.message.includes("auth/invalid-credential")) {
        toast.error("Invalid Credential email or password!");
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      emailError: "",
      passwordError: "",
    }));
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
        <div className="w-full md:w-1/2 p-8">
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Login
            </h1>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-800 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500 text-xs">
                {formData.emailError}
              </span>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-gray-800 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-red-500 text-xs">
                {formData.passwordError}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition-all"
            >
              Login
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
              Sign in with Google
            </button>

            <div className="text-center">
              <Link to="/register">
                <button type="button" className="text-blue-600 hover:underline">
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
