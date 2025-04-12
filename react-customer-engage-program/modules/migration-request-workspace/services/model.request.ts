import { GetAddedResponsibilitiesResponse, GetAllResponsibilitiesResponse, GetCalendarForMigrationRequestResponse, GetFilesForMigrationRequestResponse } from "./model.response";

// DUMMY-DATA
export interface GetFilesForMigrationRequestRequest {
    migrationRequestId: string;
    success?(response: GetFilesForMigrationRequestResponse[]): void;
    error?(): void;
}

// DUMMY-DATA
export interface GetAddedResponsibilitiesRequest {
    migrationRequestId: string;
    success?(response: GetAddedResponsibilitiesResponse[]): void;
    error?(): void;
}

// DUMMY-DATA
export interface GetAllResponsibilitiesRequest {
    success?(response: GetAllResponsibilitiesResponse[]): void;
    error?(): void;
}

export interface GetCalendarForMigrationRequestRequest {
    migrationRequestId: string;
    success?(response: GetCalendarForMigrationRequestResponse[]): void;
    error?(err: any): void;
}
