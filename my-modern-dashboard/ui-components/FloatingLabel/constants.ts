import { Size } from "../model";

const labelCommonStyles = [
    "px-2",
    "absolute",
    "transition",
    "duration-200",
    "text-gray-400",
    "pointer-events-none",
    "bg-theme-background-input",
    "z-10",
    "origin-left",
    "transition-transform",
    "rounded-lg",
    "overflow-hidden",
    "whitespace-nowrap",
    "text-ellipsis"
];

const labelSize: Record<Size, Array<string>> = {
    xs: ["text-xs"],
    sm: ["text-xs"],
    md: ["text-sm"],
    lg: ["text-md"],
    xl: ["text-lg"],
    _2xl: ["text-xl"],
};


export { labelCommonStyles, labelSize }