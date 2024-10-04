import React from "react";

type InputProps = {
  id: string;
  type: React.HTMLInputTypeAttribute;
  className?: string;
  label: string;
};

const Input = (props: InputProps) => {
  const { id, type, className, label } = props;
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="relative w-fit">
        <label htmlFor={id} className="text-accent-sc">
          {label}
        </label>
        <span className="absolute -right-4 text-md text-primary-medium">*</span>
      </div>
      <input
        type={type}
        id={id}
        className={`border-solid border-[1px] min-h-12 p-5 py-2 rounded-md w-full hover:cursor-pointer transition-all focus:border-primary-medium border-accent-pr outline-none ${className}`}
      />
    </div>
  );
};

export default Input;
