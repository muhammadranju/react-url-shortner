import { FaCopy } from "react-icons/fa";
import { FaLinkSlash } from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";

const TRComponent = () => {
  return (
    <tr className=" border-b dark:bg-gray-900 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-center gap-x-3">
          https://linkly.com/Bn41aCOlnxj
          <button className="text-xl cursor-pointer bg-gray-700 p-2 rounded-full">
            <FaCopy className="text-gray-300" />
          </button>
        </div>
      </th>

      <td className="px-6 py-4 text-xs gap-x-2 flex items-center">
        <img
          src="https://i.ibb.co/4b2r0tR/image.png"
          alt="image"
          className="w-8 h-8 rounded-full"
        />
        https://www.twitter.com/tweets/8erelCoihu/
      </td>
      <td className="px-6 py-4">1313</td>
      <td className="px-6 py-4">
        <div className="text-green-500 text-xs flex items-center gap-x-2">
          Active
          <span className="bg-green-500/30 text-white rounded-full p-2 text-xs">
            <IoIosLink className="text-lg" />
          </span>
          <span className="bg-yellow-500/30 text-yellow-400 rounded-full p-2 text-xs">
            <FaLinkSlash className="text-lg" />
          </span>
        </div>
      </td>
      <td className="px-6 py-4">Oct - 10 -2023</td>
    </tr>
  );
};

export default TRComponent;
