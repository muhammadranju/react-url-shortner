/* eslint-disable react/prop-types */
import { IoIosLink } from "react-icons/io";
import TRComponent from "./TR";
import { FaLinkSlash } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";

const Table = ({ urls }) => {
  return (
    <>
      {/* Table View for Large Screens */}
      <div className="relative overflow-x-auto mt-10 rounded-lg hidden lg:block">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs py-5 text-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Short Link
              </th>
              <th scope="col" className="px-6 py-3">
                Original Link
              </th>
              <th scope="col" className="px-6 py-3">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Date - Time
              </th>
            </tr>
          </thead>
          <tbody className="py-2">
            {urls?.map((url) => (
              <TRComponent key={url._id} url={url} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View for Mobile Devices */}
      <div className="lg:hidden mt-10">
        {urls?.map((url) => (
          <div
            key={url._id}
            className="bg-gray-800 text-white rounded-lg shadow-md p-4 mb-4"
          >
            <div className="mb-2">
              <span className="font-bold">Short Link: </span>
              <div className="flex items-center gap-x-2">
                <span className="text-blue-400 break-all">{url.shortUrl}</span>
                <button className="text-gray-300 p-2 bg-gray-700 rounded-full">
                  <FaCopy className="text-lg" />
                </button>
              </div>
            </div>

            <div className="mb-2">
              <span className="font-bold">Original Link: </span>
              <span className="text-gray-300 break-all block">
                {url.originalUrl.length > 50
                  ? url.originalUrl.slice(0, 50) + "..."
                  : url.originalUrl}
              </span>
            </div>

            <div className="mb-2">
              <span className="font-bold">Clicks: </span>
              <span>{url.clicks}</span>
            </div>

            <div className="mb-2 flex items-center gap-x-2">
              <span className="font-bold">Status: </span>
              {url.clicks > 100 ? (
                <div className="text-yellow-500 flex items-center gap-x-2">
                  <FaLinkSlash className="text-lg" />
                  <span>Inactive</span>
                </div>
              ) : (
                <div className="text-green-500 flex items-center gap-x-2">
                  <IoIosLink className="text-lg" />
                  <span>Active</span>
                </div>
              )}
            </div>

            <div>
              <span className="font-bold">Date - Time: </span>
              <span>{url.dateTime}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Table;
