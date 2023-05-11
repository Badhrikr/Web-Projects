import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { chevron_down } from "../../helpers/icons";
import random from "../../helpers/random";
import useOutsideClick from "../../hooks/use-outside-click";
import DropdownOption from "../DropdownOption";
import { DropdownOptions } from "../DropdownOption/model";
import ErrorLabel from "../ErrorLabel";
import FloatingLabel from "../FloatingLabel";
import Icon from "../Icon";
import {
  dropdownCommonStyles,
  dropdownDisabledStyles,
  dropdownFlyoutStyles,
  dropdownSize,
  dropdownThemeStyles,
  selectedLabelStyles,
} from "./constants";
import { DropdownModel } from "./model";

function DropDown(dropdownProps: DropdownModel) {
  const [UUID] = useState(random());

  const {
    id = UUID,
    name = UUID,
    size,
    theme,
    value,
    label,
    required,
    options = [],
    disabled = false,
    hasError = false,
    className = "",
    errorMessage = "Required",
    dropdownThemeStyle = "outline",
    changeEvent,
  } = dropdownProps;

  const [dropdownRef] = useOutsideClick(() => setShowOptions(false), {
    closeOnEsc: true,
  });

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selected, setSelected] = useState<DropdownOptions>();

  const containerStyles =
    " w-full relative px-[0.20rem] " +
    " " +
    className +
    "  " +
    dropdownThemeStyles[dropdownThemeStyle].join(" ");

  const styles =
    dropdownCommonStyles.join(" ") +
    " " +
    dropdownSize[size].join(" ") +
    " " +
    (disabled ? dropdownDisabledStyles.join(" ") : "");

  const clickHandler = (option: DropdownOptions) => {
    if (selected === undefined || selected.value !== option.value) {
      setSelected(option);
      changeEvent?.(option.value, id, option.label);
    }
  };

  const toggle = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    let hasValue = false;

    options.forEach((option) => {
      if (value === option.value) {
        hasValue = true;
        setSelected(option);
        return;
      }
    });

    if (hasValue === false) {
      setSelected(undefined);
    }
  }, [options, value]);

  console.log({ selected });

  return (
    <div className="relative w-full">
      <div ref={dropdownRef} {...{ id, name }} className={containerStyles}>
        <FloatingLabel
          size={size}
          labelText={label}
          active={value || selected}
          theme={theme}
        />

        <div className={styles} onClick={toggle}>
          <div className="flex items-center justify-between w-full gap-1 px-2 cursor-pointer">
            <div className={selectedLabelStyles[size].join(" ")}>
              {selected?.label ?? ""}
            </div>

            <span className="justify-end">
              <Icon icon={chevron_down} size={size} theme="secondary" />
            </span>
          </div>

          <CSSTransition
            in={showOptions}
            timeout={150}
            classNames="fly"
            unmountOnExit
          >
            <ul className={dropdownFlyoutStyles.join(" ")}>
              {options.map((option, key) => (
                <DropdownOption
                  key={key}
                  option={option}
                  onSelect={clickHandler}
                />
              ))}
            </ul>
          </CSSTransition>
        </div>

        <input
          required={required}
          value={selected?.value ?? ""}
          className="absolute inset-0 z-10 opacity-0 pointer-events-none"
        />
      </div>
      <ErrorLabel show={hasError} message={errorMessage} />
    </div>
  );
}

export default React.memo(DropDown);
