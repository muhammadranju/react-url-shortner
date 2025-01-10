/* eslint-disable react/prop-types */
import { useState } from "react";

const UserActivity = ({ url }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust as needed

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the data for the current page
  const currentItems = url?.findAnalytics
    ?.reverse()
    .slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(
    (url?.findAnalytics?.length || 0) / itemsPerPage
  );

  // Handle clicking on a page number
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6 bg-[#1f1f2f] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">
        User Activity
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-gray-300">
          <thead>
            <tr className="bg-[#2a2a3b] text-gray-100">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Location</th>
              <th className="py-2 px-4 text-left">Device Type</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((item, index) => (
              <tr key={index} className="hover:bg-[#333344]">
                <td className="py-2 px-4">{indexOfFirstItem + index + 1}</td>
                <td className="py-2 px-4 capitalize">
                  {item?.location ?? "N/A"}
                </td>
                <td className="py-2 px-4 capitalize">
                  {item?.device.type ?? "N/A"}
                </td>
                <td className="py-2 px-4">{item?.dateTime?.date ?? "N/A"}</td>
                <td className="py-2 px-4">{item?.dateTime?.time ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === index + 1
                ? "bg-[#2a2a3b] text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserActivity;
