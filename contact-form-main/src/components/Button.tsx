import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <button
      {...props}
      className="p-4 py-3 text-lg font-semibold transition-all rounded-lg hover:cursor-pointer hover:bg-primary-lighter hover:text-accent-sc bg-primary-medium text-primary-lighter"
    >
      {title}
    </button>
  );
};

export default Button;
