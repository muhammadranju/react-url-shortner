/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext(null);

const verifyAccessToken = async (token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BackendUrl}/verify`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token as Bearer
        },
      },
      { withCredentials: true }
    );
    return response.data.user;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("Access token expired");
    }
    throw error;
  }
};

const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BackendUrl}/refresh`,
      {
        refreshToken: Cookies.get("__myapp_refreshToken"),
      },
      { withCredentials: true } // Refresh token sent via httpOnly cookie
    );
    const { accessToken } = response.data;

    if (accessToken) {
      Cookies.set("__myapp_token", accessToken); // Store new access token in cookies
      return accessToken;
    }
    throw new Error("Failed to refresh access token");
  } catch (error) {
    console.error("Error refreshing token:", error.message);
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [refetch, setRefetch] = useState();

  const signOutUser = () => {
    setUser(null);
    setLoading(false);
    setIsLoggedIn(false);
    Cookies.remove("__myapp_isLoggedIn");
    Cookies.remove("__myapp_user_updated");
    Cookies.remove("__myapp_token");
    Cookies.remove("__myapp_refreshToken");
    Cookies.remove("__myapp_user_profile_updated");
  };

  const verifyUser = async () => {
    const token = Cookies.get("__myapp_token");
    const refreshToken = Cookies.get("__myapp_refreshToken");

    if (!token && !refreshToken) {
      signOutUser();
      return;
    }

    try {
      // Verify access token
      const userData = await verifyAccessToken(token);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error.message);

      if (error.message === "Access token expired") {
        // Refresh access token if expired
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          // Retry verifying the user with the new access token
          const userData = await verifyAccessToken(newAccessToken);
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          // If token refresh fails, log the user out
          signOutUser();
        }
      } else {
        // For other errors, log the user out
        signOutUser();
      }
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      await verifyUser();
      setLoading(false);
    };

    initializeAuth();
  }, [refetch]);

  const values = {
    user,
    setUser,
    loading,
    setLoading,
    signOutUser,
    isLoggedIn,
    setIsLoggedIn,
    refetch,
    verifyUser,
    setRefetch,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
