/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [refetch, setRefetch] = useState();

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

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = Cookies.get("__myapp_token");
        const isLoggedIn = Cookies.get("__myapp_isLoggedIn");
        setLoading(true);

        if (token && isLoggedIn) {
          const res = await fetch(`${import.meta.env.VITE_BackendUrl}/verify`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
          });

          const data = await res.json();
          if (res.ok) {
            setUser(data.user);
            setIsLoggedIn(true);
          } else {
            setUser(null);
            setIsLoggedIn(false);
            Cookies.remove("__myapp_token");
            Cookies.remove("__myapp_isLoggedIn");
          }
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error verifying user:", error);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, [refetch]);

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
    setRefetch,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
