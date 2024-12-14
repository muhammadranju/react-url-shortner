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
    Cookies.remove("isLoggedIn");
    Cookies.remove("token");
  };

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(false);
      setIsLoggedIn(Cookies.get("isLoggedIn"));
      const res = await fetch(`${import.meta.env.VITE_BackendUrl}/verify`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("token"),
        },
      });
      const user = await res.json();
      setUser(user.user);
    };
    verifyUser();
  }, [refetch, loading]);

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
