import { GET_ALL_FILE_UPLOAD_TYPES, GET_ALL_MIGRATION_REQUEST_FILES, GET_CUSTOMER_USERS, GET_DOWNLOAD_FILE, GET_MIGRATION_REQUEST_CONVERSATION, GET_MIGRATION_REQUEST_MEMBERS, GET_MIGRATION_REQUEST_TASKS, GET_MIGRATION_REQUEST_TASKS_TO_INITIATE, GET_MIGRATION_REQUEST_TIMELINE, POST_ADD_CUSTOMER_USER, POST_ADD_SALES_PERSON_USER, POST_CREATE_MESSAGES, POST_CREATE_MIGRATION_REQUEST_MEMBERS, POST_CREATING_MEETING, POST_SHARE_FILES_FROM_REPOSITORY, POST_UPLOAD_FILE, PUT_MIGRATION_REQUEST_TASK } from "../../../common/api-routes";
import { Api } from "../../../common/http-service";
import { AddCustomerUserRequest, AddSalesPersonUserRequest, CreateMeetingRequest, CreateMembersRequest, DownloadFileRequest, FileShareFromRepositoryRequest, GetConversationRequest, GetCustomerUsersRequest, GetFileUploadTypesRequest, GetMembersRequest, GetMigrationRequestFilesRequest, GetTasksRequest, GetTimelineRequest, PostQueryRequest, UpdateTaskRequest, UploadFileRequest } from "./model.request";
import { AddCustomerUserResponse, AddSalesPersonUserResponse, CreateMeetingResponse, CreateMembersResponse, DownloadFileResponse, FileShareFromRepositoryResponse, GetConversationResponse, GetCustomerUsersResponse, GetFileUploadTypesResponse, GetMembersResponse, GetMigrationRequestFilesResponse, GetTasksResponse, GetTimelineResponse, PostQueryResponse, UploadFileResponse } from "./model.response";

const api = new Api();

export function GetConversation({ migrationRequestId, success, error }: GetConversationRequest): Promise<GetConversationResponse> {
    return api.get({
        url: `${GET_MIGRATION_REQUEST_CONVERSATION}?engagementId=${migrationRequestId}`,
        success,
        error
    });
}

export function PostQuery({ message, migrationRequestId, repliedTo, success, error }: PostQueryRequest): Promise<PostQueryResponse> {
    return api.post({
        url: `${POST_CREATE_MESSAGES}`,
        body: {
            message,
            migrationRequestId,
            repliedTo
        },
        success,
        error
    })
}

export function GetMembers({ migrationRequestId, success, error }: GetMembersRequest): Promise<GetMembersResponse> {
    return api.get({
        url: `${GET_MIGRATION_REQUEST_MEMBERS}?engagementId=${migrationRequestId}`,
        success,
        error
    });
}

export function CreateMembers({ success, error, ...props }: CreateMembersRequest): Promise<CreateMembersResponse> {
    return api.post({
        url: `${POST_CREATE_MIGRATION_REQUEST_MEMBERS}`,
        body: props,
        success,
        error
    });
}

export function GetCustomerUsers({ migrationRequestId, customerId, success, error }: GetCustomerUsersRequest): Promise<GetCustomerUsersResponse> {
    return api.get({
        url: `${GET_CUSTOMER_USERS}?engagementId=${migrationRequestId}&customerId=${customerId}`,
        success,
        error
    })
}


export function AddCustomerUser({ migrationRequestId, userId, success, error }: AddCustomerUserRequest): Promise<AddCustomerUserResponse> {
    return api.post({
        url: `${POST_ADD_CUSTOMER_USER}/${migrationRequestId}`,
        body: { userId },
        success,
        error
    });
}

export function AddSalesPersonUser({ success, error, migrationRequestId, ...props }: AddSalesPersonUserRequest): Promise<AddSalesPersonUserResponse> {
    return api.post({
        url: `${POST_ADD_SALES_PERSON_USER}/${migrationRequestId}`,
        body: {
            engagementid: migrationRequestId,
            ...props
        },
        success,
        error
    });
}

export function GetTimeline({ migrationRequestId, success, error }: GetTimelineRequest): Promise<GetTimelineResponse> {
    return api.get({
        url: `${GET_MIGRATION_REQUEST_TIMELINE}?engagementId=${migrationRequestId}`,
        success,
        error
    });
}

export function UploadFile({ formData, migrationRequestId, success, error }: UploadFileRequest): Promise<UploadFileResponse> {
    return api.post({
        url: `${POST_UPLOAD_FILE}/${migrationRequestId}`,
        body: formData,
        success,
        error
    });
}

export function DownloadFile({ fileId, migrationRequestId, signal, success, error }: DownloadFileRequest): Promise<DownloadFileResponse> {
    return api.get({
        url: `${GET_DOWNLOAD_FILE}?migrationRequestId=${migrationRequestId}&fileId=${fileId}`,
        httpOptions: { signal },
        success,
        error
    });
}

export function CreateMeeting({ migrationRequestId, success, error, ...props }: CreateMeetingRequest): Promise<CreateMeetingResponse> {
    return api.post({
        url: `${POST_CREATING_MEETING}`,
        body: { ...props, migrationRequestId },
        success,
        error
    });
}

export function GetMigrationRequestFiles({ migrationRequestId, success, error }: GetMigrationRequestFilesRequest): Promise<GetMigrationRequestFilesResponse> {
    return api.get({
        url: `${GET_ALL_MIGRATION_REQUEST_FILES}?engagementId=${migrationRequestId}`,
        success,
        error
    })
}

export function GetFileUploadTypes({ success, error }: GetFileUploadTypesRequest): Promise<GetFileUploadTypesResponse> {
    return api.get({
        url: GET_ALL_FILE_UPLOAD_TYPES,
        success,
        error
    })
}

export function FileShareFromRepository({ migrationRequestId, files, success, error }: FileShareFromRepositoryRequest): Promise<FileShareFromRepositoryResponse> {
    return api.post({
        url: `${POST_SHARE_FILES_FROM_REPOSITORY}/${migrationRequestId}`,
        body: files,
        success,
        error
    })
}

export function GetTasks({
    migrationRequestId,
    success,
    error,
}: GetTasksRequest): Promise<GetTasksResponse> {
    return api.get({
        url: `${GET_MIGRATION_REQUEST_TASKS}?engagementId=${migrationRequestId}`,
        success,
        error,
    });
}

export function GetTasksToInitiate({
    migrationRequestId,
    success,
    error,
}: GetTasksRequest): Promise<GetTasksResponse> {
    return api.get({
        url: `${GET_MIGRATION_REQUEST_TASKS_TO_INITIATE}?engagementId=${migrationRequestId}`,
        success,
        error,
    });
}

export function UpdateTask({
    migrationRequestId,
    processId,
    success,
    error,
    ...props
}: UpdateTaskRequest): Promise<GetTasksResponse> {
    return api.put({
        url: `${PUT_MIGRATION_REQUEST_TASK}`,
        body: { migrationRequestId, processId, ...props },
        success,
        error,
    });
}