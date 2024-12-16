const TableSkeleton = () => {
  return (
    <div className="relative overflow-x-auto mt-10 rounded-lg hidden lg:block animate-pulse">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs py-5 text-gray-400 dark:bg-gray-800/60">
          <tr>
            <th scope="col" className="px-6 py-3">
              <div className="h-4 rounded w-full"> Short Link</div>
            </th>
            <th scope="col" className="px-6 py-3">
              {/* Original Link */}
              <div className="h-4 rounded w-full"> Original Link</div>
            </th>
            <th scope="col" className="px-6 py-3">
              {/* Clicks */}
              <div className="h-4 rounded w-full"> Clicks</div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="h-4 rounded w-full"> Status</div>
              {/* Status */}
            </th>
            <th scope="col" className="px-6 py-3">
              {/* Date - Time */}
              <div className="h-4 rounded w-full"> Date - Time </div>
            </th>
            <th scope="col" className="px-6 py-3">
              {/* Action */}
              <div className="h-4 rounded w-full">Action</div>
            </th>
          </tr>
        </thead>
        <tbody className="py-2 dark:bg-[#181822]">
          <tr className=" border-b border-gray-700/50">
            <th scope="row" className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[110%]" />
            </th>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded  w-[130%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[60%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[90%]"></div>
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[70%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[100%]"></div>
            </td>
          </tr>
          <tr className=" border-b border-gray-700/50">
            <th scope="row" className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[110%]" />
            </th>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded  w-[130%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[60%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[90%]"></div>
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[70%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[100%]"></div>
            </td>
          </tr>
          <tr className=" border-b border-gray-700/50">
            <th scope="row" className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[110%]" />
            </th>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded  w-[130%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[60%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[90%]"></div>
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[70%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[100%]"></div>
            </td>
          </tr>
          <tr className=" border-b border-gray-700/50">
            <th scope="row" className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[110%]" />
            </th>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded  w-[130%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[60%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[90%]"></div>
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[70%]" />
            </td>
            <td className="px-6 py-7">
              <div className="h-4 bg-gray-600 rounded w-[100%]"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
