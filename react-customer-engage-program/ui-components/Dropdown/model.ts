import { DropdownOptions } from "../DropdownOption/model";
import { CommonBaseProps } from "../model";

type DropdownDirection = "top" | "bottom";

type DropdownThemeStyle = "bottom-lined" | "outline";

interface DropdownModel extends CommonBaseProps {
  value?: any;
  label: string;
  required?: boolean;
  options: Array<DropdownOptions>;
  hasError?: boolean;
  errorMessage?: string;
  direction?: DropdownDirection;
  disabled?: boolean;
  triggerOnLoad?: boolean;
  dropdownThemeStyle?: DropdownThemeStyle;
  changeEvent?(value: any, id: string, label: string): void;
}

export type { DropdownModel, DropdownThemeStyle };
