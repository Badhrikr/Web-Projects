import { GetRepositoryUploadsResponse } from "../../../services/model.response";

export interface MoveToCopyToProps {
    currentFolder: string;
    selectedUploadsToMove: GetRepositoryUploadsResponse[];
    actionMode: "Copy" | "Move";
    onClose?(): void;
    onSubmit?(): void;
}