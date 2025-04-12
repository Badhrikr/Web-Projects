import { GetRepositoryUploadsResponse } from "../../../services/model.response";

export interface UploadItemComponentProps {
    upload: GetRepositoryUploadsResponse;
    showActions?: boolean;
    onFolderClick?(upload: GetRepositoryUploadsResponse): void;
    onMoveTo?(upload: GetRepositoryUploadsResponse): void;
    onCopyTo?(upload: GetRepositoryUploadsResponse): void;
}