/* eslint-disable no-unused-vars */
import { IoIosLink } from "react-icons/io";
import Table from "../../components/Table/Table";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import TableSkeleton from "../../components/TableSkeleton/TableSkeleton";
import TableSkeletonMobile from "../../components/TableSkeleton/TableSkeletonMobile";
import axios from "axios";
import AlertModel from "../../components/Models/AlertModel";

const Dashboard = () => {
  const { user, verifyUser } = useContext(AuthContext);
  // State Management
  const [urls, setUrls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExistsLink, setIsExistsLink] = useState("");
  const urlRef = useRef(null);
  const token = Cookies.get("__myapp_token");
  const limit = 10; // Fixed number of items per page

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset 
  } = useForm();

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
      try {
        const ipAddress = await axios.get("https://api.ipify.org?format=json");
        const response = await axios.get(
          `https://ipapi.co/${ipAddress?.data?.ip}/json/`
        );
        const data = response.data;

        await fetch(
          `${import.meta.env.VITE_BackendUrl}/v1/api/users/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              ip: data.ip,
              city: data.city,
              postal: data.postal,
              region: data.region,
              country: data.country_name,
              country_capital: data.country_capital,
              timezone: data.timezone,
              currency: data.currency,
              latitude: data.latitude,
              longitude: data.longitude,
            }),
          }
        );

        // Set cookie to true after the function runs
        Cookies.set("__myapp_user_updated", true);
        await verifyUser();
      } catch (error) {
        console.error("Error updating user info:", error);
      }
    };

    // Check the cookie value
    const isCookieUpdated = Cookies.get("__myapp_user_updated");

    if (isCookieUpdated === "false" || !isCookieUpdated) {
      userInfoUpdate();
    } else {
      console.log("User info update skipped. Cookie is already true.");
    }

    fetchUrls(); // Fetch URLs initially
  }, [user.id]);

  const handelURLSubmit = async (dataUrl) => {
    setIsSubmitting(true);
    const icon = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${dataUrl.url}/&size=64`;

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
            originalUrl: dataUrl.url,
            icon: icon,
          }),
        }
      );
      await verifyUser();

      const data = await res.json();

      if (res.ok) {
        setUrls([data.links, ...urls]);
        swal("URL created successfully", { icon: "success" });
        reset({ url: "" });

        dataUrl.url = "";
        fetchUrls(1); // Refresh URLs and go to the first page
      } else {
        // toast.error(data.message);

        if (data.message === "You can't shorten the same URL again") {
          document.getElementById("showExistsLink").showModal();
          setIsExistsLink(data?.existingLink?.url);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
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
              id="url"
              placeholder="Enter the link here"
              className="w-full pl-10 pr-28 py-3 rounded-full bg-gray-800/20 text-white border border-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("url", {
                required: {
                  value: true,
                  message: "URL field is required.",
                },
                pattern: {
                  value:
                    /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost)(:[0-9]{1,5})?(\/[^\s]*)?$/,
                  message: "Please enter a valid URL.",
                },
              })}
            />
            <button
              onClick={handleSubmit(handelURLSubmit)}
              disabled={isSubmitting}
              className={`absolute right-0 flex justify-center items-center top-0 bottom-0 m-1 px-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600  
              ${isSubmitting && "opacity-50 cursor-not-allowed"}`}
            >
              {isSubmitting ? (
                <>
                  Shortening{" "}
                  <span className="loading loading-spinner loading-md"></span>
                </>
              ) : (
                "Shorten Now!"
              )}
            </button>
          </label>
          <span className="text-center ">
            {errors.url && (
              <span className="text-red-500 text-sm font-bold block mt-2">
                {errors.url.message}
              </span>
            )}
          </span>
        </div>
      </div>

      {isLoading ? (
        <>
          <TableSkeleton />
          <TableSkeletonMobile />
        </>
      ) : (
        <Table urls={urls} />
      )}

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
      {/* <button
        className="btn"
        onClick={() => document.getElementById("showExistsLink").showModal()}
      >
        open modal
      </button> */}
      <AlertModel isExistsLink={isExistsLink} />
    </section>
  );
};

export default Dashboard;
