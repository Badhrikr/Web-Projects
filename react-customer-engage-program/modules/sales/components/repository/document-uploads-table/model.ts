export interface DocumentUploadsTableProps {
    files: File[];
    onRemove?(file: File): void;
}