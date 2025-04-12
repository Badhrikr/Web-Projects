interface RegisterProps {
    showRegisterToggle?(): void
}

interface ErrorProps {
    error: boolean;
    message: string;
}

export type { RegisterProps, ErrorProps }