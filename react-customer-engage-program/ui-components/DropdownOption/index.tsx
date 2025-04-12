import { DropdownOptions, DropdownOptionsProps } from "./model";

function DropdownOption({ option, onSelect }: DropdownOptionsProps) {
  const selectHandler = () => {
    onSelect?.(option);
  };

  return (
    <li className={`px-3 w-full text-left hover:bg-theme-background-elevate`}>
      <div
        className="text-left py-2 cursor-pointer whitespace-nowrap"
        onClick={selectHandler}
      >
        {option.label}
      </div>
    </li>
  );
}

export default DropdownOption;
