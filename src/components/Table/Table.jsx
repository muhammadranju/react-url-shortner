// import { FaCopy } from "react-icons/fa";
// import { FaLinkSlash } from "react-icons/fa6";
// import { IoIosLink } from "react-icons/io";
import TRComponent from "./TR";

const Table = () => {
  return (
    <div className="relative overflow-x-auto mt-10 rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs py-5 text-gray-700  bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
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
          <TRComponent />
          <TRComponent />
          <TRComponent />
          <TRComponent />
          <TRComponent />
          <TRComponent />
          <TRComponent />
          <TRComponent />
          <TRComponent />
          <TRComponent />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
