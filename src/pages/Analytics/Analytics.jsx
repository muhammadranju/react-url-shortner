import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const navigate = useNavigate();
  // Dummy user activity data (multiple escalations)
  const demoData = [
    { location: "United States", device: "Desktop", time: "2024-12-19 10:00" },
    { location: "Canada", device: "Mobile", time: "2024-12-19 11:30" },
    { location: "India", device: "Tablet", time: "2024-12-19 13:15" },
    { location: "Germany", device: "Desktop", time: "2024-12-19 14:45" },
    { location: "Australia", device: "Mobile", time: "2024-12-19 16:00" },
  ];

  // Format data for the Line Chart
  // const lineChartData = [
  //   { name: "10:00 AM", Desktop: 1, Mobile: 0, Tablet: 0 },
  //   { name: "11:30 AM", Desktop: 1, Mobile: 1, Tablet: 0 },
  //   { name: "01:15 PM", Desktop: 1, Mobile: 1, Tablet: 1 },
  //   { name: "02:45 PM", Desktop: 2, Mobile: 1, Tablet: 1 },
  //   { name: "04:00 PM", Desktop: 2, Mobile: 2, Tablet: 1 },
  // ];

  // const lineChartData = [
  //   { name: "10:00 AM", Desktop: 1, Mobile: 0,  },
  //   { name: "11:30 AM", Desktop: 1, Mobile: 1,  },
  //   { name: "01:15 PM", Desktop: 1, Mobile: 1,  },
  //   { name: "02:45 PM", Desktop: 2, Mobile: 1,  },
  //   { name: "04:00 PM", Desktop: 2, Mobile: 2,  },
  // ];

  useEffect(() => {
    const getUrlInfo = async () => {
      const urlData = await fetch(
        `${import.meta.env.VITE_BackendUrl}/v1/api/short-urls/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await urlData.json();
      setUrl(data);
    };
    getUrlInfo();
  }, []);

  console.log(url?.lineChartData);
  
  return (
    <div className="container mx-auto px-4 py-10">
      <Button
        onClick={() => navigate(-1)}
        className="flex   items-center gap-2 mb-5 rounded-full bg-gray-700 py-2.5 lg:px-5 lg:pr-5 px-3 pr-4 text-xs/4 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        <IoMdArrowRoundBack />
        Back
      </Button>
      <div className="bg-[#181822ea] border-2 border-gray-100/10 rounded-lg shadow-lg p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">
          Analytics Overview
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Clicks */}
          <div className="p-4 bg-[#1f1f2f] rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-300">Total Clicks</h3>
            <p className="text-2xl font-bold text-gray-100 mt-2">
              {url?.analytics.clicks}
            </p>
          </div>

          {/* Original URL */}
          <div className="p-4 bg-[#1f1f2f] rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-300">Original URL</h3>
            <a
              title={url?.analytics.originalUrl}
              href={url?.analytics.originalUrl}
              className="text-gray-100 underline hover:text-indigo-400 mt-2 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {url?.analytics.originalUrl.length > 50
                ? url?.analytics.originalUrl.slice(0, 65) + "..."
                : url?.analytics.originalUrl}
            </a>
          </div>

          {/* Shortened URL */}
          <div className="p-4 bg-[#1f1f2f] rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-300">Shortened URL</h3>
            <a
              href={`${import.meta.env.VITE_FrontendUrl}/r/${
                url?.analytics?.shotLink
              }`}
              className="text-gray-100 underline hover:text-indigo-400 mt-2 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              {`${import.meta.env.VITE_FrontendUrl}/r/${
                url?.analytics?.shotLink
              }`}
            </a>
          </div>
        </div>

        {/* Line Chart Section */}
        <div className="p-6 bg-[#1f1f2f] rounded-lg shadow-md mb-10">
          <h2 className="text-2xl font-bold text-gray-100 mb-4 text-center">
            Device Type Analytics (Over Time)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={url?.lineChartData}>
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#181822",
                  borderColor: "#333",
                }}
                cursor={{ stroke: "#8884d8" }}
              />
              <Line
                type="monotone"
                dataKey="Desktop"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Mobile"
                stroke="#22d3ee"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              {/* <Line
                type="monotone"
                dataKey="Tablet"
                stroke="#f472b6"
                strokeWidth={2}
                dot={{ r: 4 }}
              /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Activity Table */}
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
                  <th className="py-2 px-4 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {demoData.map((item, index) => (
                  <tr key={index} className="hover:bg-[#333344]">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{item.location}</td>
                    <td className="py-2 px-4">{item.device}</td>
                    <td className="py-2 px-4">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Icon and Short Link */}
        <div className="mt-6 flex justify-center items-center">
          <img
            src={url?.analytics.icon}
            alt="Site Icon"
            className="w-16 h-16 mr-4 rounded-lg shadow-md"
          />
          <div>
            <p className="text-gray-300 text-sm">Short Link:</p>
            <p className="text-gray-100 text-lg font-bold">
              {url?.analytics.shotLink}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
