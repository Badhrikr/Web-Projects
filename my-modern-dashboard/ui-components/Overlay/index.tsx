import React, { useEffect, useRef } from "react";
import { OverlayProps } from "./model";

function Overlay({
  children,
  closeOnEsc = false,
  overlayColor = "bg-transparent",
  className = "",
  outsideClicked,
}: OverlayProps) {
  const ref = useRef(null);

  useEffect(() => {
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === "Escape") {
        outsideClicked?.();
      }
    });
  }, []);

  return (
    <React.Fragment>
      {/* <div
        className={`fixed inset-0 ${overlayColor} ${className}`}
        onClick={outsideClicked}
      ></div> */}
      {children}
    </React.Fragment>
  );
}

export default Overlay;
