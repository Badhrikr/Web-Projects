import { Size, Theme } from "../model"

const holderCommonStyles = [
    "relative",
    "rounded-full",
    "cursor-pointer",
];

const holderSizeStyles: Record<Size, Array<string>> = {
    xs: ["h-3", "w-8"],
    sm: ["h-4", "w-10"],
    md: ["h-5", "w-12"],
    lg: ["h-6", "w-14"],
    xl: ["h-7", "w-16"],
    _2xl: ["h-8", "w-[4.25rem]"],
}

const holderInactiveStyles = [
    "bg-[#e0e0e1]",
];

const holderActiveStyles: Record<Theme, Array<string>> = {
    primary: [
        "bg-theme-primary-500",
    ],
    secondary: [
        "bg-theme-secondary-500"
    ],
};

const toggleCommonStyles = [
    "rounded-full",
    "absolute",
    "transition",
    "duration-150",
    "transition-transform",
    "-top-[2.5px]",
    "flex",
    "items-center",
    "justify-center"
];

const toggleSizeStyles: Record<Size, Array<string>> = {
    xs: ["h-4", "w-4"],
    sm: ["h-5", "w-5"],
    md: ["h-6", "w-6"],
    lg: ["h-7", "w-7"],
    xl: ["h-8", "w-8"],
    _2xl: ["h-9", "w-9"],
}

const toggleInactiveStyles = [
    "bg-gray-500",
    "shadow-2xl",
    "translate-x-[0]",
];

const toggleActiveStyles: Record<Theme, Array<string>> = {
    primary: ["bg-theme-primary-750", "translate-x-[100%]",],
    secondary: ["bg-theme-secondary-750", "translate-x-[100%]",],
};

export {
    holderCommonStyles,
    holderSizeStyles,
    toggleCommonStyles,
    toggleSizeStyles,
    holderActiveStyles,
    holderInactiveStyles,
    toggleActiveStyles,
    toggleInactiveStyles
}