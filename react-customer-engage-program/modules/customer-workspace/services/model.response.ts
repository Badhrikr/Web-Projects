import { ComponentSeparatorType } from "../../customer-workspace/enum";
import { MigrationRequestTechnologies } from "../../migration-request-tracker/model";
import { GetCalendarForMigrationRequestResponse } from "../../migration-request-workspace/services/model.response";
import { GetAllMigrationRequestsResponse } from "../../sales/services/model.response";
import { CreateMigrationRequestTechnologies } from "./model.request";

// DUMMY-DATA
export interface GetAllMigrationRequestsForCustomerResponse extends GetAllMigrationRequestsResponse {

}

export interface GetAllLegacyComponentsResponse {
    componentId: string;
    componentName: string;
    migrationTypes: string;
    orderNo: 1,
    status: string;
    image: string;
    technologies: {
        id: string;
        technologyName: string;
        technologyType: ComponentSeparatorType;
        status: string
    }[],
}

// TOCHANGE
export interface GetOfferingsResponse {
    offeringName: string;
    offeringDescription: string;
    offeringIcon: string;
}

// TOCHANGE
export interface GetOfferingTypesResponse {
    offeringTypeId: string;
    offeringTypeName: string;
    offeringTypeDescription: string;
    offeringTypeIcon: string;
}

// TOCHANGE
export interface GetComponentsResponse {
    componentId: string;
    componentName: string;
    componentDescription: string;
    fromTechnologies: Component[];
    toTechnologies: Component[];
}

export interface Component {
    technologyId: string;
    technologyName: string;
}

export interface CreateMigrationRequestResponse {
    engagementId: string;
}

export interface GetCalendarForCustomerResponse extends GetCalendarForMigrationRequestResponse {

}

export interface GetMigrationRequestsForCustomerResponse {
    migrationRequestId: string;
    chosenMigrationType: GetOfferingTypesResponse;
    chosenMigrationRequest: GetOfferingsResponse;
    technologies: CreateMigrationRequestTechnologies[];
}