import { FileUploadType, NormalFileUploadType, SignedFileUploadType } from "../../../enums";

export interface UploadedFilesTableProps {
    files: { file: File; uploadType: FileUploadType | undefined }[];
    uploadTypes: typeof SignedFileUploadType | typeof NormalFileUploadType;
    onFileRemove?(file: File): void;
}