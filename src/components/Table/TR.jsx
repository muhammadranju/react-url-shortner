/* eslint-disable react/prop-types */
import { FaCopy } from "react-icons/fa";
import { FaLinkSlash } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";

const TRComponent = ({ url }) => {
  return (
    <tr className=" border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-center gap-x-3">
          {url.shortUrl}
          <button className="text-xl cursor-pointer bg-gray-700 p-2 rounded-full">
            <FaCopy className="text-gray-300" />
          </button>
        </div>
      </th>

      <td className="px-6 py-4 text-xs gap-x-2 flex items-center">
        <img src={url.icon} alt={url.icon} className="w-8 h-8 rounded-full" />
        <span className=" tooltip  tooltip-right " data-tip={url.originalUrl}>
          {url.originalUrl.length > 50
            ? url.originalUrl.slice(0, 30) + "..."
            : url.originalUrl}
        </span>
      </td>
      <td className="px-6 py-4">{url.clicks}</td>
      <td className="px-6 py-4 flex">
        {url.clicks > 100 ? (
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
    </tr>
  );
};

export default TRComponent;
