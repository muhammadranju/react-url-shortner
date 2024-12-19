const Feature = () => {
  return (
    <div className="flex flex-col items-center  mx-auto lg:mt-36 mt-20 mb-20  md:px-24 lg:px-8 ">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-100 sm:text-4xl md:mx-auto text-center">
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
          quick and easy way to shorten your links
        </h2>
        <p className="text-base text-gray-300 md:text-lg text-center font-extralight">
          Shorten your links with Linkly and enjoy the convenience of a user
          friendly dashboard and robust analytics.
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
          <h6 className="mb-2 font-semibold leading-5">Best Performance</h6>
          <p className="max-w-md mb-3 text-sm text-gray-300 sm:mx-auto font-extralight">
            Extend the reach and performance of every domain with Linkly and
            ensure that every URL counts for your marketing, e-commerce, and
            affiliate strategies.
          </p>
        </div>
        <div className="sm:text-center flex text-center flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <img
              src="https://www.rebrandly.com/_astro/Feature2_1e312e8910_27NpR8.png"
              alt=""
            />
          </div>
          <h6 className="mb-2 font-semibold leading-5">Scalable and Secure</h6>
          <p className="max-w-md mb-3 text-sm text-gray-300 sm:mx-auto font-extralight">
            Build high-velocity link solutions with the #1 scalable and secure
            API for Linkly. Linkly is built with the latest technologies and
            designed to be scalable and secure.
          </p>
        </div>
        <div className="sm:text-center flex text-center flex-col items-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <img
              src="https://www.rebrandly.com/_astro/Feature3_686a10d28c_1zJM8U.png"
              alt=""
            />
          </div>
          <h6 className="mb-2 font-semibold leading-5">User-Friendly</h6>
          <p className="max-w-md mb-3 text-sm text-gray-300 sm:mx-auto font-extralight">
            Make link data work for you. Track clicks, geographic, and devices
            data to optimize your link management strategy with Linkly. Linkly
            is designed to be user-friendly and easy to use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
