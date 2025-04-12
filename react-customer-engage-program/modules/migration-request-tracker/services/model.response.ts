import { GetOfferingsResponse, GetOfferingTypesResponse } from "../../customer-workspace/services/model.response";
import { GetCalendarForMigrationRequestResponse } from "../../migration-request-workspace/services/model.response";
import { ConversationTypes, ProcessStatus } from "../enums";
import { MigrationRequestFile, MigrationRequestProcess, MigrationRequestQuery, MigrationRequestTechnologies } from "../model";

export type Data = GetOfferingsResponse |
    GetOfferingTypesResponse |
    MigrationRequestTechnologies[] |
    MigrationRequestProcess |
    MigrationRequestFile[] |
    GetTasksResponse |
    MigrationRequestQuery | GetCalendarForMigrationRequestResponse;

export interface GetConversationResponse {
    customerId?: string;
    customerLogo?: string;
    customerName?: string;
    conversationId: string;
    engagementId?: string;
    conversationType: ConversationTypes;
    data: Data;
    userId: string;
    userName: string;
    repliedTo?: GetConversationResponse | null;
    loggedOn: string;
}

export interface PostQueryResponse {
    conversationid: string;
    message: string;
}

export interface GetMembersResponse {
    userId: string;
    userEmail: string;
    firstName: string;
    lastName: string;
}

export interface CreateMembersResponse {

}

export interface GetTasksResponse {
    taskId: string;
    taskName: string;
    taskDescription: string;
    taskIcon: string;
    parentTaskId?: string;
    taskStatus: ProcessStatus;
    remarks?: string;
    loggedTime: string;
}

export interface UpdateTaskResponse {

}

export interface GetCustomerUsersResponse {
    userId: string;
    userEmail: string;
    firstName: string;
    lastName: string;
}

export interface AddCustomerUserResponse {

}

export interface AddSalesPersonUserResponse {

}

export interface GetTimelineResponse extends GetTasksResponse {
    remarksHistory: GetTasksResponse[];
}

export interface UploadFileResponse {

}

export interface DownloadFileResponse extends Blob {

}

export interface CreateMeetingResponse {

}

export interface GetMigrationRequestFilesResponse extends MigrationRequestFile {

}

export interface GetFileUploadTypesResponse {
    fileTypeId: string;
    fileTypeName: string;
    fileTypeIcon: string;
}

export interface FileShareFromRepositoryResponse {

}