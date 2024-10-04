type TextAreaProps = {
  id: string;
  className?: string;
  label: string;
};

const TextArea = (props: TextAreaProps) => {
  const { id, className, label } = props;
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="relative w-fit">
        <label htmlFor={id} className="text-accent-sc">
          {label}
        </label>
        <span className="absolute -right-4 text-md text-primary-medium">*</span>
      </div>
      <textarea
        id={id}
        className={`border-solid border-[1px] min-h-10 p-4 py-3 rounded-md w-full hover:cursor-pointer transition-all focus:border-primary-medium border-accent-pr outline-none ${className}`}
      />
    </div>
  );
};

export default TextArea;
