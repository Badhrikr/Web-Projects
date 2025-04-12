import { useEffect, useRef, useState } from "react";
import { cancel } from "../../helpers/icons";
import random from "../../helpers/random";
import ErrorLabel from "../ErrorLabel";
import Icon from "../Icon";
import {
  inputCommonStyles,
  inputContainerStyles,
  inputContainerThemeStyles,
  inputSize,
  inputThemeStyles,
  labelCommonStyles,
  labelSize
} from "./constants";
import { TextareaProps } from "./model";

function Textarea(inputProps: TextareaProps) {
  const [UUID] = useState(random());

  const {
    inputStyle = "outline",
    id = UUID,
    name = UUID,
    value,
    label,
    theme,
    size,
    error,
    errorMessage,
    className = "",
    disabled,
    autoFocus,
    loading,
    required = false,
    maxlength,
    placeholder,
    rows = 1,
    cols = 1,
    icon,
    iconType = "outline",
    clear = false,
    onKeyupEvent,
    onKeydownEvent,
    onChangeEvent,
    onInputEvent,
    onBlurEvent,
    onFocusEvent,
  } = inputProps;

  const inputRef = useRef<any>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [inputValue, setInputValue] = useState(value ?? "");

  useEffect(() => {
    setInputValue(value ?? "");

    if (labelRef.current) {
      if (inputValue.length > 0) {
        labelRef.current.style.transform = "translate(-10px, -55%) scale(0.85)";
      } else {
        labelRef.current.style.transform = "translate(0, 50%) scale(1)";
      }
    }
  }, [value]);

  const LABEL_STYLES = ` ${labelCommonStyles.join(" ")} ${labelSize[size].join(
    " "
  )}`;

  const CONTAINER_STYLES = ` ${inputContainerStyles.join(
    " "
  )} ${inputThemeStyles[inputStyle].join(" ")}
    ${inputContainerThemeStyles[theme].join(" ")}`;

  const INPUT_STYLES = `${inputCommonStyles.join(" ")} ${inputSize[size].join(
    " "
  )}`;

  const clearHandler = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  const typeToggleHandler = () => {
    if (inputRef.current) {
      inputRef.current.type =
        inputRef.current.type === "password" ? "text" : "password";
    }
  };

  const onChangeHandler = (e: any) => {
    setInputValue(e.target.value);
    onChangeEvent?.(e);
  };

  const focusHandler = (
    e?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (labelRef.current) {
      labelRef.current.style.transform = "translate(-5px, -55%) scale(0.9)";
    }

    onFocusEvent?.(e);
  };

  const blurHandler = (
    e?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onBlurEvent?.(e);
    if (labelRef.current && inputValue.length === 0) {
      labelRef.current.style.transform = "translate(0, 50%) scale(1)";
    }
  };

  return (
    <div
      className={`group w-full flex flex-col relative cursor-pointer ${className}`}
    >
      <div className={CONTAINER_STYLES}>
        {icon && (
          <label htmlFor={id} className="px-1">
            <Icon
              icon={icon}
              iconType={iconType}
              size={"sm"}
              theme={"secondary"}
            />
          </label>
        )}

        <div className="relative flex-1">
          <textarea
            autoFocus={autoFocus}
            rows={rows}
            cols={cols}
            {...{ id, name }}
            required={required}
            ref={inputRef}
            value={inputValue}
            placeholder={placeholder}
            className={INPUT_STYLES}
            disabled={disabled}
            maxLength={maxlength}
            onFocus={focusHandler}
            onChange={onChangeHandler}
            onKeyUp={onKeyupEvent}
            onKeyDown={onKeydownEvent}
            onInput={onInputEvent}
            onBlur={blurHandler}
          ></textarea>

          <label htmlFor={id} ref={labelRef} className={`${LABEL_STYLES}`}>
            {label}
          </label>
        </div>

        {!loading && clear && inputValue?.length > 0 && (
          <span
            className="cursor-pointer opacity-[0.6] px-1"
            onClick={clearHandler}
          >
            <Icon
              icon={cancel}
              iconType={iconType}
              size={"sm"}
              theme={"secondary"}
            />
          </span>
        )}
      </div>

      <ErrorLabel message={errorMessage} show={error} />
    </div>
  );
}

export default Textarea;
