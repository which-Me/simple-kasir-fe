import { SunIcon } from "../icons/sun-icon";
import { MoonIcon } from "../icons/moon-icon";

import { useSwitch, VisuallyHidden } from "@heroui/react";
import { useTheme } from "@/contexts/Theme/ThemeContext";

const ThemeSwitch = (props) => {
  const {
    Component,
    // isSelected,
    slots,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
            ],
          })}
          onClick={toggleTheme}
        >
          {!isDark ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
      <p className="text-default-500 select-none">
        {!isDark ? "Light" : "Dark"} Mode
      </p>
    </div>
  );
};

export default ThemeSwitch;
