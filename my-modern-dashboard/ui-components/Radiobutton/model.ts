import { CommonBaseProps } from "../model";

interface RadiobuttonProps extends CommonBaseProps {
    id?: string;
    options: Array<RadiobuttonOptions>;
    value?: any;
    onSelect?(value: any, id?: string): void;
}

interface RadiobuttonOptions {
    label: any;
    value: any;
}

export type { RadiobuttonProps, RadiobuttonOptions };
