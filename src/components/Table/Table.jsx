/* eslint-disable react/prop-types */
import { IoIosLink } from "react-icons/io";
import TRComponent from "./TR";
import { FaLinkSlash } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { Button } from "@headlessui/react";

const Table = ({ urls }) => {
  const handleCopyToClipboard = (url) => {
    navigator.clipboard.writeText(url.shortUrl);
    toast.success("Copied!");
  };

  return (
    <>
      {/* Table View for Large Screens */}
      {urls.length > 0 ? (
        <div className="relative overflow-x-auto mt-10 rounded-lg hidden lg:block">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs py-5 text-gray-700 bg-gray-50 dark:bg-gray-800/60 dark:text-gray-400">
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
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="py-2 ">
              {urls?.map((url) => (
                <TRComponent key={url._id} url={url} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-2xl font-bold text-gray-500 hidden lg:block my-20">
          No Data Found :(
        </div>
      )}

      {/* {urls.length > 0 ? <Table urls={urls} /> : <TableSkeletonMobile />} */}

      {/* Card View for Mobile Devices */}
      <div className="lg:hidden mt-10">
        {urls.length > 0 ? (
          urls?.map((url) => (
            <div
              key={url._id}
              className="bg-gray-800/30 border border-gray-50/30 text-white rounded-lg shadow-md p-4 mb-4"
            >
              <div className="mb-2">
                <span className="font-bold">Short Link: </span>
                <div className="flex items-center gap-x-2">
                  <span className="text-blue-400 break-all">
                    {url.shortUrl}
                  </span>
                  <button
                    onClick={() => handleCopyToClipboard(url)}
                    className="text-gray-300 p-2 bg-gray-700 rounded-full"
                  >
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
              <div className="mt-2">
                <span className="font-bold">Action: </span>
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="inline-flex  items-center gap-2 rounded-full bg-gray-700 py-2.5 lg:px-5 lg:pr-5 px-3 pr-4 text-xs/4 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    {/* <span className="lg:hidden">Log</span> */}
                    Open Link
                  </Button>
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-2xl font-bold text-gray-500 lg:hidden my-20">
            No Data Found :(
          </div>
        )}
        {/* <TableSkeletonMobile /> */}
      </div>
    </>
  );
};

export default Table;
