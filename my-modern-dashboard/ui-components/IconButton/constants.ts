import { ButtonThemeColors, ButtonThemeStyle, Size, Theme } from "../model";

const btnCommonStyles: Array<string> = [
  "relative",
  // "shadow-md",
  "font-medium",
  "font-primary",
  "rounded-full",
  "flex",
  "justify-center",
  "items-center",
  "transition-ease",
  "hover:elevate",
  "focus:elevate",
  "disabled:opacity-[0.68]",
  "disabled:cursor-not-allowed",
  "outline-none",
];

const btnStyles: Record<Theme | ButtonThemeColors, Array<string>> = {
  primary: ["focus:ring-theme-primary", "focus:ring-offset-2"],
  secondary: ["focus:ring-theme-secondary", "focus:ring-offset-2"],
  success: ["text-white"],
  error: ["text-white"],
  elevate: ["text-theme-secondary"],
};

const btnSize: Record<Size, Array<string>> = {
  xs: ["h-6", "w-6"],
  sm: ["h-8", "w-8"],
  md: ["h-10", "w-10"],
  lg: ["h-12", "w-12"],
  xl: ["h-14", "w-14"],
  _2xl: ["h-16", "w-16"],
};

const btnThemeStyles: Record<
  ButtonThemeStyle,
  Record<Theme | ButtonThemeColors, Array<string>>
> = {
  raised: {
    primary: ["bg-theme-primary"],
    secondary: ["bg-theme-secondary"],
    success: ["bg-green-600"],
    error: ["bg-red-900"],
    elevate: ["bg-theme-button-elevate"],
  },
  outlined: {
    primary: ["background-transparent", "border", "border-theme-primary"],
    secondary: ["background-transparent", "border", "border-theme-secondary"],
    success: ["background-transparent", "border", "border-green-600"],
    error: ["background-transparent", "border", "border-red-900"],
    elevate: ["background-transparent", "", ""],
  },
  ghost: {
    primary: ["background-transparent", "border-none"],
    secondary: ["background-transparent", "border-none"],
    success: ["background-transparent", "border-none"],
    error: ["background-transparent", "border-none"],
    elevate: ["background-transparent", "border-none"],
  },
};

export { btnCommonStyles, btnStyles, btnSize, btnThemeStyles };
