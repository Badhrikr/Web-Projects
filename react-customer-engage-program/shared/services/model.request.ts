import { TechnologyType } from "../enums";
import { GetAllBusinessDomainsResponse, GetCustomerByIdResponse, GetNotificationsResponse, GetSalesPersonsResponse, GetSignedUserDetailResponse, GetTechnologiesByTechnologyTypeResponse, MarkNotificationsViewedResponse, SaveUserDetailResponse } from "./model.response";

export interface GetNotificationByUserRequest {
    email: string;
    count?: number | null;
    success?(response: Array<GetNotificationsResponse>): void;
    error?(error: any): void;
}

export interface MarkNotificationsViewedRequest {
    ids: string;
    email: string;
    success?(response: Array<MarkNotificationsViewedResponse>): void;
    error?(error: any): void;
}

export interface SaveUserDetailRequest {
    name: string;
    email: string;
    success?(response: SaveUserDetailResponse): void;
    error?(): void;
}

export interface GetTechnologiesByTechnologyTypeRequest {
    technologyType: Array<TechnologyType>;
    success?(response: Array<GetTechnologiesByTechnologyTypeResponse>): void;
    error?(): void;
}

export interface GetAllBusinessDomainsRequest {
    success?(response: Array<GetAllBusinessDomainsResponse>): void;
    error?(err: any): void;
}

export interface GetCustomerByIdRequest {
    id: string;
    success?(response: GetCustomerByIdResponse): void;
    error?(err: any): void;
}

export interface GetSalesPersonsRequest {
    success?(response: Array<GetSalesPersonsResponse>): void;
    error?(): void;
}

export interface GetSignedUserDetailRequest {
    success?(response: GetSignedUserDetailResponse): void;
    error?(err: any): void;
}