import { GetFilesForMigrationRequestResponse } from "../../../services/model.response";

// DUMMY-DATA
export interface FilesTableMoreActionsProps extends GetFilesForMigrationRequestResponse {
    showView?: boolean;
    showDelete?: boolean;
    onView?(data: GetFilesForMigrationRequestResponse): void;
    onDelete?(data: GetFilesForMigrationRequestResponse): void;
}