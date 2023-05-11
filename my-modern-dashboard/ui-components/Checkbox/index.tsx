import React, { useState } from "react";
import {
  checkboxContainerStyles,
  checkboxSizeStyles,
  checkboxThemeStyles,
  labelcheckboxSizeStyles,
  labelcheckboxThemeStyles,
} from "./constants";
import { CheckboxProps } from "./model";

function Checkbox({
  size = "md",
  theme = "primary",
  className,
  label,
  id,
  checked,
  ...props
}: CheckboxProps) {
  const [uuid] = useState(id ?? Math.random() + "");

  const styles =
    checkboxSizeStyles[size].join(" ") +
    " " +
    checkboxThemeStyles[theme].join(" ") +
    " " +
    className;

  const labelStyles =
    labelcheckboxSizeStyles[size].join(" ") +
    " " +
    labelcheckboxThemeStyles[theme].join(" ");

  return (
    <div className={checkboxContainerStyles.join(" ")}>
      <input
        id={uuid}
        type={"checkbox"}
        {...props}
        className={styles}
        checked={checked}
      />
      <label className={labelStyles} htmlFor={uuid}>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
