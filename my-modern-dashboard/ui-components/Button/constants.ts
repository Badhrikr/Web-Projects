import { ButtonThemeColors, ButtonThemeStyle, Size, Theme } from "../model";

export const btnCommonStyles: Array<string> = [
  "relative",
  // "shadow-md",
  "font-medium",
  "font-primary",
  "rounded-md",
  "flex",
  "justify-center",
  "items-center",
  "transition-ease",
  "hover:elevate",
  "focus:elevate",
  "gap-2",
  "outline-none",
  "whitespace-nowrap",
  "text-ellipsis",
  "overflow-hidden",
];

export const btnStyles: Record<Theme | ButtonThemeColors, Array<string>> = {
  primary: [
    "text-theme-primary",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "focus:ring-theme-primary",
    "focus:ring-offset-2",
  ],
  secondary: [
    "text-theme-secondary",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "focus:ring-theme-secondary",
    "focus:ring-offset-2",
  ],
  success: ["text-white", "disabled:opacity-50", "disabled:cursor-not-allowed"],
  error: ["text-white", "disabled:opacity-50", "disabled:cursor-not-allowed"],
  elevate: [
    "text-theme-secondary",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
  ],
};

export const btnSize: Record<Size, Array<string>> = {
  xs: ["h-6", "px-4", "text-xs"],
  sm: ["h-8", "px-4", "text-sm"],
  md: ["h-10", "px-5", "text-base"],
  lg: ["h-12", "px-6", "text-lg"],
  xl: ["h-14", "px-7", "text-xl"],
  _2xl: ["h-16", "px-8", "text-2xl"],
};

export const btnThemeStyles: Record<
  ButtonThemeStyle,
  Record<Theme | ButtonThemeColors, Array<string>>
> = {
  raised: {
    primary: ["bg-theme-primary"],
    secondary: ["bg-theme-secondary"],
    success: ["bg-[#22a3A3]"],
    error: ["bg-red-900"],
    elevate: ["bg-theme-button-elevate"],
  },
  outlined: {
    primary: ["bg-transparent", "border", "border-theme-primary"],
    secondary: ["bg-transparent", "border", "border-theme-secondary"],
    success: ["bg-transparent", "border", "border-green-600"],
    error: ["bg-transparent", "border", "border-red-900"],
    elevate: ["bg-transparent", "", ""],
  },
  ghost: {
    primary: ["bg-transparent", "border-none", "disabled:!bg-transparent"],
    secondary: ["bg-transparent", "border-none", "disabled:!bg-transparent"],
    success: ["bg-transparent", "border-none", "disabled:!bg-transparent"],
    error: ["bg-transparent", "border-none", "disabled:!bg-transparent"],
    elevate: ["bg-transparent", "border-none", "disabled:!bg-transparent"],
  },
};
