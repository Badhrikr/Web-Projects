import { Size, Theme } from "../model";
import { DropdownThemeStyle } from "./model";

const dropdownCommonStyles: Array<string> = [
  "w-full",
  // "relative",
  "rounded-md",
  "flex",
  "justify-center",
  "items-center",
  "transition-ease",
  "gap-2",
  "bg-theme-background-input",
  "text-theme-secondary",
  "outline-none",
  "cursor-pointer",
  "font-primary",
  "border-red-500",
];

const dropdownStyles: Record<Theme, Array<string>> = {
  primary: [],
  secondary: [],
};

const dropdownSize: Record<Size, Array<string>> = {
  xs: ["h-6", "text-xs"],
  sm: ["h-8", "text-sm"],
  md: ["h-10", "text-base"],
  lg: ["h-12", "text-lg"],
  xl: ["h-14", "text-xl"],
  _2xl: ["h-16", "text-2xl"],
};

const dropdownThemeStyles: Record<DropdownThemeStyle, Array<string>> = {
  outline: ["border", "border-gray-500", "rounded-md", "bg-theme-background-input"],
  "bottom-lined": ["border-b", "border-gray-500", "rounded-md", "bg-theme-background-input"],
};

const selectedLabelCommonStyles = [
  "cursor-pointer",
  "overflow-hidden",
  "whitespace-nowrap",
  "text-ellipsis",
];

const selectedLabelStyles: Record<Size, Array<string>> = {
  xs: [...selectedLabelCommonStyles, "text-xs"],
  sm: [...selectedLabelCommonStyles, "text-sm"],
  md: [...selectedLabelCommonStyles, "text-base"],
  lg: [...selectedLabelCommonStyles, "text-lg"],
  xl: [...selectedLabelCommonStyles, "text-xl"],
  _2xl: [...selectedLabelCommonStyles, "text-2xl"],
}

const dropdownDisabledStyles = [
  "cursor-not-allowed",
  "pointer-events-none",
  // TOCHANGE
  // "bg-gray-50",
  "text-theme-secondary-600"
]

const dropdownFlyoutStyles = [
  "max-h-[350px]",
  "absolute",
  "flex",
  "flex-col",
  "justify-start",
  "bg-theme-background-popup",
  "rounded-md",
  "overflow-y-auto",
  "w-[101%]",
  "shadow-xl",
  "items-center",
  "z-50",
  "top-12"
]

export {
  dropdownCommonStyles,
  dropdownStyles,
  dropdownSize,
  dropdownThemeStyles,
  dropdownDisabledStyles,
  dropdownFlyoutStyles,
  selectedLabelStyles
};
