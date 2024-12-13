import { useContext, useEffect, useState } from "react";
import { Lock, Mail, User, Image } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";

import axios from "axios";

const RegistrationLoginPage = () => {
  const [ip, setIp] = useState("");
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, setLoading, setRefetch } =
    useContext(AuthContext);
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip);
      } catch (error) {
        console.error("Error fetching the IP address:", error);
      }
    };

    fetchIp();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");

    if (token) {
      // Store the JWT token in cookies
      Cookies.set("token", token, { expires: 1, secure: true }); // Expires in 1 day, secure flag for HTTPS
      Cookies.set("isLoggedIn", true);

      // Update login state
      setIsLoggedIn(Cookies.get("isLoggedIn"));
      setRefetch(Date.now());
      toast.success("User logged in successfully with Google!");

      // Clear the token from the query string and navigate
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [setIsLoggedIn, setRefetch]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    fullNameError: "",
    emailError: "",
    passwordError: "",
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      [`${name}Error`]: "", // Clear any existing error
    }));
  };

  const prepareUserData = (additionalData = {}) => {
    return {
      name: formData.fullName,
      email: formData.email,
      ip: ip,
      ...additionalData,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.fullName || !formData.email || !formData.password) {
      setFormData((prev) => ({
        ...prev,
        fullNameError: !formData.fullName ? "Full Name is required" : "",
        emailError: !formData.email ? "Email is required" : "",
        passwordError: !formData.password ? "Password is required" : "",
      }));
      return;
    }

    try {
      // Firebase User Creation

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.fullName,
      });

      // Prepare and Send User Data to Backend

      if (userCredential.user) {
        const userData = prepareUserData();
        await axios.post("http://localhost:3000/v1/api/users", userData);
      }

      // Sign out and navigate
      await signOut(auth);
      navigate("/login");

      setRefetch(Date.now());
      setLoading(false);
      toast.success("User Created Successfully!");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use!");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email!");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const googleLogin = await signInWithPopup(auth, googleProvider);
      const user = googleLogin.user;

      const userData = prepareUserData({
        photoURL: user.photoURL,
        providerData: user.providerData,
      });

      console.log(user.providerData[0].email);
      if (user) {
        toast.success("User login Successfully!");
        setRefetch(Date.now());

        Cookies.set("isLoggedIn", true);
        setIsLoggedIn(Cookies.get("isLoggedIn"));

        await axios.post("http://localhost:3000/v1/api/users", userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:3000/google";
  };

  return (
    <div className=" my-24  flex items-center justify-center p-4">
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Register
            </h1>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-red-500 text-xs">
                  {formData.fullNameError}
                </span>
              </div>
            </div>

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
