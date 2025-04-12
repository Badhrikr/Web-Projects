import Ripples from "react-ripples";
import Loading from "../Loading";
import {
  btnCommonStyles,
  btnSize,
  btnStyles,
  btnThemeStyles,
} from "./constants";
import { IconButtonProps } from "./model";

function IconButton(iconButtonProps: IconButtonProps) {
  const {
    children,
    theme,
    disabled,
    size,
    color,
    loading,
    className,
    type = "button",
    buttonThemeStyle = "raised",
    onClick,
  } = iconButtonProps;

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
        {loading ? <Loading {...iconButtonProps} /> : children}
      </button>
    </Ripples>
  );
}
export default IconButton;
