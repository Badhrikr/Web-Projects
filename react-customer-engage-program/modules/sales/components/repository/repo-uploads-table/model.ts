import { GetRepositoryUploadsResponse } from "../../../services/model.response";

export interface RepoUploadsTableProps {
    uploads: GetRepositoryUploadsResponse[];
    showActions?: boolean;
    resetSelection?: boolean;
    onFolderClick?(upload: GetRepositoryUploadsResponse): void;
    onSelectedRows?(selectedRows: GetRepositoryUploadsResponse[]): void;
    onDownload?(upload: GetRepositoryUploadsResponse): void;
    onCopyTo?(upload: GetRepositoryUploadsResponse): void;
    onMoveTo?(upload: GetRepositoryUploadsResponse): void;
}