import { GetOfferingTypesResponse, GetOfferingsResponse } from "../../customer-workspace/services/model.response";
import { MigrationRequestTechnologies } from "../../migration-request-tracker/model";
import { GetMembersResponse } from "../../migration-request-tracker/services/model.response";
import { FileUploadType } from "../enums";

// DUMMY-DATA
export interface GetFilesForMigrationRequestResponse {
    fileName: string;
    fileSize: string;
    uploadType: FileUploadType;
    uploadDate: string;
    authour: string;
}

// DUMMY-DATA
export interface GetAddedResponsibilitiesResponse {
    responsibilityId: string;
    title: string;
    description: string;
    owner: string;
    ownerEmail: string;
}

// DUMMY-DATA
export interface GetAllResponsibilitiesResponse {
    responsibilityId: string;
    title: string;
    description: string;
}

export interface GetCalendarForMigrationRequestResponse {
    migrationRequestId: string;
    agenda: string;
    description: string;
    startDate: string;
    endDate: string;
    createdBy: string;
    createdAt: string;
    members: GetMembersResponse[];
}

