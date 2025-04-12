import {
  ButtonBaseProps, ButtonThemeColors, ButtonThemeStyle, CommonBaseProps, Theme
} from "../model";

interface ButtonProps
  extends CommonBaseProps,
  ButtonBaseProps {
  children?: any;
  buttonThemeStyle?: ButtonThemeStyle;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

export type { ButtonProps };

