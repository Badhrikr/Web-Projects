import { CommonBaseProps, Theme } from "../model";

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement>, CommonBaseProps {
    label: string;
    theme: Theme;
    checked?: boolean;
}