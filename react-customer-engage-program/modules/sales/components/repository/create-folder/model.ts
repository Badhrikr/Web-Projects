export interface CreateFolderProps {
    pathName: string;
    onCreate?(): void;
    onCancel?(): void;
}