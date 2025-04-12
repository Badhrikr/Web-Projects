import { TechnologyType } from "../../shared/enums";
import { ProcessStatus } from "./enums";
import { GetFileUploadTypesResponse } from "./services/model.response";

// DUMMY-DATA
export interface MigrationRequestTechnologies {
    componentName: TechnologyType,
    fromTech: string,
    toTech: string;
}

export interface MigrationRequestProcess {
    title: string;
    desc: string;
    status: ProcessStatus;
    remarks: string;
}

export interface MigrationRequestFile extends GetFileUploadTypesResponse {
    fileId: string;
    fileName: string;
    fileSize: number;
}

export interface MigrationRequestQuery {
    message: string;
}