/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoutes = ({ children }) => {
  const { user, loading, isLoggedIn, verifyUser } = useContext(AuthContext);
  const location = useLocation();

  const refreshAccessToken = async () => {
    await verifyUser();
  };

  useEffect(() => {
    refreshAccessToken();
  }, []);

  // If still loading, show spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center mt-72">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          strokeColor="#6366f1"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!isLoggedIn || !user) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default PrivateRoutes;
