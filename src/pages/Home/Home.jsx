// import { IoIosLink } from "react-icons/io";
// import Table from "../../components/Table/Table";

import AdvancedAnalytics from "../../components/AdvancedAnalytics/AdvancedAnalytics";
import Banner from "../../components/Banner/Banner";
import Heading from "../../components/Heading/Heading";
import ManageLinks from "../../components/ManageLinks/ManageLinks";

const Home = () => {
  return (
    <section className="mt-10">
      {/* <div className="flex flex-col items-center gap-y-3 justify-center">
        <h1 className="lg:text-5xl text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 via-red-500 to-indigo-500 bg-clip-text text-transparent">
          Shorten Your Loooong Links :)
        </h1>
        <p className=" lg:w-[40%] text-center font-medium dark:text-gray-400 text-gray-800">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>

        <div className="w-full lg:max-w-xl mt-5">
          <label className="input input-bordered rounded-full bg-gray-800   relative flex items-center">
            <IoIosLink className="mr-2 text-xl" />

            <input type="text" placeholder="Enter the link here " />
            <button className="btn rounded-full right-0 absolute  bg-blue-500 text-white font-bold hover:bg-blue-600">
              Shorten Now!
            </button>
          </label>
        </div>

        <p className="text-center text-sm mt-5">
          You can create <span className="font-bold text-pink-500">05</span>{" "}
          more links. Register Now to enjoy Unlimited usage
        </p>
      </div> */}
      <Banner></Banner>
      {/* <Table />

      <div className="flex justify-center mt-10 gap-x-3">
        <button className=" btn bg-blue-500 text-white font-bold hover:bg-blue-600">
          Prev-
        </button>

        <button className="btn bg-blue-500 text-white font-bold hover:bg-blue-600">
          Next+
        </button>
      </div> */}

      <Heading></Heading>
      <ManageLinks></ManageLinks>
      <AdvancedAnalytics></AdvancedAnalytics>
    </section>
  );
};

export default Home;
