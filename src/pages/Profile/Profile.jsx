import { Link } from "react-router-dom";
import bgPhoto from "../../assets/bg-photo.jpeg";

const Profile = () => {
  const localUserData = JSON.parse(localStorage.getItem("userData"));
  return (
    <>
      {/* TailwindCSS Responsive Design */}
      <section className="relative block lg:h-[400px] h-[300px] sm:h-[500px] mt-10 lg:mt-5">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover rounded-2xl"
          style={{
            backgroundImage: `url(${bgPhoto})`,
          }}
        >
          <span className="w-full h-full absolute opacity-50 bg-black/70"></span>
        </div>
      </section>

      <section className="relative py-10 rounded-b-2xl">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-[#181822ea] w-full mb-6 shadow-xl rounded-lg -mt-80 md:-mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                {/* User Image */}
                <div className="w-full sm:w-6/12 md:w-4/12 px-4 order-2 flex justify-center lg:-mt-16">
                  <div className="relative">
                    <img
                      alt="User Avatar"
                      src={localUserData?.photoURL}
                      className="shadow-xl rounded-full border-none w-32 h-32 object-cover"
                    />
                  </div>
                </div>

                {/* Button */}
                <div className="w-full md:w-4/12 px-4 order-3 md:text-right self-center mt-4 md:mt-0">
                  <div className="py-6 px-3 text-center md:text-right">
                    <Link to="/dashboard">
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold hover:shadow-md shadow text-sm px-4 py-2 rounded-full transition-all duration-150"
                        type="button"
                      >
                        Create a Link
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Stats */}
                <div className="w-full md:w-4/12 px-4 order-1 mt-4 md:mt-0">
                  <div className="flex justify-center py-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-lg sm:text-xl font-bold block uppercase tracking-wide">
                        22
                      </span>
                      <span className="text-sm text-gray-400">Links</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-lg sm:text-xl font-bold block uppercase tracking-wide">
                        10
                      </span>
                      <span className="text-sm text-gray-400">Clicks</span>
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-lg sm:text-xl font-bold block uppercase tracking-wide">
                        89
                      </span>
                      <span className="text-sm text-gray-400">Inactive</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center pb-10 mt-4">
                <span className="text-sm text-gray-400">
                  Welcome to your profile
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold leading-normal text-gray-100 mb-2">
                  {localUserData?.displayName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold">
                  <i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                  Your email: {localUserData?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
