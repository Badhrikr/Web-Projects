import { CommonBaseProps } from "../model";

interface FloatingLabelProps extends CommonBaseProps {
    active: boolean;
    labelText?: string;
    inputRef?: React.RefObject<any>;
}

export type { FloatingLabelProps };
