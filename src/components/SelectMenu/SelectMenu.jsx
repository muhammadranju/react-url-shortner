/* eslint-disable react/prop-types */
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { CiViewBoard } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function SelectMenu({ url }) {
  return (
    <div className="lg:w-52 lg:text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-full bg-gray-700 py-2.5 lg:px-5 lg:pr-5 px-3 pr-4 text-xs/4 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          <CiViewBoard className="text-xl" /> Actions
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className="w-fit gap-x-1 origin-top-right rounded-xl border border-white/15 bg-[#242433] p-1 text-sm/6 text-white transition shadow-xl duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 ml-5"
        >
          <MenuItem>
            <a
              href={`${import.meta.env.VITE_FrontendUrl}/r/${url.shotLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="inline-flex w-full items-center gap-2 rounded-full bg-gray-700 py-2.5 lg:px-5 lg:pr-5 px-3 pr-4 text-xs/4 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                <FaExternalLinkAlt className="text-base" /> Link
              </Button>
            </a>
          </MenuItem>
          <div className="my-1 h-px bg-white/5" />
          <MenuItem>
            <Link to={`/analytics/${url.shotLink}`}>
              <Button className="inline-flex w-full items-center gap-2 rounded-full bg-gray-700 py-2.5 lg:px-5 lg:pr-5 px-3 pr-4 text-xs/4 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                <TbDeviceAnalytics className="text-xl" /> Analytics
              </Button>
            </Link>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
