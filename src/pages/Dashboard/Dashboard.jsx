/* eslint-disable no-unused-vars */
import { IoIosLink } from "react-icons/io";
import Table from "../../components/Table/Table";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import swal from "sweetalert";

const Dashboard = () => {
  const { user, loading, verifyUser } = useContext(AuthContext);

  // State Management
  const [urls, setUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const urlRef = useRef(null);
  const isCookeUpdated = Cookies.get("__myapp_user_updated");
  const token = Cookies.get("__myapp_token");
  const limit = 10; // Fixed number of items per page

  // Fetch URLs with Pagination
  const fetchUrls = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BackendUrl
        }/v1/api/short-urls?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      const data = await res.json();
      setUrls(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch URLs.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const userInfoUpdate = async () => {
      // if (!isCookeUpdated) {
      await fetch(
        `${import.meta.env.VITE_BackendUrl}/v1/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Cookies.set("__myapp_user_updated", true);
      // }
      await fetchUrls();
    };

    userInfoUpdate();
  }, [user.id, isCookeUpdated]);

  const handelURLSubmit = async () => {
    // setIsLoading(true);
    const icon = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${urlRef.current.value}/&size=64`;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BackendUrl}/v1/api/short-urls`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("__myapp_token"),
          },
          body: JSON.stringify({
            originalUrl: urlRef.current.value,
            icon: icon,
          }),
        }
      );
      await verifyUser();

      const data = await res.json();

      if (res.ok) {
        setUrls([data.links, ...urls]);
        urlRef.current.value = "";
        fetchUrls(1); // Refresh URLs and go to the first page
        swal("URL created successfully", { icon: "success" });
      } else {
        toast.error(data.message);
        if (data.message === "You can't shorten the same URL again") {
          swal(data.message, `Old Link: ${data?.existingLink?.url}`, {
            icon: "warning",
          });
        }
      }
    } catch (error) {
      console.log(error);
      // toast.error("Failed to shorten URL.");
    }

    setIsLoading(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchUrls(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      fetchUrls(currentPage - 1);
    }
  };

  if (loading || isLoading) {
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
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <section className="mt-10">
      <div className="flex flex-col items-center gap-y-3 justify-center">
        <h3 className="lg:hidden flex justify-center items-center text-center  ">
          Welcome🙂 <span className="font-semibold">{user.displayName} </span>
        </h3>
        <h1 className="lg:text-5xl text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 via-red-500 to-indigo-500 bg-clip-text text-transparent">
          Shorten Your Loooong Links :)
        </h1>
        <p className=" lg:w-[40%] text-center font-medium">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>

        <div className="w-full lg:max-w-xl mt-5">
          <label className="flex items-center relative w-full">
            <div className="absolute left-3 text-xl text-gray-500">
              <IoIosLink />
            </div>

            <input
              type="text"
              ref={urlRef}
              name="url"
              placeholder="Enter the link here"
              className="w-full pl-10 pr-28 py-3 rounded-full bg-gray-800/20 text-white border border-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handelURLSubmit}
              disabled={isLoading}
              className={`absolute right-0 flex justify-center items-center top-0 bottom-0 m-1 px-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600  ${
                isLoading ? " bg-gray-300 hover:bg-gray-300 text-black" : ""
              }`}
            >
              {isLoading ? "Shortening..." : "Shorten Now!"}
            </button>
          </label>
        </div>
      </div>

      <Table urls={urls} />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10 gap-x-3">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`btn bg-blue-500 text-white font-bold hover:bg-blue-600 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          Prev
        </button>

        <span className="flex items-center font-bold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`btn bg-blue-500 text-white font-bold hover:bg-blue-600 ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
