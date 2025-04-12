import { MigrationRequestFile } from "../../../model";

export interface FileComponentMasterProps extends MigrationRequestFile {
    migrationRequestId: string;
}