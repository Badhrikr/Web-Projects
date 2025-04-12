import { GetRepositoryUploadsResponse } from "../../sales/services/model.response";
import { ProcessStatus } from "../enums";
import { AddCustomerUserResponse, AddSalesPersonUserResponse, CreateMeetingResponse, CreateMembersResponse, DownloadFileResponse, FileShareFromRepositoryResponse, GetConversationResponse, GetCustomerUsersResponse, GetFileUploadTypesResponse, GetMembersResponse, GetMigrationRequestFilesResponse, GetTasksResponse, GetTimelineResponse, PostQueryResponse, UpdateTaskResponse, UploadFileResponse } from "./model.response";

export interface GetConversationRequest {
    migrationRequestId: string;
    success?(response: GetConversationResponse[]): void;
    error?(err: any): void;
}

export interface PostQueryRequest {
    migrationRequestId: string;
    message: string;
    repliedTo?: string | null;
    success?(response: PostQueryResponse): void;
    error?(err: any): void;
}

export interface GetMembersRequest {
    migrationRequestId: string;
    success?(response: GetMembersResponse[]): void;
    error?(): void;
}

export interface CreateMembersRequest {
    useremail: string;
    firstname: string;
    lastname: string;
    userrole?: string;
    customerid?: string;
    engagementid: string;
    success?(response: CreateMembersResponse): void;
    error?(): void;
}

export interface GetTasksRequest {
    migrationRequestId: string;
    success?(response: GetTasksResponse[]): void;
    error?(err: any): void;
}

export interface UpdateTaskRequest {
    migrationRequestId: string;
    processId: string;
    status: ProcessStatus;
    remarks?: string;
    success?(response: UpdateTaskResponse): void;
    error?(err: any): void;
}

export interface GetCustomerUsersRequest {
    migrationRequestId: string;
    customerId: string;
    success?(response: GetCustomerUsersResponse[]): void;
    error?(err: any): void;
}

export interface AddCustomerUserRequest {
    migrationRequestId: string;
    userId: string;
    success?(response: AddCustomerUserResponse): void;
    error?(err: any): void;
}

export interface AddSalesPersonUserRequest {
    migrationRequestId: string;
    firstname: string;
    lastname: string;
    useremail: string;
    success?(response: AddSalesPersonUserResponse): void;
    error?(err: any): void;
}

export interface GetTimelineRequest {
    migrationRequestId: string;
    success?(response: GetTimelineResponse[]): void;
    error?(err: any): void;
}

export interface UploadFileRequest {
    formData: FormData;
    migrationRequestId: string;
    success?(response: UploadFileResponse): void;
    error?(err: any): void;
}

export interface DownloadFileRequest {
    signal: AbortSignal;
    migrationRequestId: string;
    fileId: string;
    success?(response: DownloadFileResponse): void;
    error?(err: any): void;
}

export interface CreateMeetingRequest {
    migrationRequestId: string;
    agenda: string;
    description: string;
    members: {
        userid: string;
        username: string;
        useremail: string;
    }[];
    startDate: string;
    endDate: string;
    sendEmail: boolean;

    success?(response: CreateMeetingResponse): void;
    error?(err: any): void;
}

export interface GetMigrationRequestFilesRequest {
    migrationRequestId: string;
    success?(response: GetMigrationRequestFilesResponse[]): void;
    error?(err: any): void;
}

export interface GetFileUploadTypesRequest {
    success?(response: GetFileUploadTypesResponse[]): void;
    error?(err: any): void;
}

export interface FileShareFromRepositoryRequest {
    migrationRequestId: string;
    files: GetRepositoryUploadsResponse[];
    success?(response: FileShareFromRepositoryResponse): void;
    error?(err: any): void;
}