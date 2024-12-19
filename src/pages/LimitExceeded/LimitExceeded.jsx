import { Link } from "react-router-dom";

const LimitExceeded = () => {
  const contactEmail = "mdranju23@gmail.com";

  return (
    <div className=" py-24 flex flex-col justify-center items-center px-4 bg-[#181822]/15 rounded-xl text-gray-200">
      {/* Card Container */}
      <div className="bg-[#1f1f2f91] shadow-lg rounded-lg p-8 max-w-lg w-full text-center border border-gray-100/10">
        {/* Limit Exceeded Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-500/20 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-red-500"
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

        {/* Limit Exceeded Message */}
        <h1 className="text-3xl font-bold text-gray-100 mb-4">
          Link Limit Reached
        </h1>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Your shortened link has reached the maximum click limit of{" "}
          <span className="text-red-400 font-semibold">1000 clicks</span>. This
          link can no longer be accessed.
        </p>

        {/* Suggestions */}
        <div className="bg-[#2a2a3b] rounded-lg p-4 mb-6">
          <p className="text-gray-400 text-sm">
            Need assistance? Contact our support team to request additional
            limits or to create a new link.
          </p>
        </div>

        {/* Contact Admin Button */}
        <a
          href={`mailto:${contactEmail}`}
          className="inline-block bg-indigo-500 hover:bg-[#5254f1] text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300"
        >
          Contact Admin
        </a>

        {/* Divider */}
        <div className="mt-6 mb-4 border-t border-gray-600/40"></div>

        {/* Additional Action */}
        <p className="text-sm text-gray-400">
          Want to shorten another link?{" "}
          <Link to="/" className="text-[#22d3ee] hover:underline font-semibold">
            Go back to home.
          </Link>
        </p>
      </div>

      {/* Footer Section */}
      <div className="text-gray-400 mt-8 text-center text-sm">
        <p>
          For any urgent queries, email us at{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-indigo-500 hover:underline"
          >
            {contactEmail}
          </a>
          .
        </p>
        <p className="mt-2">Powered by LinkiyShort</p>
      </div>
    </div>
  );
};

export default LimitExceeded;
