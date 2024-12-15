import { useContext } from "react";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const cookie = Cookies.get("__myapp_isLoggedIn");

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
                className="menu menu-sm dropdown-content mt-3 w-52 bg-base-100 rounded-box shadow-lg z-[1] p-2"
              >
                <>
                  <li>
                    <Link
                      to={"/login"}
                      className="btn btn-sm rounded-full border border-gray-500 text-white font-bold hover:bg-gray-600"
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
                      Register Now
                    </Link>
                  </li>
                </>
              </ul>
            </div>
          ) : (
            ""
          )}
          {/* Brand Name */}
          <Link
            to={"/"}
            className="text-2xl lg:text-3xl font-black bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent"
          >
            LinkiyShort
          </Link>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-x-3 flex items-center">
          {cookie ? (
            <>
              <div className="hidden sm:block">
                <small className="text-gray-400">Welcome</small>
                <h4 className="text-white font-semibold">
                  {user?.displayName || "User Name"}
                </h4>
              </div>

              <Link to={"/dashboard"}>
                <div className="bg-white/90 p-1 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://www.gravatar.com/avatar/2f0b64d14b2d2bf2c0b6e3d1b47d3a94?s=200&d=mp"
                    }
                    className="w-9 h-9 rounded-full"
                    alt="Profile"
                  />
                </div>
              </Link>

              <Link
                to={"/"}
                onClick={signOutUser}
                className="btn  rounded-full  border border-gray-500 text-white font-bold hover:bg-gray-600"
              >
                Log Out
                <CiLogin className="text-xl" />
              </Link>
            </>
          ) : (
            <>
              {/* Login Button */}
              <Link
                to={"/login"}
                className="btn rounded-full border border-gray-500 text-white font-bold hover:bg-gray-600"
              >
                Login
                <CiLogin className="text-xl" />
              </Link>
              {/* Register Button */}
              <div className="hidden lg:flex">
                <Link
                  to={"/register"}
                  className="btn rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600"
                >
                  Register Now
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Theme Switcher */}
        <div className="z-50">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
