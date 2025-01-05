import { FaFacebook, FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { TbWorldWww } from "react-icons/tb";

const Team = () => {
  return (
    <div className="px-4  mx-auto  md:px-36 lg:px-8  my-20 lg:my-20">
      <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
        <p className="inline-block lg:px-3 py-px mb-4 text-lg font-bold  tracking-wider text-indigo-600 text-center uppercase rounded-full bg-teal-accent-400">
          Know Our Team
        </p>
        <p className="text-base text-gray-300 md:text-lg font-extralight">
          We are a team of developers and designers who are passionate about
          building the best user experiences for our users.
        </p>
      </div>
      <div className="grid gap-10 mx-auto lg:grid-cols-2 lg:max-w-screen-lg">
        <div className="grid sm:grid-cols-3 text">
          <div className="relative w-full h-48 max-h-full rounded shadow sm:h-auto">
            <img
              className="absolute object-cover w-full h-full rounded"
              src="https://avatars.githubusercontent.com/u/80270685?v=4"
              alt="Person"
            />
          </div>
          <div className="flex flex-col justify-center mt-5 sm:mt-0 sm:p-5 sm:col-span-2">
            <p className="text-lg font-bold">Md. Ranju</p>
            <p className="mb-4 text-xs text-gray-200">Frontend & Backend</p>
            <p className="mb-4 text-sm tracking-wide text-gray-200 font-extralight">
              Ranju is doing Frontend for designing also UI and Backend for
              making apis, authentication, database manage and more.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/muhammadranju"
                target="_blank"
                className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <FaGithub className="text-3xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammadranju/"
                target="_blank"
                className="text-blue-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <IoLogoLinkedin className="text-3xl" />
              </a>
              <a
                href="https://www.mdranju.xyz"
                target="_blank"
                className="text-blue-800 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <TbWorldWww className="text-3xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-3">
          <div className="relative w-full h-48 max-h-full rounded shadow sm:h-auto">
            <img
              className="absolute object-cover w-full h-full rounded"
              src="https://avatars.githubusercontent.com/u/174138051?v=4"
              alt="Person"
            />
          </div>
          <div className="flex flex-col justify-center mt-5 sm:mt-0 sm:p-5 sm:col-span-2">
            <p className="text-lg font-bold">Mukit Hossen</p>
            <p className="mb-4 text-xs text-gray-200">Frontend</p>
            <p className="mb-4 text-sm tracking-wide text-gray-200 font-extralight">
              Mukit is doing Frontend of this project. He help to make ui ideas
              and design.
            </p>
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/MukitHossen7"
                target="_blank"
                className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="https://www.facebook.com/mukit.hossen.487594"
                className="text-blue-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://mukithossen.vercel.app"
                target="_blank"
                className="text-blue-800 transition-colors duration-300 hover:text-deep-purple-accent-400"
              >
                <TbWorldWww className="text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
