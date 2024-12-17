const Feature = () => {
  return (
    <div className=" mt-10 flex flex-col items-center  mx-auto  md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-100 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="df31b9f6-a505-42f8-af91-d2b7c3218e5c"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#df31b9f6-a505-42f8-af91-d2b7c3218e5c)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">The</span>
          </span>{" "}
          quick, brown fox jumps over a lazy dog
        </h2>
        <p className="text-base text-gray-400 md:text-lg">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque rem aperiam, eaque ipsa quae.
        </p>
      </div>
      <div className="grid gap-8 row-gap-8 lg:grid-cols-3">
        <div className="sm:text-center flex text-center flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <img
              src="https://www.rebrandly.com/_astro/Feature1_05d7c0ad2a_1whppB.png"
              alt=""
            />
          </div>
          <h6 className="mb-2 font-semibold leading-5">The good cheese</h6>
          <p className="max-w-md mb-3 text-sm text-gray-400 sm:mx-auto">
            Extend the reach and performance of every domain
          </p>
        </div>
        <div className="sm:text-center flex text-center flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <img
              src="https://www.rebrandly.com/_astro/Feature2_1e312e8910_27NpR8.png"
              alt=""
            />
          </div>
          <h6 className="mb-2 font-semibold leading-5">Chainsaw foal hay</h6>
          <p className="max-w-md mb-3 text-sm text-gray-400 sm:mx-auto">
            Build high-velocity link solutions with the #1 scalable and secure
            API
          </p>
        </div>
        <div className="sm:text-center flex text-center flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <img
              src="https://www.rebrandly.com/_astro/Feature3_686a10d28c_1zJM8U.png"
              alt=""
            />
          </div>
          <h6 className="mb-2 font-semibold leading-5">Pick up truck</h6>
          <p className="max-w-md mb-3 text-sm text-gray-400 sm:mx-auto">
            Make link data work for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
