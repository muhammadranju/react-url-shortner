import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Redirect = () => {
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    window.location.href = `${import.meta.env.VITE_BackendUrl}/url/${id}`;
  }, [id]);
  return (
    <div className="flex justify-center flex-col items-center text-gray-200 mt-64 space-y-6">
      <h1 className="lg:text-6xl text-4xl font-bold text-center relative">
        Redirecting
        <span className="loading loading-dots loading-lg absolute -bottom-2  -right-10"></span>
      </h1>
      <span className="loading loading-infinity loading-lg "></span>
      <p className="text-center lg:text-2xl text-gray-500 text-xl font-semibold relative">
        Please wait redirecting your link
        <span className="loading loading-dots loading-sm absolute -bottom-0  -right-5"></span>
      </p>
    </div>
  );
};

export default Redirect;