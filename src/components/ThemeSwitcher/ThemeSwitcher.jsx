import {
  Dropdown,
  DropdownAction,
  DropdownContent,
  DropdownItem,
} from "keep-react";
import { MoonStars, SunDim } from "phosphor-react";
import { useTheme } from "../../context/ThemeProvider";

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();
  return (
    <Dropdown placement="bottom-start" className="z-50 bg-green-200">
      <DropdownAction asChild>
        <button className="rounded-lg bg-primary-25 p-2.5 dark:bg-white">
          <MoonStars size={20} color="#1C222B" className="hidden dark:block" />
          <SunDim size={20} color="#444" className="block dark:hidden" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownAction>
      <DropdownContent
        align="start"
        className="w-[180px] border border-metal-100 dark:border-metal-800 dark:bg-metal-900"
      >
        <DropdownItem onClick={() => setTheme("light")}>Light</DropdownItem>
        <DropdownItem onClick={() => setTheme("dark")}>Dark</DropdownItem>
        <DropdownItem onClick={() => setTheme("system")}>System</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

export default ThemeSwitcher;
