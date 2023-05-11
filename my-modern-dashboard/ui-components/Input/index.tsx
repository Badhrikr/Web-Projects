import { useEffect, useRef, useState } from "react";
import { cancel, eye } from "../../helpers/icons";
import random from "../../helpers/random";
import ErrorLabel from "../ErrorLabel";
import FloatingLabel from "../FloatingLabel";
import Icon from "../Icon";
import IconButton from "../IconButton";
import Loading from "../Loading";
import {
  inputCommonStyles,
  inputContainerStyles,
  inputContainerThemeStyles,
  inputSize,
  inputThemeStyles,
} from "./constants";
import { InputProps } from "./model";

function Input(inputProps: InputProps) {
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
    type = "text",
    disabled,
    autoFocus,
    loading,
    required = false,
    maxlength,
    placeholder,
    pattern = ".*",
    icon,
    iconType = "outline",
    clear = false,
    max,
    min,
    onKeyupEvent,
    onKeydownEvent,
    onChangeEvent,
    onInputEvent,
    onBlurEvent,
    onFocusEvent,
  } = inputProps;

  const inputRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState(value ?? "");

  const containerStyles = ` ${inputContainerStyles.join(
    " "
  )} ${inputThemeStyles[inputStyle].join(" ")}
    ${inputContainerThemeStyles[theme].join(" ")}`;

  const inputStyles = `${inputCommonStyles.join(" ")} ${inputSize[size].join(
    " "
  )}`;

  const clearHandler = () => {
    setInputValue("");
    inputRef.current.value = "";
    inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
    inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
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

  useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  return (
    <div
      className={`group w-full flex flex-col relative cursor-pointer ${className}`}
    >
      <div className={containerStyles}>
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
          <FloatingLabel
            labelText={label}
            size={size}
            theme={theme}
            inputRef={inputRef}
            active={
              // inputValue.length > 0 ||
              // document.activeElement == inputRef.current
              true
            }
          />

          <input
            {...{ id, name }}
            ref={inputRef}
            required={required}
            autoFocus={autoFocus}
            value={inputValue}
            placeholder={placeholder}
            className={inputStyles}
            type={type}
            pattern={pattern}
            disabled={disabled}
            min={min}
            max={max}
            maxLength={maxlength}
            onFocus={onFocusEvent}
            onChange={onChangeHandler}
            onKeyUp={onKeyupEvent}
            onKeyDown={onKeydownEvent}
            onInput={onInputEvent}
            onBlur={onBlurEvent}
          />
        </div>

        {!loading && clear && inputValue?.length > 0 && (
          <IconButton
            onClick={clearHandler}
            size="sm"
            theme="secondary"
            buttonThemeStyle="ghost"
            className="!shadow-none"
          >
            <Icon icon={cancel} size="sm" theme="secondary" />
          </IconButton>
        )}

        {loading && (
          <span className="cursor-pointer opacity-[0.6] px-1">
            <Loading size={"sm"} theme={theme} />
          </span>
        )}

        {!loading && type === "password" && (
          <span
            className="cursor-pointer opacity-[0.6] px-1"
            onClick={typeToggleHandler}
          >
            <Icon
              icon={eye}
              iconType={iconType}
              size={"sm"}
              theme={"secondary"}
            />
          </span>
        )}
      </div>

      <ErrorLabel show={error} message={errorMessage} />
    </div>
  );
}

export default Input;
