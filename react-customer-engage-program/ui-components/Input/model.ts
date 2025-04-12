import { CommonBaseProps, IconBaseProps } from "../model";

interface InputProps extends CommonBaseProps, Partial<IconBaseProps> {
  inputStyle?: InputThemeStyle;
  label?: string;
  clear?: boolean;
  id?: string;
  value?: string;
  required?: boolean;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  type?: string;
  pattern?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  maxlength?: number;
  placeholder?: string;
  min?: string | number;
  max?: string | number;

  onChangeEvent?(
    event?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  onFocusEvent?(
    event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  onKeyupEvent?(
    event?: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  onKeydownEvent?(
    event?: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  onInputEvent?(
    event?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  onBlurEvent?(
    event?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  enterPressed?(
    event?: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
}

type InputThemeStyle = "outline" | "bottom-lined" | "ghost";

export type { InputProps, InputThemeStyle };

