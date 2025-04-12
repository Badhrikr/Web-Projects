import { GetRepositoryUploadsResponse } from "../../../services/model.response";

export interface MoveToCopyToTableProps {
    uploads: GetRepositoryUploadsResponse[];
    onFolderClick?(upload: GetRepositoryUploadsResponse): void;
    actionMode: "Move" | "Copy";
}