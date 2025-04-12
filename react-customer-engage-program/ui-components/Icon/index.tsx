import { iconSize, iconStyles } from "./constants";
import { IconModel } from "./model";

function Icon(iconProps: IconModel) {
  const {
    icon,
    iconType = "outline",
    size,
    theme,
    className = "",
  } = iconProps;

  let styles = `${iconSize[size].join(" ")} ${iconType && iconStyles[iconType]?.[theme]?.join(" ")
    } ${className}`;

  return <span className={styles}> {icon} </span>;
}

export default Icon;
