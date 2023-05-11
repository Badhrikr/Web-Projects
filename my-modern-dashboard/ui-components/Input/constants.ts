import { Size, Theme } from "../model";
import { InputThemeStyle } from "./model";

const inputContainerStyles: Array<string> = [
  "relative",
  "flex",
  "items-center",
  "bg-theme-background-input",
  "border-gray-500",
  "px-[0.20rem]",
  "disabled:cursor-not-allowed",
];

const inputCommonStyles: Array<string> = [
  "border-none",
  "outline-none",
  "w-full",
  "placeholder:whitespace-nowrap",
  "bg-theme-background-input",
  "resize-none",
  "font-primary",
];

const inputContainerThemeStyles: Record<Theme, Array<string>> = {
  primary: ["text-theme-secondary"],
  secondary: ["text-theme-secondary"],
};

const inputSize: Record<Size, Array<string>> = {
  xs: ["p-1", "text-xs"],
  sm: ["p-2", "text-sm"],
  md: ["p-2.5", "text-base"],
  lg: ["p-4", "text-lg"],
  xl: ["p-5", "text-xl"],
  _2xl: ["p-6", "text-2xl"],
};

const inputThemeStyles: Record<InputThemeStyle, Array<string>> = {
  outline: ["border", "border-gray-500", "rounded-md"],
  "bottom-lined": ["border-b", "border-gray-500"],
  ghost: ["border-transparent"],
};

export {
  inputContainerStyles,
  inputCommonStyles,
  inputContainerThemeStyles,
  inputSize,
  inputThemeStyles,
};
