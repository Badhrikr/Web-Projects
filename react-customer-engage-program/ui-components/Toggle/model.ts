import { CommonBaseProps } from "../model";

interface ToggleProps extends CommonBaseProps {
    children?: React.ReactNode;
    checked?: boolean;
    disabled?: boolean;
    onChange?(checked?: boolean): void;
}

export type { ToggleProps };
