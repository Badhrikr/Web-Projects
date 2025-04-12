export interface UserAddConfirmationProps {
    userName: string;
    email: string;
    loading?: boolean;
    onCancel?(): void;
    onSubmit?(): void;
}