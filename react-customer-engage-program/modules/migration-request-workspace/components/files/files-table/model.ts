import { GetFilesForMigrationRequestResponse } from "../../../services/model.response";

// DUMMY-DATA
export interface FilesTableProps {
    filesData: GetFilesForMigrationRequestResponse[];
    onView?(file: GetFilesForMigrationRequestResponse): void;
    onDelete?(file: GetFilesForMigrationRequestResponse): void;
}