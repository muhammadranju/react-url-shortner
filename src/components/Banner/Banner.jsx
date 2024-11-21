import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="lg:text-5xl text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 via-red-500 to-indigo-500 bg-clip-text text-transparent">
        Simplify your Links
      </h2>
      <p className="text-center">
        Effortless link management with a user-friendly dashboard and robust
        analytics.
      </p>
      <div className="flex items-center justify-center">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full">
          Get Started
        </button>
        <button>Deploy with Helm</button>
      </div>
      <Link className="text-center">Official Documentation</Link>
    </div>
  );
};

export default Banner;
