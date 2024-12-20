/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import bgPhoto from "../../assets/bg-photo.jpeg";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";

const Profile = () => {
  const [url, setUrl] = useState(null);
  const [devicesInfo, setDevicesInfo] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const localUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const userInfoUpdate = async () => {
      const userData = await fetch(
        `${import.meta.env.VITE_BackendUrl}/v1/api/short-urls?limit=200`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("__myapp_token"),
          },
        }
      );

      const data = await userData.json();
      setUrl(data);

      const userDevisesInfo = await fetch(
        `${import.meta.env.VITE_BackendUrl}/v1/api/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("__myapp_token"),
          },
        }
      );
      const userInfo = await userDevisesInfo.json();
      console.log(userInfo.locationInfo);
      setDevicesInfo(userInfo?.userData);
      setUserLocation(userInfo?.locationInfo);
    };
    userInfoUpdate();
  }, []);

  return (
    <>
      {/* TailwindCSS Responsive Design */}
      <section className="relative  block lg:h-[400px] h-[300px] sm:h-[500px] mt-10 lg:mt-5">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover rounded-lg"
          style={{
            backgroundImage: `url(${bgPhoto})`,
          }}
        >
          <span className="w-full h-full absolute opacity-50 bg-black/70"></span>
        </div>
      </section>

      <section className="relative py-10 rounded-b-2xl">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-[#181822ea] w-full mb-6 shadow-xl  -mt-80 md:-mt-64 border-2 border-gray-100/10 rounded-lg">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                {/* User Image */}
                <div className="w-full sm:w-6/12 md:w-4/12 px-4 order-2 flex justify-center lg:-mt-16">
                  <div className="relative">
                    <img
                      alt="User Avatar"
                      src={localUserData?.photoURL}
                      className="shadow-xl rounded-full border-none w-32 h-32 object-cover"
                    />
                  </div>
                </div>

                {/* Button */}
                <div className="w-full md:w-4/12 px-4 order-3 md:text-right self-center mt-4 md:mt-0">
                  <div className="py-6 px-3 text-center md:text-right">
                    <Link to="/user/dashboard">
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold hover:shadow-md shadow text-sm px-4 py-2 rounded-full transition-all duration-150"
                        type="button"
                      >
                        Create a Link
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Stats */}
                <div className="w-full md:w-4/12 px-4 order-1 mt-4 md:mt-0">
                  <div className="flex justify-center py-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-lg sm:text-xl font-bold block uppercase tracking-wide">
                        {url?.count || "0"}
                      </span>
                      <span className="text-sm text-gray-400">Links</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-lg sm:text-xl font-bold block uppercase tracking-wide">
                        {url?.totalClicks || "0"}
                      </span>
                      <span className="text-sm text-gray-400">Clicks</span>
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-lg sm:text-xl font-bold block uppercase tracking-wide">
                        {url?.inactiveLinks || "0"}
                      </span>
                      <span className="text-sm text-gray-400">Inactive</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center pb-10 mt-4">
                <span className="text-sm text-gray-400">
                  Welcome to your profile
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold leading-normal text-gray-100 mb-2">
                  {localUserData?.displayName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold">
                  <i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                  Your email: {localUserData?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  user Clicks per link Section */}
      <div className="h-[447px] w-full mb-10 p-2 py-6 bg-[#181822]/50 border-2 border-gray-100/10 rounded-lg">
        {url?.data?.length > 0 ? (
          <>
            <span className="text-center text-sm text-gray-200 font-bold ml-10">
              Clicks per link: {url?.totalClicks || "0"}
            </span>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart width={40} height={40} data={url?.data}>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#181822",
                    borderColor: "#333",
                  }}
                  content={(props) => (
                    <div>
                      {props.payload?.map((item) => (
                        <div
                          key={item.name}
                          className="bg-indigo-400 text-white py-2 px-4 rounded-md shadow-lg"
                        >
                          <p>
                            {" "}
                            <span>Clicks: {item?.payload?.clicks}</span>
                          </p>
                          <p>
                            <span>
                              {" "}
                              Date: {item?.payload?.dateTime?.split(",")[0]}
                            </span>
                          </p>
                          <p>
                            <span> Short Link: {item?.payload?.shotLink}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                />
                <YAxis dataKey="clicks" />
                <XAxis dataKey="shotLink" />
                <Bar
                  dataKey="clicks"
                  fill="#6366f1"
                  radius={[10, 10, 0, 0]}
                  onMouseOver={(e) => (e.target.style.fill = "#4f46e5")}
                  onMouseOut={(e) => (e.target.style.fill = "#6366f1")}
                />
              </BarChart>
            </ResponsiveContainer>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center mt-40">
            <span className="text-center lg:text-5xl text-3xl text-gray-200 font-bold lg:ml-10">
              No Data Found :(
            </span>
            <p className="text-center lg:text-2xl mt-5 text-gray-500 text-xl font-semibold lg:ml-10">
              No data found for this link
            </p>
          </div>
        )}
      </div>

      <div className="flex lg:flex-row flex-col lg:gap-x-5 gap-y-5 justify-center items-center h-full my-10">
        {/* user Devices and Browser Information Section */}
        <div className=" h-full lg:w-[50%] mb-10 border-2 border-gray-100/10 rounded-lg">
          <div className="bg-[#181822]/50 rounded-lg shadow-xl p-6 flex flex-col">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-100">
                Devices and browsers information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-400">
                This is some information about the user devices and browsers
              </p>
            </div>
            <div className="border-t border-gray-500/50 px-4 py-5 sm:p-0">
              <div className="sm:divide-y sm:divide-gray-500/50">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-300">
                    Browser Name
                  </div>
                  <div className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                    {devicesInfo?.browser?.name || "N/A"}
                  </div>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-300">
                    Operating System Name
                  </div>
                  <div className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                    {devicesInfo?.os?.name || "N/A"}
                  </div>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-300">
                    Device Type
                  </div>
                  <div className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                    {devicesInfo?.device?.type || "Desktop"}
                  </div>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-300">
                    Browser CPU
                  </div>
                  <div className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                    {devicesInfo?.cpu?.architecture?.toUpperCase() || "N/A"}
                  </div>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-300">
                    Browser Engine
                  </div>
                  <div className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                    {devicesInfo?.engine?.name || "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* User Location Information Section */}
        <div className=" h-full lg:w-[50%] mb-10 border-2 border-gray-100/10 rounded-lg">
          <div className="h-[440px] w-full  bg-[#181822]/50  p-6  ">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-100">
                Your Location Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-400">
                This is the information about your location.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* IP Address */}
              <div className="p-4 bg-[#181822ea] rounded-lg shadow-md text-gray-300">
                <span className="text-sm font-semibold">IP Address:</span>
                <p className="text-gray-100">{userLocation?.ip || "N/A"}</p>
              </div>

              {/* Country Name */}
              <div className="p-4 bg-[#181822ea] rounded-lg shadow-md text-gray-300">
                <span className="text-sm font-semibold">Country:</span>
                <p className="text-gray-100">
                  {userLocation?.country || "N/A"}
                </p>
              </div>

              {/* City */}
              <div className="p-4 bg-[#181822ea] rounded-lg shadow-md text-gray-300">
                <span className="text-sm font-semibold">City:</span>
                <p className="text-gray-100">{userLocation?.city || "N/A"}</p>
              </div>

              {/* Postal Code */}
              <div
                className="p-4 bg-[#181822ea] rounded-lg shadow-md text-gray-300  text-start tooltip tooltip-top"
                data-tip="Same time the your location information shows not correctly."
              >
                <span className="text-sm font-semibold">Postal Code:</span>
                <p className="text-gray-100">{userLocation?.postal || "N/A"}</p>
              </div>

              {/* Region */}
              <div
                className="p-4 bg-[#181822ea] rounded-lg shadow-md text-gray-300 text-start  tooltip tooltip-top"
                data-tip="Same time the your location information shows not correctly."
              >
                <span className="text-sm font-semibold">Region:</span>
                <p className="text-gray-100">{userLocation?.region || "N/A"}</p>
              </div>

              {/* Country Capital */}
              <div className="p-4 bg-[#181822ea] rounded-lg shadow-md text-gray-300">
                <span className="text-sm font-semibold">Capital:</span>
                <p className="text-gray-100">
                  {userLocation?.country_capital || "N/A"}
                </p>
              </div>

              {/* Time Zone */}
              <div className="p-4 bg-[#181822ea] rounded-lg shadow-md text-gray-300">
                <span className="text-sm font-semibold">Time Zone:</span>
                <p className="text-gray-100">
                  {userLocation?.timezone || "N/A"}
                </p>
              </div>

              {/* Currency */}
              <div className="p-4 bg-[#181822ea] rounded-lg shadow-md text-gray-300">
                <span className="text-sm font-semibold">Currency:</span>
                <p className="text-gray-100">
                  {userLocation?.currency || "N/A"}
                </p>
              </div>

              {/* Latitude & Longitude */}
              <div className="p-4 bg-[#181822ea] rounded-lg shadow-md text-gray-300">
                <span className="text-sm font-semibold">Coordinates:</span>
                <p className="text-gray-100">
                  {userLocation?.latitude || "N/A"},{" "}
                  {userLocation?.longitude || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
