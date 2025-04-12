import { CustomerUpdateType, LeadUpdateType, Status } from "../enums";
import { CustomersFilterProps, LeadsFilterProps } from "../model";
import { CreateRepositoryFolderResponse, CustomerUpdateResponse, DownloadFromRepositoryResponse, GetAllCustomersResponse, GetAllLeadsWithPaginationResponse, GetAllMigrationRequestsResponse, GetCalendarResponse, GetLeadByIdResponse, GetLeadTrackerByIdResponse, GetRepositoryUploadsResponse, LeadUpdateResponse, SearchRepositoryResponse, UpdateLeadDetailsResponse, UploadFilesToRepositoryResponse } from "./model.response";

export interface GetAllLeadsWithPaginationRequest extends LeadsFilterProps {
    success?(response: GetAllLeadsWithPaginationResponse): void;
    error?(err: any): void;
}

export interface GetAllCustomersRequest extends CustomersFilterProps {
    success?(response: GetAllCustomersResponse): void;
    error?(err: any): void;
}

export interface GetLeadByIdRequest {
    leadId: string;
    success?(response: GetLeadByIdResponse): void;
    error?(err: any): void;
}

export interface UpdateLeadDetailsRequest {
    leadId?: string;
    formData?: FormData;
    success?(response: UpdateLeadDetailsResponse): void;
    error?(err: any): void;
}

export interface LeadUpdateRequest {
    leadId: string;
    updateType: LeadUpdateType;
    status?: Status;
    followUpDate?: string;
    salesPerson?: string;
    isQualified?: boolean;
    comments?: string;
    success?(response: LeadUpdateResponse): void;
    error?(err: any): void;
}

export interface QualifyDisqualifyLeadRequest {
    leadId: string;
    isQualified: boolean;
    comments?: string;
    followUpDate?: string;
    preSalesPerson?: string;
    success?(response: LeadUpdateResponse): void;
    error?(err: any): void;
}

export interface AssignSalesPersonRequest {
    leadId: string;
    salesPerson: string;
    success?(response: LeadUpdateResponse): void;
    error?(err: any): void;
}

export interface FollowUpRequest {
    leadId: string;
    status: Status;
    followUpDate?: string;
    comments?: string;
    success?(response: LeadUpdateResponse): void;
    error?(err: any): void;
}

export interface GetLeadTrackerByIdRequest {
    leadId: string;
    success?(response: Array<GetLeadTrackerByIdResponse>): void;
    error?(err: any): void;
}


export interface CustomerUpdateRequest {
    customerId: string;
    updateType: CustomerUpdateType;
    status?: Status;
    salesPerson?: string;
    comments?: string;
    success?(response: CustomerUpdateResponse): void;
    error?(err: any): void;
}

export interface AssignCustomerSalesPersonRequest {
    customerId: string;
    firstName: string;
    lastName: string;
    status: string;
    salesPerson: string;
    comments: string;
    success?(response: CustomerUpdateResponse): void;
    error?(err: any): void;
}

export interface QualifyDisqualifyCustomerRequest {
    customerId: string;
    status: string;
    comments: string;
    success?(response: CustomerUpdateResponse): void;
    error?(err: any): void;
}

export interface GetAllMigrationRequestsRequest {
    success?(response: GetAllMigrationRequestsResponse[]): void;
    error?(err: any): void;
}

export interface GetRepositoryUploadsRequest {
    pathName: string;
    success?(response: GetRepositoryUploadsResponse[]): void;
    error?(err: any): void;
}

export interface CreateRepositoryFolderRequest {
    newFolderName: string;
    pathName: string;
    success?(response: CreateRepositoryFolderResponse): void;
    error?(err: any): void;
}

export interface SearchRepositoryRequest {
    searchText: string;
    success?(response: SearchRepositoryResponse[]): void;
    error?(err: any): void;
}

export interface DownloadFromRepositoryRequest {
    pathName: string;
    success?(response: DownloadFromRepositoryResponse): void;
    error?(err: any): void;
}

export interface UploadFilesToRepositoryRequest {
    destinationFolder: string;
    formData: FormData;
    success?(response: UploadFilesToRepositoryResponse): void;
    error?(err: any): void;
}

export interface CopyToMoveToDestinationRepositoryRequest {
    data: {
        filePath: string;
        destinationFolderPath: string;
    }[],
    success?(response: void): void;
    error?(err: any): void;
}



export interface GetCalendarRequest {
    success?(response: GetCalendarResponse[]): void;
    error?(err: any): void;
}