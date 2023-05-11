import { useState, useEffect } from "react";
import { minus, tick } from "../../helpers/icons";
import Icon from "../Icon";
import {
  holderActiveStyles,
  holderCommonStyles,
  holderInactiveStyles,
  holderSizeStyles,
  toggleActiveStyles,
  toggleCommonStyles,
  toggleInactiveStyles,
  toggleSizeStyles,
} from "./constants";
import { ToggleProps } from "./model";

function Toggle(props: ToggleProps) {
  const { children, checked, disabled, theme, size, className, onChange } =
    props;

  const [active, setActive] = useState(checked);

  const holderStyles =
    holderCommonStyles.join(" ") +
    " " +
    (active
      ? holderActiveStyles[theme].join(" ")
      : holderInactiveStyles.join(" ")) +
    " " +
    holderSizeStyles[size].join(" ") +
    " " +
    className;

  const toggleStyles =
    toggleCommonStyles.join(" ") +
    " " +
    (active
      ? toggleActiveStyles[theme].join(" ")
      : toggleInactiveStyles.join(" ")) +
    " " +
    toggleSizeStyles[size].join(" ");

  const clickHandler = () => {
    onChange?.(!active);
    setActive((prev) => !prev);
  };

  useEffect(() => {
    setActive(checked);
  }, [checked]);

  return (
    <button onClick={clickHandler} className="w-fit flex-center-center !gap-2">
      <div className={holderStyles}>
        <div className={toggleStyles}>
          <Icon
            icon={active ? tick : minus}
            theme="secondary"
            size="sm"
            className="[&>svg]:!stroke-white"
          />
        </div>
      </div>
      {children}{" "}
    </button>
  );
}

export default Toggle;
