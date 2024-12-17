import { RiCheckboxCircleFill } from "react-icons/ri";
import dashBoardImg from "../../assets/dashboard-dark.png";
const ManageLinks = () => {
  return (
    <div className="flex flex-col flex-col-reverse lg:flex-row gap-9 mt-16 lg:mt-28">
      <div className="w-full lg:w-1/2 text-center">
        <h3 className="font-bold text-2xl lg:text-3xl text-white/85 mb-5">
          Easily Manage Your Links
        </h3>
        <p className="font-thin text-slate-300 ">
          Our dashboard provides a simple and intuitive interface for managing
          all your shortened links. Organize, edit, and track your links
          effortlessly with our powerful tools.
        </p>
        <div className="divider py-3"></div>
        <div className="text-start space-y-3 text-white">
          <div className="flex items-center gap-3">
            <RiCheckboxCircleFill className="text-blue-500 text-xl" />
            <p className="text-sm">Comprehensive link management</p>
          </div>

          <div className="flex items-center gap-3">
            <RiCheckboxCircleFill className="text-blue-500 text-xl" />
            <p className="text-sm">Custom UTM builder</p>
          </div>

          <div className="flex items-center gap-3">
            <RiCheckboxCircleFill className="text-blue-500 text-xl" />
            <p className="text-sm">Password protected links</p>
          </div>

          <div className="flex items-center gap-3">
            <RiCheckboxCircleFill className="text-blue-500 text-xl" />
            <p className="text-sm">Branded links</p>
          </div>

          <div className="flex items-center gap-3">
            <RiCheckboxCircleFill className="text-blue-500 text-xl" />
            <p className="text-sm">User-friendly interface</p>
          </div>
          <div className="flex items-center gap-3">
            <RiCheckboxCircleFill className="text-blue-500 text-xl" />
            <p className="text-sm">Secure and reliable</p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2  ">
        <img
          src={dashBoardImg}
          className="border border-white/20 rounded-lg"
        ></img>
      </div>
    </div>
  );
};

export default ManageLinks;
