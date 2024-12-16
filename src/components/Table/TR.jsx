/* eslint-disable react/prop-types */
import { Button } from "@headlessui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";
import { FaLinkSlash } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";

const TRComponent = ({ url }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_BackendUrl}/url/${url.shotLink}`
    );

    setIsCopied(true);
    toast.success("Copied!");
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <tr className=" border-b dark:bg-[#181822] dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-center gap-x-3">
          {url.shortUrl}
          <button
            onClick={handleCopyToClipboard}
            className="text-xl cursor-pointer tooltip  tooltip-top bg-gray-700 p-2 rounded-full"
            data-tip={isCopied ? "Copied!" : "Copy to clipboard"}
          >
            <FaCopy className="text-gray-300" />
          </button>
        </div>
      </th>

      <td className="px-6 py-4 text-xs gap-x-2 flex items-center">
        <img src={url.icon} alt={url.icon} className="w-8 h-8 rounded-full" />
        <span className=" tooltip  tooltip-right " title={url.originalUrl}>
          {url.originalUrl.length > 50
            ? url.originalUrl.slice(0, 30) + "..."
            : url.originalUrl}
        </span>
      </td>
      <td className="px-6 py-4">{url.clicks}</td>
      <td className="px-6 py-4 flex">
        {url.clicks > 1000 ? (
          <div className="text-yellow-500 text-xs flex items-center gap-x-2">
            <span className="bg-yellow-500/30 text-yellow-400 rounded-full p-2 text-xs">
              <FaLinkSlash className="text-lg" />
            </span>
            Inactive
          </div>
        ) : (
          <div className="text-green-500 text-xs flex items-center gap-x-2">
            Active
            <span className="bg-green-500/30 text-white rounded-full p-2 text-xs">
              <IoIosLink className="text-lg" />
            </span>
          </div>
        )}
      </td>

      <td className="px-6 py-4">{url.dateTime}</td>
      <td className="px-6 py-4">
        <a
          href={`${import.meta.env.VITE_BackendUrl}/url/${url.shotLink}`}
          target="_blank"
        >
          <Button className="inline-flex  items-center gap-2 rounded-full bg-gray-700 py-2.5 lg:px-5 lg:pr-5 px-3 pr-4 text-xs/4 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
            {/* <span className="lg:hidden">Log</span> */}
            <span className="hidden lg:block">Open Link</span>
          </Button>
        </a>
      </td>
    </tr>
  );
};

export default TRComponent;
