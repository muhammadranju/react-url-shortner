import { Button } from "@headlessui/react";
import { MdOutlineChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import analyticsImg from "../../assets/analytics-dark.png";

const HeroSection = () => {
  return (
    <section className="flex lg:flex-row flex-col lg:my-20 my-10 text-gray-100 lg:gap-20 justify-between items-center ">
      {/* Left Content */}
      <div className="flex flex-col justify-center space-y-6 w-full lg:w-1/2">
        <h1 className="text-4xl lg:text-6xl font-bold ">
          Simplify your{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-red-400 to-red-500  bg-clip-text text-transparent">
            Links
          </span>
        </h1>
        <p className="text-lg text-gray-300 font-light">
          Effortlessly brand, track, retarget, and A/B test links with our
          feature-rich URL shortener. Explore new horizons and ensure that every
          URL counts for your marketing, e-commerce, and affiliate strategies.
        </p>
        <div className="lg:space-x-4 space-y-3">
          <Link to="/user/dashboard">
            <Button className="inline-flex  items-center gap-2 rounded-full bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 pl-5 data-[focus]:outline-white">
              Get Started for free
              <MdOutlineChevronRight className="text-4xl font-thin" />
            </Button>
          </Link>
        </div>
      </div>
      {/* Right Image Section */}
      <div className="relative lg:mt-0 mt-10  lg:w-[45%] border-2 border-gray-100/10 rounded-lg">
        <img
          src={analyticsImg}
          alt="Link Toolbox"
          className=" rounded-lg drop-shadow-lg w-[100%]"
        />
        {/* Labels around the image */}
      </div>
    </section>
  );
};

export default HeroSection;
