import { MigrationRequestProcess } from "../../../model";

export interface ProcessInitiatedProps {
    process: MigrationRequestProcess;
    loggedOn?: string;
    onReply?(): void;
}