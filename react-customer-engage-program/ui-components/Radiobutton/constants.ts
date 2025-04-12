import { Size } from "../model";

const containerStyles: Array<string> = [
    "relative",
    "flex",
    "flex-col",
    "gap-3",
];

const containerSizeStyles: Record<Size, Array<string>> = {
    xs: ["text-xs"],
    sm: ["text-sm"],
    md: ["text-base"],
    lg: ["text-lg"],
    xl: ["text-xl"],
    _2xl: ["text-_2xl"],
}

const outerCircleCommonStyles: Array<string> = [
    "relative",
    "rounded-full",
    "border-2",
    "border-gray-500"
];

const outerCircleActiveStyles: Array<string> = [
    "!border-[#458eff]",
];

const innerCircleCommonStyles = [
    "absolute",
    "h-[60%]",
    "w-[60%]",
    "inset-0",
    "m-auto",
    "rounded-full",
]

const innerCircleActiveStyles = [
    "bg-[#458eff]"
];

const btnSize: Record<Size, Array<string>> = {
    xs: ["h-2", "w-2"],
    sm: ["h-4", "w-4"],
    md: ["h-6", "w-6"],
    lg: ["h-8", "w-8"],
    xl: ["h-10", "w-10"],
    _2xl: ["h-12", "w-12"],
};

export {
    containerStyles,
    containerSizeStyles,
    outerCircleCommonStyles,
    outerCircleActiveStyles,
    innerCircleCommonStyles,
    innerCircleActiveStyles,
    btnSize,
};

