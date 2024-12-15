/* eslint-disable react/prop-types */

const ResponsiveTable = ({ urls }) => {
  return (
    <>
      {/* Table for Desktop */}
      <div className="hidden lg:block mt-8">
        <table className="table-auto w-full border-collapse border border-gray-700">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border border-gray-700 px-4 py-2">#</th>
              <th className="border border-gray-700 px-4 py-2">Original URL</th>
              <th className="border border-gray-700 px-4 py-2">Short URL</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, index) => (
              <tr key={index} className="hover:bg-gray-800">
                <td className="border border-gray-700 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-700 px-4 py-2 truncate max-w-xs">
                  {url.originalUrl}
                </td>
                <td className="border border-gray-700 px-4 py-2 text-blue-500">
                  <a
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.shortUrl}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Collapsible Cards for Mobile */}
      <div className="lg:hidden mt-8">
        {urls.map((url, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white rounded-lg shadow-md p-4 mb-4"
          >
            <p className="font-bold text-lg mb-2">Link #{index + 1}</p>
            <div className="flex flex-col gap-1">
              <span>
                <strong>Original URL:</strong>{" "}
                <span className="break-words text-gray-300">
                  {url.originalUrl}
                </span>
              </span>
              <span>
                <strong>Short URL:</strong>{" "}
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  {url.shortUrl}
                </a>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResponsiveTable;
