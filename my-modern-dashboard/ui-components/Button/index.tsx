import Ripples from "react-ripples";
import Loading from "../Loading";
import {
  btnCommonStyles,
  btnSize,
  btnStyles,
  btnThemeStyles,
} from "./constants";
import { ButtonProps } from "./model";

function Button(buttonProps: ButtonProps) {
  const {
    children,
    theme,
    color,
    disabled,
    size,
    loading,
    className,
    type = "button",
    buttonThemeStyle = "raised",
    startIcon,
    endIcon,
    onClick,
  } = buttonProps;

  return (
    <Ripples color="#dedede4d">
      <button
        type={type}
        disabled={loading || disabled}
        className={
          btnCommonStyles.join(" ") +
          " " +
          btnStyles[color ?? theme]?.join(" ") +
          " " +
          btnSize[size]?.join(" ") +
          " " +
          btnThemeStyles[buttonThemeStyle][color ?? theme].join(" ") +
          " " +
          className
        }
        onClick={onClick}
      >
        {startIcon ?? ""}
        {loading ? <Loading {...buttonProps} /> : children}
        {endIcon ?? ""}
      </button>
    </Ripples>
  );
}
export default Button;
