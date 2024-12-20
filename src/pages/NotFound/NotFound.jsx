import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="py-24 flex flex-col justify-center items-center px-4 rounded-xl bg-[#181822]/15">
      {/* Main Card Container */}
      <div className="bg-[#1f1f2f91] shadow-lg rounded-lg p-8 max-w-lg w-full text-center border border-gray-100/10">
        {/* Not Found Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-500/20 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10A8 8 0 11. . ."
                clipRule="evenodd"
              />
              <path d="M8 6h4v6H8V6zm0 8h4v2H8v-2z" />
            </svg>
          </div>
        </div>

        {/* Not Found Message */}
        <h1 className="text-4xl font-bold text-gray-100 mb-4">
          Link Not Found
        </h1>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Oops! The link you&apos;re looking for doesn&apos;t exist or has been
          removed. Please check the URL or return to the homepage.
        </p>

        {/* Suggested Action */}
        <div className="bg-[#2a2a3b] rounded-lg p-4 mb-6">
          <p className="text-gray-400 text-sm">
            If you believe this is an error, please contact support.
          </p>
        </div>

        {/* Go Home Button */}
        <Link
          to="/"
          className="inline-block bg-[#6366f1] hover:bg-[#5254f1] text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300"
        >
          Go to Home
        </Link>

        {/* Divider */}
        <div className="mt-6 mb-4 border-t border-gray-600/40"></div>

        {/* Additional Action */}
        <p className="text-sm text-gray-400">
          Need Help?{" "}
          <a
            href="mailto:mdranju23@gmail.com"
            className="text-[#22d3ee] hover:underline font-semibold"
          >
            Contact Support
          </a>
        </p>
      </div>

      {/* Footer Section */}
      <div className="text-gray-400 mt-8 text-center text-sm">
        <p>
          For any inquiries, email us at{" "}
          <a
            href="mailto:mdranju23@gmail.com"
            className="text-[#22d3ee] hover:underline"
          >
            mdranju23@gmail.com
          </a>
          .
        </p>
        <p className="mt-2">Powered by Your Short Link Service</p>
      </div>
    </div>
  );
};

export default NotFound;
