import toast from "react-hot-toast";
import { BiSolidMessageAltError } from "react-icons/bi";

// eslint-disable-next-line react/prop-types
const AlertModel = ({ isExistsLink }) => {
  const handleCopyToClipboard = (url) => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_FrontendUrl}/r/${url}`);
    toast.success("Copied!");
  };
  return (
    <dialog id="showExistsLink" className="modal  text-slate-100">
      <div className="modal-box bg-[#181825] flex flex-col items-center justify-center">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-yellow-500 text-center text-7xl">
          <BiSolidMessageAltError />
        </h3>
        <p className="py-4 text-lg font-bold">
          You can&apos;t shorten the same URL again
        </p>

        <p>
          Old Link: {`${import.meta.env.VITE_FrontendUrl}/r/${isExistsLink}`}
        </p>
        <button
          className="btn btn-sm mt-2 bg-green-600 border-none"
          onClick={() => handleCopyToClipboard(isExistsLink)}
        >
          Copy!
        </button>
      </div>
    </dialog>
  );
};

export default AlertModel;
