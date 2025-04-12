import { GET_ALL_CUSTOMERS, GET_ALL_LEADS_WITH_PAGINATION, GET_ALL_MIGRATION_REQUEST, GET_CALENDAR_ALL, GET_DOWNLOAD_FILE_FROM_REPOSITORY, GET_LEADS_TRACKER_BY_ID, GET_LEAD_BY_ID, GET_REPOSITORY_UPLOADS, GET_SEARCH_REPOSITORY, POST_COPY_TO_DESTINATION, POST_CREATE_REPOSITORY_FOLDER, POST_MOVE_TO_DESTINATION, POST_UPLOAD_FILE_TO_REPOSITORY, PUT_CUSTOMER_ASSIGN_SALES_PERSON, PUT_CUSTOMER_QUALIFY_DISQUALIFY, PUT_CUSTOMER_UPDATE, PUT_LEAD_UPDATE, PUT_UPDATE_LEAD_DETAILS } from "../../../common/api-routes";
import Api from "../../../common/http-service";
import { CustomerUpdateType, LeadUpdateType } from "../enums";
import { AssignCustomerSalesPersonRequest, AssignSalesPersonRequest, CopyToMoveToDestinationRepositoryRequest, CreateRepositoryFolderRequest, CustomerUpdateRequest, DownloadFromRepositoryRequest, FollowUpRequest, GetAllCustomersRequest, GetAllLeadsWithPaginationRequest, GetAllMigrationRequestsRequest, GetCalendarRequest, GetLeadByIdRequest, GetLeadTrackerByIdRequest, GetRepositoryUploadsRequest, LeadUpdateRequest, QualifyDisqualifyCustomerRequest, QualifyDisqualifyLeadRequest, SearchRepositoryRequest, UpdateLeadDetailsRequest, UploadFilesToRepositoryRequest } from "./model.request";
import { CreateRepositoryFolderResponse, CustomerUpdateResponse, DownloadFromRepositoryResponse, GetAllCustomersResponse, GetAllLeadsWithPaginationResponse, GetAllMigrationRequestsResponse, GetCalendarResponse, GetLeadByIdResponse, GetLeadTrackerByIdResponse, GetRepositoryUploadsResponse, LeadUpdateResponse, SearchRepositoryResponse, UpdateLeadDetailsResponse, UploadFilesToRepositoryResponse } from "./model.response";

const api = Api();

const addFilters = <T>(props: T) => {
    const searchParams = new URLSearchParams();

    for (const key in props) {
        const value = props[key as keyof typeof props];
        if (value === null || value === undefined) continue;

        searchParams.set(key, String(props[key as keyof typeof props]))
    }

    return searchParams;
}

export function GetAllLeadsWithPagination({ success, error, ...props }: GetAllLeadsWithPaginationRequest): Promise<GetAllLeadsWithPaginationResponse> {
    const filters = addFilters<GetAllLeadsWithPaginationRequest>(props);

    return api.get({
        url: `${GET_ALL_LEADS_WITH_PAGINATION}?${filters.toString()}`,
        success,
        error
    })
}

export function GetAllCustomers({ success, error, ...props }: GetAllCustomersRequest): Promise<GetAllCustomersResponse> {
    const filters = addFilters<GetAllCustomersRequest>(props);

    return api.get({
        url: `${GET_ALL_CUSTOMERS}?${filters.toString()}`,
        success,
        error
    })
}

export function GetLeadById({ leadId, success, error }: GetLeadByIdRequest): Promise<GetLeadByIdResponse> {
    return api.get({
        url: `${GET_LEAD_BY_ID}/${leadId}`,
        success,
        error
    });
}

export function UpdateLeadDetails({ formData, leadId, success, error, }: UpdateLeadDetailsRequest): Promise<UpdateLeadDetailsResponse> {
    return api.put({
        url: `${PUT_UPDATE_LEAD_DETAILS}?leadId=${leadId}`,
        body: formData,
        success,
        error
    });
}

export function QualifyDisqualifyLead({ success, error, leadId, ...props }: QualifyDisqualifyLeadRequest): Promise<LeadUpdateResponse> {
    return api.put({
        url: `${PUT_LEAD_UPDATE}?leadid=${leadId}`,
        body: { ...props, updateType: LeadUpdateType.QUALIFY_LEAD },
        success,
        error
    })
}

export function AssignSalesPerson({ success, error, leadId, ...props }: AssignSalesPersonRequest): Promise<LeadUpdateResponse> {
    return api.put({
        url: `${PUT_LEAD_UPDATE}?leadid=${leadId}`,
        body: { ...props, updateType: LeadUpdateType.LEAD_ASSIGN_TO },
        success,
        error
    })
}

export function AddFollowUp({ success, error, leadId, ...props }: FollowUpRequest): Promise<LeadUpdateResponse> {
    return api.put({
        url: `${PUT_LEAD_UPDATE}?leadid=${leadId}`,
        body: { ...props, updateType: LeadUpdateType.LEAD_STATUS },
        success,
        error
    })
}

export function LeadUpdate({ success, error, leadId, ...props }: LeadUpdateRequest): Promise<LeadUpdateResponse> {
    return api.put({
        url: `${PUT_LEAD_UPDATE}?leadid=${leadId}`,
        body: { ...props },
        success,
        error
    })
}

export function GetLeadTrackerById({ leadId, success, error }: GetLeadTrackerByIdRequest): Promise<GetLeadTrackerByIdResponse> {
    return api.get({
        url: `${GET_LEADS_TRACKER_BY_ID}/${leadId}`,
        success,
        error
    })
}



export function CustomerUpdate({
    success,
    error,
    ...props
}: CustomerUpdateRequest): Promise<CustomerUpdateResponse> {
    return api.put({
        url: `${PUT_CUSTOMER_UPDATE}?${addFilters(props).toString()}`,
        body: { ...props },
        success,
        error,
    });
}

export function AssignCustomerSalesPerson({
    success,
    error,
    ...props
}: AssignCustomerSalesPersonRequest): Promise<CustomerUpdateResponse> {
    return api.post({
        url: `${PUT_CUSTOMER_ASSIGN_SALES_PERSON}`,
        body: props,
        success,
        error,
    });
}

export function QualifyDisqualifyCustomer({
    success,
    error,
    ...props
}: QualifyDisqualifyCustomerRequest): Promise<CustomerUpdateResponse> {
    return api.post({
        url: `${PUT_CUSTOMER_QUALIFY_DISQUALIFY}`,
        body: props,
        success,
        error,
    });
}

// DUMMY-DATA
export function GetAllMigrationRequests({ success, error }: GetAllMigrationRequestsRequest): Promise<GetAllMigrationRequestsResponse> {
    return api.get({
        url: `${GET_ALL_MIGRATION_REQUEST}`,
        success,
        error,
    });
}

export function GetRepositoryUploads({ pathName, success, error }: GetRepositoryUploadsRequest): Promise<GetRepositoryUploadsResponse> {
    return api.get({
        url: `${GET_REPOSITORY_UPLOADS}?pathName=${pathName}`,
        success,
        error
    });
}

export function CreateRepositoryFolder({ newFolderName, pathName, success, error, }: CreateRepositoryFolderRequest): Promise<CreateRepositoryFolderResponse> {
    return api.post({
        url: POST_CREATE_REPOSITORY_FOLDER,
        body: {
            newFolderName,
            pathName
        },
        success,
        error
    });
}

export function SearchRepository({ searchText, success, error }: SearchRepositoryRequest): Promise<SearchRepositoryResponse> {
    return api.get({
        url: `${GET_SEARCH_REPOSITORY}?searchText=${searchText}`,
        success,
        error
    });
}

export function DownloadFromRepository({ pathName, success, error }: DownloadFromRepositoryRequest): Promise<DownloadFromRepositoryResponse> {
    return api.get({
        url: `${GET_DOWNLOAD_FILE_FROM_REPOSITORY}?pathName=${pathName}`,
        success,
        error
    });
}

export function UploadFilesToRepository({ destinationFolder, formData, success, error }: UploadFilesToRepositoryRequest): Promise<UploadFilesToRepositoryResponse> {
    return api.post({
        url: `${POST_UPLOAD_FILE_TO_REPOSITORY}?destinationFolder=${destinationFolder}`,
        body: formData,
        success,
        error
    })
}

export function CopyToDestinationRepository({ data, success, error }: CopyToMoveToDestinationRepositoryRequest): Promise<void> {
    return api.post({
        url: POST_COPY_TO_DESTINATION,
        body: data,
        success,
        error
    })
}

export function MoveToDestinationRepository({ data, success, error }: CopyToMoveToDestinationRepositoryRequest): Promise<void> {
    return api.post({
        url: POST_MOVE_TO_DESTINATION,
        body: data,
        success,
        error
    })
}

export function GetCalendar({ success, error }: GetCalendarRequest): Promise<GetCalendarResponse[]> {
    return api.get({
        url: GET_CALENDAR_ALL,
        success,
        error
    })
}