import { useContext, useState, useRef, useEffect } from "react";
import { CiLogin } from "react-icons/ci";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { BsMenuButtonFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";
import { Button } from "@headlessui/react";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const { signOutUser } = useContext(AuthContext);
  const cookie = Cookies.get("__myapp_isLoggedIn");
  const localUserData = JSON.parse(localStorage.getItem("userData"));

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle dropdown
  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <header className="pt-3 sticky top-0 z-50 bg-gray-800/20 backdrop-blur-lg">
      <div className="navbar container mx-auto px-4 md:px-6 lg:px-8">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center">
          {/* Mobile Dropdown Menu */}
          {!cookie ? (
            <div className="dropdown lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              {/* Dropdown Content */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 bg-gray-800 rounded-box shadow-lg z-[1] p-2 space-y-2"
              >
                <li>
                  <Link
                    to={"/login"}
                    className="btn btn-sm rounded-full bg-gray-700 border-gray-500 text-white font-bold hover:bg-gray-600"
                  >
                    Login
                    <CiLogin className="text-xl" />
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/register"}
                    className="btn btn-sm rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600"
                  >
                    Create for Free
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
          {/* Brand Name */}
          <Link
            to={"/"}
            className="text-xl lg:text-3xl font-black bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent"
          >
            LinkiyShort
          </Link>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-x-3 flex items-center">
          {cookie ? (
            <>
              {/* Profile Photo Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center gap-x-2 hover:bg-white/10 p-1 rounded-lg lg:px-3 transition-colors cursor-pointer"
                  onClick={handleDropdownToggle}
                >
                  <div className="bg-white/90 p-[2px] rounded-full">
                    <img
                      src={
                        localUserData?.photoURL ||
                        "https://www.gravatar.com/avatar/2f0b64d14b2d2bf2c0b6e3d1b47d3a94?s=200&d=mp"
                      }
                      className="lg:w-8 w-9 rounded-full"
                      alt="Profile"
                    />
                  </div>
                  <div className="hidden sm:block flex flex-col">
                    <span className="text-white font-semibold text-sm block -mb-1">
                      {localUserData?.displayName || "User Name"}
                    </span>
                    <small className="text-gray-400">Personal</small>
                  </div>
                </div>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#181822] shadow-lg rounded-lg z-50">
                    <ul className="py-2 text-gray-200  rounded-md border border-gray-500/50 p-1">
                      <li className=" px-4 py-2 flex items-center space-x-2 border-b font-bold  border-b-gray-500/50  ">
                        <BsMenuButtonFill />
                        <span> My Account</span>
                      </li>

                      <li className="mt-1">
                        <Link
                          to={"/profile"}
                          className=" px-4 py-2 flex items-center space-x-2  hover:bg-gray-700 rounded-lg"
                        >
                          <FaRegUser />
                          <span>Profile</span>
                        </Link>
                      </li>

                      <li className="mb-1">
                        <Link
                          to={"/dashboard"}
                          className=" px-4 py-2 flex items-center space-x-2  hover:bg-gray-700 rounded-lg"
                        >
                          <TbLayoutDashboardFilled />
                          <span> Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <div className="border-b-[1px] border-gray-500/50"></div>
                      </li>
                      <li>
                        <div
                          onClick={() => {
                            setDropdownOpen(false);
                            signOutUser();
                          }}
                          className=" text-red-500 transition-colors px-4 py-2 flex cursor-pointer items-center space-x-2  hover:bg-gray-700 rounded-lg"
                        >
                          <FiLogOut />
                          <span> Logout</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Link to={"/login"}>
                <Button className="inline-flex items-center gap-2 rounded-full bg-gray-700 py-2.5 px-4 text-sm font-semibold text-white shadow-inner hover:bg-gray-600">
                  Login
                  <CiLogin className="text-xl" />
                </Button>
              </Link>
              {/* Register Button */}
              <div className="hidden lg:flex">
                <Link to={"/register"}>
                  <Button className="inline-flex items-center gap-2 rounded-full bg-blue-700 py-2.5 px-4 text-sm font-semibold text-white shadow-inner hover:bg-blue-600">
                    Create for Free
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
