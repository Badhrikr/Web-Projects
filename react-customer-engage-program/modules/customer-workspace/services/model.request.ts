import { CreateMigrationRequestResponse, GetAllLegacyComponentsResponse, GetAllMigrationRequestsForCustomerResponse, GetCalendarForCustomerResponse, GetComponentsResponse, GetMigrationRequestsForCustomerResponse, GetOfferingsResponse, GetOfferingTypesResponse } from "./model.response";

// DUMMY-DATA
export interface GetAllMigrationRequestsForCustomerRequest {
    id: string;
    success?(response: GetAllMigrationRequestsForCustomerResponse[]): void;
    error?(error: any): void;
}

// DUMMY-DATA
export interface GetAllLegacyComponentsRequest {
    success?(response: GetAllLegacyComponentsResponse[]): void;
    error?(error: any): void;
}

export interface GetOfferingsRequest {
    success?(response: GetOfferingsResponse[]): void;
    error?(err: any): void;
}

export interface GetOfferingTypesRequest {
    offeringName: string;
    success?(response: GetOfferingTypesResponse[]): void;
    error?(err: any): void;
}

// TOCHANGE
export interface GetComponentsRequest {
    offeringTypeId: string;
    success?(response: { components: GetComponentsResponse[] }): void;
    error?(err: any): void;
}

export interface CreateMigrationRequestRequest {
    customerId: string;
    chosenMigrationRequest: string;
    chosenMigrationType: string;
    chosenMigrationTypeName: string;
    technologies: CreateMigrationRequestTechnologies[];
    success?(response: CreateMigrationRequestResponse): void;
    error?(err: any): void;
}

export interface CreateMigrationRequestTechnologies {
    componentName: string;
    componentId: string;
    fromTechName: string;
    fromTech: string;
    toTechName: string;
    toTech: string;
}

export interface GetCalendarForCustomerRequest {
    customerId: string;
    success?(response: GetCalendarForCustomerResponse[]): void;
    error?(): void;
}


export interface GetMigrationRequestsForCustomerRequest {
    customerId: string;
    success?(response: GetMigrationRequestsForCustomerResponse[]): void;
    error?(err: any): void;
}