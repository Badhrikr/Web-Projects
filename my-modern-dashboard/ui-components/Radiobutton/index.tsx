import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import {
  btnSize,
  containerSizeStyles,
  containerStyles,
  innerCircleActiveStyles,
  innerCircleCommonStyles,
  outerCircleActiveStyles,
  outerCircleCommonStyles,
} from "./constants";
import { RadiobuttonOptions, RadiobuttonProps } from "./model";

function Radiobutton({
  id,
  options,
  value,
  size,
  className,
  onSelect,
}: RadiobuttonProps) {
  const [selected, setSelected] = useState<RadiobuttonOptions>();

  useEffect(() => {
    options.forEach((option) => {
      if (option.value === value) {
        setSelected(option);
        return;
      }
    });
  }, [options, value]);

  const selectHandler = (option: RadiobuttonOptions) => {
    if (option.value === selected?.value) return;
    setSelected(option);
    onSelect?.(option.value, id);
  };

  return (
    <div
      className={`${containerStyles.join(" ")} ${containerSizeStyles[size].join(
        " "
      )} ${className}`}
    >
      {options.map(({ label, value }, i) => (
        <button
          key={i}
          className="flex gap-2 items-center"
          onClick={() => selectHandler({ label, value })}
        >
          <div
            className={`${btnSize[size].join(
              " "
            )} ${outerCircleCommonStyles.join(" ")} ${
              selected?.value === value && outerCircleActiveStyles.join(" ")
            }`}
          >
            <CSSTransition
              in={selected?.value === value}
              timeout={300}
              classNames="popup"
              unmountOnExit
            >
              <span
                className={`${innerCircleCommonStyles.join(
                  " "
                )} ${innerCircleActiveStyles.join(" ")}`}
              ></span>
            </CSSTransition>
          </div>
          <label className="text-theme-secondary"> {label} </label>
        </button>
      ))}
    </div>
  );
}

export default Radiobutton;
