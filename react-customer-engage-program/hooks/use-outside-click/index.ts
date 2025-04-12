import { RefObject, useCallback, useEffect, useRef } from "react";
import { UseOutsideClickOptions } from "./model";

function useOutsideClick(callbackFunction: () => void, options?: UseOutsideClickOptions) {
  const _ref = useRef<any>();

  const eventListener = useCallback((e: any) => {
    if (_ref?.current && !_ref.current.contains(e.target) && e.target?.className?.includes?.("toggle-button") === false) {
      callbackFunction?.();
      console.log("HERE OPEN");
    }
  }, []);

  const keypressListener = (e: KeyboardEvent) => {
    if (options?.closeOnEsc && e.key === "Escape") {
      callbackFunction?.();
      console.log("ESC CLOSE");

    }
  }

  useEffect(() => {
    window.addEventListener("click", eventListener);
    window.addEventListener("keyup", keypressListener);

    return () => {
      window.removeEventListener("click", eventListener);
      window.removeEventListener("keyup", keypressListener);
    };
  }, []);

  return [_ref]
}

export default useOutsideClick;
