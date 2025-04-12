export interface DocumentUploadProps {
    onCancel?(): void;
    onUploadSuccess?(): void;
    destinationFolderPath: string;
}