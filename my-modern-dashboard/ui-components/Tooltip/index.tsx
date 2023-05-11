import React, { ReactNode, useState } from "react";

type TooltipProps = {
  children: ReactNode;
  text: ReactNode;
};

const Tooltip = (props: TooltipProps) => {
  const { children, text } = props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => {
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        setIsVisible(false);
      }}
    >
      {children}

      {isVisible && (
        <div className="absolute text-white bg-black rounded-lg min-w-[200px] -top-full  left-7 p-2.5 -translate-y-1/2 -translate-x-1/2 z-50 grid place-content-center">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
