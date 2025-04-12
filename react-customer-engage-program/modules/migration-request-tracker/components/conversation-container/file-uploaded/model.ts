import { MigrationRequestFile } from "../../../model";

export interface FileUploadedProps {
    files: MigrationRequestFile[];
    loggedOn: string;
    userName: string;
    onReply?(): void;

    migrationRequestId: string;
}