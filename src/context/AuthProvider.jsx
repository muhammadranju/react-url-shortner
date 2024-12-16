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
      {},
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

  console.log(user);
  const updateUser = (user) => {
    setUser(user);
  };

  const signOutUser = () => {
    setUser(null);
    setLoading(false);
    setIsLoggedIn(false);
    Cookies.remove("__myapp_isLoggedIn");
    Cookies.remove("__myapp_user_updated");
    Cookies.remove("__myapp_token");
    Cookies.remove("__myapp_user_profile_updated");
  };

  const verifyUser = async () => {
    const token = Cookies.get("__myapp_token");

    if (!token) {
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
  // const refreshAccessToken = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/refresh",
  //       {},
  //       { withCredentials: true }
  //     );
  //     console.log(response);
  //     // Cookies.set("__myapp_token", result.userData.token);
  //   } catch (err) {
  //     console.error("Token refresh failed:", err);
  //   }
  // };

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     try {
  //       const token = Cookies.get("__myapp_token");
  //       const isLoggedIn = Cookies.get("__myapp_isLoggedIn");
  //       setLoading(true);

  //       if (token && isLoggedIn) {
  //         const res = await fetch(`${import.meta.env.VITE_BackendUrl}/verify`, {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             authorization: token,
  //           },
  //         });

  //         const data = await res.json();
  //         if (res.ok) {
  //           setUser(data.user);
  //           setIsLoggedIn(true);
  //         } else {
  //           setUser(null);
  //           setIsLoggedIn(false);
  //           Cookies.remove("__myapp_token");
  //           Cookies.remove("__myapp_isLoggedIn");
  //         }
  //       } else {
  //         setUser(null);
  //         setIsLoggedIn(false);
  //       }
  //     } catch (error) {
  //       console.error("Error verifying user:", error);
  //       if (error.response?.status === 403) {
  //         // If the access token is expired, refresh it
  //         await refreshAccessToken();
  //       } else {
  //         console.log("Access denied");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   verifyUser();
  // }, [refetch]);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      await verifyUser();
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const values = {
    user,
    setUser,
    loading,
    setLoading,
    updateUser,
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
