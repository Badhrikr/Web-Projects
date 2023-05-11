export interface CommonBaseProps {
  size: Size;
  theme: Theme;
  className?: string;
  id?: string;
  name?: string;
  tabIndex?: number;
}

export interface IconBaseProps {
  icon: JSX.Element;
  iconType?: IconType;
}

export interface ButtonBaseProps {
  children?: any;
  disabled?: boolean;
  loading?: boolean;
  color?: ButtonThemeColors;
  className?: string;
  buttonThemeStyle?: ButtonThemeStyle;
  type?: ButtonType;
  onClick?(): void;
}

export type IconPosition = "left" | "right";
export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "_2xl";
export type Theme = "primary" | "secondary";
export type IconType = "outline" | "solid";
export type ButtonThemeStyle = "raised" | "outlined" | "ghost";
export type ButtonThemeColors = "success" | "error" | "elevate";
export type ButtonType = "button" | "reset" | "submit";
