interface DropdownOptions {
    value: any;
    label: any;
}

interface DropdownOptionsProps {
    option: DropdownOptions;
    onSelect?(option: DropdownOptions): void;
}

export type { DropdownOptionsProps, DropdownOptions }