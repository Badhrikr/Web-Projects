import { GetFileUploadTypesResponse } from "../../../../services/model.response";

export interface UploadedFilesTableProps {
    files: { file: File; uploadType: GetFileUploadTypesResponse }[];
    uploadTypes: GetFileUploadTypesResponse[];
    onUploadTypeChange?(file: File, fileUploadTypeId: string): void;
    onFileRemove?(file: File): void;
}