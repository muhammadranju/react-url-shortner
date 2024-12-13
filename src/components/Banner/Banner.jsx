import { MdOutlineChevronRight } from "react-icons/md";
import { Button } from "@headlessui/react";

const Banner = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-white/85 lg:text-5xl text-3xl font-bold text-center  ">
        Simplify your{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-red-500 to-indigo-500  bg-clip-text text-transparent">
          Links
        </span>
      </h2>
      <p className="text-center pt-3">
        Effortless link management with a user-friendly dashboard and robust
        analytics.
      </p>
      <div className="flex items-center justify-center mt-7">
        {/* <button className="bg-blue-500 text-white py-1 rounded-md pl-6 pr-3 text-sm flex items-center gap-1">
          Get Started 
        </button> */}
        <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Get Started <MdOutlineChevronRight className="text-4xl font-thin" />
        </Button>
      </div>
    </div>
  );
};

export default Banner;
