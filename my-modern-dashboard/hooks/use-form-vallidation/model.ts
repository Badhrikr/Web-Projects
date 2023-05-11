interface FormValidation {
    value?: any;
    required?: boolean;
    hasError?: boolean;
    pattern?: RegExp;
    errorMessage?: string;
}

interface PatchValue {
    id: string;
    value: string;
}

export type { FormValidation, PatchValue }