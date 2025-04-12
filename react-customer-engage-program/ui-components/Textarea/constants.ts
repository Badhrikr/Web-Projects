import { Size, Theme } from "../model";
import { InputThemeStyle } from "./model";

const inputContainerStyles: Array<string> = [
    "relative",
    "flex",
    "items-center",
    "rounded-md",
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
    sm: ["p-2", "text-xs"],
    md: ["p-2.5", "text-sm"],
    lg: ["p-4", "text-md"],
    xl: ["p-5", "text-lg"],
    _2xl: ["p-6", "text-xl"],
};

const labelCommonStyles = [
    "px-2",
    "absolute",
    "transition",
    "duration-300",
    "text-gray-400",
    "left-0",
    "pointer-events-none",
    "bg-theme-background-input",
];

const labelSize: Record<Size, Array<string>> = {
    xs: ["text-xs"],
    sm: ["text-xs"],
    md: ["text-sm"],
    lg: ["text-md"],
    xl: ["text-lg"],
    _2xl: ["text-xl"],
};

const inputThemeStyles: Record<InputThemeStyle, Array<string>> = {
    outline: ["border"],
    "bottom-lined": ["border-b"],
    "ghost": ["border-transparent"],
};

export {
    inputContainerStyles,
    inputCommonStyles,
    inputContainerThemeStyles,
    inputSize,
    inputThemeStyles,
    labelCommonStyles,
    labelSize,
};
