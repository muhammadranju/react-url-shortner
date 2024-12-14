import { IoIosLink } from "react-icons/io";
import Table from "../../components/Table/Table";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";
import { RotatingLines } from "react-loader-spinner";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  // const [isCookeUpdated, setIsCookeUpdated] = useState(false);
  const urlRef = useRef(null);
  const isCookeUpdated = Cookies.get("__myapp_user_updated");

  useEffect(() => {
    const userInfoUpdate = async () => {
      if (!isCookeUpdated) {
        const res = await fetch(
          `${import.meta.env.VITE_BackendUrl}/v1/api/users/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        await res.json();
        // setIsCookeUpdated(true);
        Cookies.set("__myapp_user_updated", true);
      }
    };

    userInfoUpdate();
  }, [user.id, isCookeUpdated]);

  const handelURLSubmit = async () => {
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
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    console.log(urlRef.current.value);
  };

  if (loading) {
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
              className="w-full pl-10 pr-28 py-3 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handelURLSubmit}
              className="absolute right-0 top-0 bottom-0 m-1 px-4 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600"
            >
              Shorten Now!
            </button>
          </label>
        </div>

        <p className="text-center text-sm mt-5">
          You can create <span className="font-bold text-pink-500">05</span>{" "}
          more links. Register Now to enjoy Unlimited usage
        </p>
      </div>

      <Table />

      <div className="flex justify-center mt-10 gap-x-3">
        <button className=" btn bg-blue-500 text-white font-bold hover:bg-blue-600">
          Prev-
        </button>

        <button className="btn bg-blue-500 text-white font-bold hover:bg-blue-600">
          Next+
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
