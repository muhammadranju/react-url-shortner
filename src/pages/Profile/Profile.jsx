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
  const [user, setUser] = useState(null);
  const [devicesInfo, setDevicesInfo] = useState(null);
  const localUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const userInfoUpdate = async () => {
      const userData = await fetch(
        `${import.meta.env.VITE_BackendUrl}/v1/api/short-urls`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: Cookies.get("__myapp_token"),
          },
        }
      );

      const data = await userData.json();
      setUser(data);

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
      const userDevicesInfo = await userDevisesInfo.json();
      setDevicesInfo(userDevicesInfo?.userData);
    };
    userInfoUpdate();
  }, []);

  return (
    <>
      {/* TailwindCSS Responsive Design */}
      <section className="relative  block lg:h-[400px] h-[300px] sm:h-[500px] mt-10 lg:mt-5">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover rounded-2xl"
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
                    <Link to="/dashboard">
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
                        {user?.count || "0"}
                      </span>
                      <span className="text-sm text-gray-400">Links</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-lg sm:text-xl font-bold block uppercase tracking-wide">
                        {user?.totalClicks || "0"}
                      </span>
                      <span className="text-sm text-gray-400">Clicks</span>
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-lg sm:text-xl font-bold block uppercase tracking-wide">
                        {user?.inactiveLinks || "0"}
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
      <div className="flex lg:flex-row flex-col lg:gap-x-5 gap-y-5 justify-center items-center h-full my-10">
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
                    {devicesInfo?.browser?.name}
                  </div>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-300">
                    Operating System Name
                  </div>
                  <div className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                    {devicesInfo?.os?.name}
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
                    {devicesInfo?.cpu?.architecture?.toUpperCase()}
                  </div>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="text-sm font-medium text-gray-300">
                    Browser Engine
                  </div>
                  <div className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                    {devicesInfo?.engine?.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[447px] lg:w-[50%] w-full mb-10 p-2 py-6 bg-[#181822]/50 border-2 border-gray-100/10 rounded-lg">
          <span className="text-center text-sm text-gray-200 font-bold ml-10">
            Clicks per link: {user?.totalClicks || "0"}
          </span>
          <ResponsiveContainer widivh="100%" height="100%">
            <BarChart widivh={40} height={40} data={user?.data}>
              <Tooltip
                content={(props) => (
                  <div>
                    {props.payload?.map((item) => {
                      return (
                        <div
                          key={item.name}
                          className="bg-indigo-400 text-white py-2 px-4 rounded-md shadow-lg"
                        >
                          <p>
                            <span>Clicks:{item?.payload?.clicks}</span>
                          </p>
                          <p>
                            <span>
                              {" "}
                              Date: {item?.payload?.dateTime?.split(",")[0]}
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
              <YAxis dataKey="clicks" />
              <XAxis dataKey="shotLink" />
              <Bar dataKey="clicks" fill="#6366f1 " />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Profile;
