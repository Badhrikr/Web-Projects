export interface FileDeleteConfirmationProps {
    fileName: string;
    loading?: boolean;
    onDelete?(): void;
    onCancel?(): void;
}