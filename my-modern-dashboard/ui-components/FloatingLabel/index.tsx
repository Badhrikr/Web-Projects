import { useEffect, useRef } from "react";
import { labelCommonStyles, labelSize } from "./constants";
import { FloatingLabelProps } from "./model";

function FloatingLabel({
  labelText,
  active,
  size,
  className,
  inputRef,
}: FloatingLabelProps) {
  const ref = useRef<HTMLLabelElement>(null);

  const styles = `${labelCommonStyles.join(" ")} ${labelSize[size].join(
    " "
  )} ${className}`;

  const setActiveStyles = (active: boolean) => {
    if (!ref.current) return;

    if (active) {
      ref.current.style.transform = "translate(0%, -60%) scale(0.85)";
    } else {
      ref.current.style.transform = "translate(0, 50%) scale(1)";
    }
  };

  useEffect(() => {
    setActiveStyles(active);
  }, [ref, active]);

  useEffect(() => {
    if (!inputRef?.current) return;

    const focusHandler = () => setActiveStyles(true);
    const blurHandler = () =>
      setActiveStyles(inputRef?.current?.value?.length > 0);

    inputRef.current.addEventListener("focus", focusHandler);
    inputRef.current.addEventListener("blur", blurHandler);

    return () => {
      if (!inputRef.current) return;

      inputRef.current.removeEventListener("focus", focusHandler);
      inputRef.current.removeEventListener("blur", blurHandler);
    };
  }, [inputRef]);

  return (
    <label ref={ref} className={styles}>
      {labelText}
    </label>
  );
}

export default FloatingLabel;
