import { FileUploadType, NormalFileUploadType, SignedFileUploadType } from "../../../enums";

export interface FileUploadProps {
    loading?: boolean;
    uploadTypes: typeof SignedFileUploadType | typeof NormalFileUploadType;
    onCancel?(): void;
    // TOCHANGE
    onSubmit?(files: { file: File, uploadType: FileUploadType | undefined }[]): void;
}