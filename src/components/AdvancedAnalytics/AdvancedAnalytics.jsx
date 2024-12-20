import { RiCheckboxCircleFill } from "react-icons/ri";
import homepage_hero from "../../assets/homepage_hero_alpha.png";
const AdvancedAnalytics = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-16 lg:my-20 my-10 ">
      <div className="w-full lg:w-1/2 border border-white/20 rounded-lg">
        <img src={homepage_hero} className=" rounded-lg  lg:w-full"></img>
      </div>
      <div className="w-full lg:w-1/2  flex flex-col justify-center  ">
        <h3 className="font-bold text-2xl lg:text-3xl text-white/85 mb-5">
          Advanced analytics for your links
        </h3>
        <p className=" text-slate-300 font-extralight">
          The analytics dashboard provides detailed insights into your link
          performance. Track clicks, geographic, and devices data to optimize
          your link management strategy.
        </p>
        <div className=" border-b border-white/20 my-5"></div>

        <div className="text-start space-y-3 text-white">
          <div className="flex items-center gap-3">
            <RiCheckboxCircleFill className="text-blue-500 text-xl" />
            <p className="text-sm">Dynamic reports and dashboards</p>
          </div>

          <div className="flex items-center gap-3">
            <RiCheckboxCircleFill className="text-blue-500 text-xl" />
            <p className="text-sm">Comprehensive analytics</p>
          </div>

          <div className="flex items-center gap-3">
            <RiCheckboxCircleFill className="text-blue-500 text-xl" />
            <p className="text-sm">Real-time data</p>
          </div>

          <div className="flex items-center gap-3">
            <RiCheckboxCircleFill className="text-blue-500 text-xl" />
            <p className="text-sm">Detailed insights</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
