import { useContext } from "react";
import { CiLogin } from "react-icons/ci";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const cookie = Cookies.get("isLoggedIn");
  console.log(user);

  return (
    <header className=" pt-3 sticky top-0 z-50 bg-gray-800/20 backdrop-blur-lg">
      <div className="navbar xl:container mx-auto w-11/12 lg:w-11/12 md:w-11/12">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {!cookie ? (
                <>
                  <Link
                    to={"/login"}
                    className="btn rounded-full border border-gray-500  text-white font-bold hover:bg-gray-600 hover:text-white"
                  >
                    Login
                    <span>
                      <CiLogin className="text-xl font-bold" />
                    </span>
                  </Link>
                  <Link
                    to={"/register"}
                    className="btn rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600"
                  >
                    Register Now{" "}
                  </Link>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
          <Link
            to={"/"}
            className="btn btn-ghost text-3xl font-black bg-gradient-to-r from-pink-500  to-indigo-500 bg-clip-text text-transparent hover:bg-transparent"
          >
            LinkiyShort
          </Link>
        </div>

        <div className="navbar-end gap-x-3">
          {cookie ? (
            <>
              <div>
                <small className="underline">Welcome</small>

                <h4 className="font-semibold">
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
                    alt=""
                  />
                </div>
              </Link>

              <Link
                to={"/"}
                onClick={signOutUser}
                className="btn rounded-full border border-gray-500  text-white font-bold hover:bg-gray-600 hover:text-white"
              >
                Log Out
                <span>
                  <CiLogin className="text-xl font-bold" />
                </span>
              </Link>
            </>
          ) : (
            ""
          )}

          {!cookie ? (
            <>
              <Link
                to={"/login"}
                className="btn rounded-full border border-gray-500  text-white font-bold hover:bg-gray-600 hover:text-white"
              >
                Login
                <span>
                  <CiLogin className="text-xl font-bold" />
                </span>
              </Link>
              <div className=" lg:flex hidden">
                <Link
                  to={"/register"}
                  className="btn rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600"
                >
                  Register Now
                </Link>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
