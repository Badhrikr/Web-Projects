import { Size, Theme } from "../model";

const loadingCommonStyles = [
  "border-2",
  "border-r-transparent",
  "rounded-full",
  "animate-spin",
];

const loadingStyles: Record<Theme, Array<string>> = {
  primary: ["border-theme-primary"],
  secondary: ["border-theme-seconday"],
};

const loadingSize: Record<Size, Array<string>> = {
  xs: ["h-[10px]", "w-[10px]"],
  sm: ["h-[15px]", "w-[15px]"],
  md: ["h-[18px]", "w-[18px]"],
  lg: ["h-[20px]", "w-[20px]"],
  xl: ["h-[23px]", "w-[23px]"],
  _2xl: ["h-[26px]", "w-[26px]"],
};

export { loadingCommonStyles, loadingStyles, loadingSize };
