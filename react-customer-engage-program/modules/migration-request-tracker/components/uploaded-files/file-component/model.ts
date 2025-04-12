export interface FileComponentProps {
    fileName: string;
    fileSize: number;
    loading?: boolean;
    onDownload?(): void;
    onCancel?(): void;
}