/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";
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
    // signOut(auth);
    setUser(null);
    setLoading(false);
    setIsLoggedIn(false);
    Cookies.remove("isLoggedIn");
    Cookies.remove("token");
  };

  useEffect(() => {
    // const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    //   setLoading(false);
    //   setIsLoggedIn(Cookies.get("isLoggedIn"));
    // });

    const verifyUser = async () => {
      setLoading(false);
      setIsLoggedIn(Cookies.get("isLoggedIn"));
      const res = await fetch(
        "https://react-url-shortner-eight.vercel.app/verify",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("token"),
          },
        }
      );
      const user = await res.json();
      setUser(user.user);
    };
    verifyUser();

    // return () => {
    //   unSubscribe;
    // };
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
