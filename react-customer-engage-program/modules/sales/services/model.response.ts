import { LeadType } from "../../../shared/enums";
import { Address, PersonalInfo } from "../../../shared/model";
import { GetCalendarForMigrationRequestResponse } from "../../migration-request-workspace/services/model.response";
import { LeadTrackerAction, MigrationType, Status } from "../enums";

export interface GetAllLeadsWithPaginationResponse {
    data: Array<LeadsResponse>;
    pagination: PaginationParams;
}

export interface LeadsResponse {
    id: string;
    customerId?: string;
    personalInfo: PersonalInfo;
    sourceTechnology?: string;
    sourceTechnologyDesc?: string;
    targetTechnology?: string;
    targetTechnologyDesc?: string;
    address?: Address;
    requestDetails?: string;
    leadType: LeadType;
    isQualified?: boolean;
    status: Status;
    followUpDate?: string;
    salesPerson?: string;
    bussinessDomain?: string;
    bussinessDomainDesc?: string;
    organisationLogo?: any | string;
    referralCustomerId?: string;
}

export interface GetAllCustomersResponse {
    data: Array<CustomersResponse>;
    pagination: PaginationParams;
}

export interface CustomersResponse {
    Id: string;
    userName: string;
    customerName: string;
    domainName: string;
    salesPerson?: string;
    status: string;
    organisationLogo?: string;
    userContactNo: string;
    userEmail: string;

    personalInfo: PersonalInfo;
    bussinessDomain?: string;
    bussinessDomainDesc?: string;
    address: Address;
    comments?: string;
}

export interface PaginationParams {
    count: number;
    limit: number;
    message: string;
    offset: number;
    totalCount: number;
}

export interface GetLeadByIdResponse extends LeadsResponse { }

export interface UpdateLeadDetailsResponse { }

export interface CustomerUpdateResponse extends CustomersResponse { }

export interface LeadUpdateResponse extends LeadsResponse { }

export interface GetLeadTrackerByIdResponse {
    leadsId: string;
    comments?: string;
    action: LeadTrackerAction;
    followUpDate?: string;
    createdDate: string,
    createdBy?: string;

    // Extra params
    assignedBy: string;
    assignedTo: string;
}

// DUMMY-DATA 
export interface GetAllMigrationRequestsResponse {
    id: number;
    personalInfo?: PersonalInfo;
    address?: Address;
    engagement?: MigrationType;
    sourceTech?: SourceTargetTech;
    targetTech?: SourceTargetTech;
    salesPerson: string;
    preSalesPerson: string;
    status: string;
    commants: string;
    organisationLogo?: string;
}

// DUMMY-DATA
export interface SourceTargetTech {
    frontend?: string;
    middleware?: string;
    batch?: string;
    scheduler?: string;
    database?: string;
}

export interface GetRepositoryUploadsResponse {
    fileName?: string;
    fileSize?: number;
    filePath?: string;
    isFolder?: boolean;
    folderName?: string;
    folderPath?: string;
    folderItems?: number;
    createdTime: string;
}

export interface CreateRepositoryFolderResponse {

}

export interface SearchRepositoryResponse extends GetRepositoryUploadsResponse {

}

export interface DownloadFromRepositoryResponse {

}

export interface UploadFilesToRepositoryResponse {

}

export interface GetCalendarResponse extends GetCalendarForMigrationRequestResponse {

}