import { GetFileUploadTypesResponse } from "../../../../services/model.response";

export interface FileUploadProps {
    uploadTypes: GetFileUploadTypesResponse[];
    onSubmit?(files: { file: File, uploadType: GetFileUploadTypesResponse }[]): void;
    onCancel?(): void;
}