export interface CreateFolderWidgetProps {
    loading?: boolean;
    onCreate?(folderName: string): void;
    onCancel?(): void;
}