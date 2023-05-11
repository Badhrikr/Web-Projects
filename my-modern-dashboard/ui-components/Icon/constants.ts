import { IconType, Size, Theme } from "../model";

const iconSize: Record<Size, Array<string>> = {
  xs: ["[&>svg]:h-3", "[&>svg]:w-3"],
  sm: ["[&>svg]:h-4", "[&>svg]:w-4"],
  md: ["[&>svg]:h-5", "[&>svg]:w-5"],
  lg: ["[&>svg]:h-6", "[&>svg]:w-6"],
  xl: ["[&>svg]:h-8", "[&>svg]:w-8"],
  _2xl: ["[&>svg]:h-12", "[&>svg]:w-14"],
};

const iconTypeStyles: Record<IconType, Array<string>> = {
  solid: [],
  outline: [],
};

const iconStyles: Record<IconType, Record<Theme, Array<string>>> = {
  solid: {
    primary: ["[&>svg]:fill-theme-primary"],
    secondary: ["[&>svg]:fill-theme-secondary"],
  },
  outline: {
    primary: ["[&>svg]:stroke-theme-primary"],
    secondary: ["[&>svg]:stroke-theme-secondary"],
  },
};

export { iconSize, iconStyles, iconTypeStyles };
