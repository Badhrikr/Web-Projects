import { Size, Theme } from "../model";

export const checkboxContainerStyles: Array<string> = [
    "flex",
    "items-center",
    "justify-center",
    "gap-1"
];

export const checkboxSizeStyles: Record<Size, Array<string>> = {
    xs: ["h-[15px]", "w-[15px]"],
    sm: ["h-[20px]", "w-[20px]"],
    md: ["h-[25px]", "w-[25px]"],
    lg: ["h-[30px]", "w-[30px]"],
    xl: ["h-[35px]", "w-[35px]"],
    _2xl: ["h-[40px]", "w-[40px]"],
};

export const checkboxThemeStyles: Record<Theme, Array<string>> = {
    primary: ["accent-theme-primary", "bg-theme-background-elevate"],
    secondary: ["accent-theme-secondary", "bg-theme-background-elevate"]
}

export const labelcheckboxThemeStyles: Record<Theme, Array<string>> = {
    primary: ["text-theme-primary"],
    secondary: ["text-theme-secondary"]
}

export const labelcheckboxSizeStyles: Record<Size, Array<string>> = {
    xs: ["text-xs"],
    sm: ["text-sm"],
    md: ["text-md"],
    lg: ["text-lg"],
    xl: ["text-xl"],
    _2xl: ["text-2xl"],
}