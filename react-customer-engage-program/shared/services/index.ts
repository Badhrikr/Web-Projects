import { GET_ALL_BUSINESS_DOMAINS, GET_CUSTOMER_BY_ID, GET_NOTIFICATIONS_BY_USER, GET_SALES_PERSONS, GET_TECHNOLOGIES_BY_TECHNOLOGY_TYPE, POST_GET_SIGNED_USER_DETAILS, POST_SAVE_USER_DETAIL, PUT_MARK_NOTIFICATION_VIEWED } from "../../common/api-routes";
import ApiInstance, { Api } from "../../common/http-service";
import { GetAllBusinessDomainsRequest, GetCustomerByIdRequest, GetNotificationByUserRequest, GetSalesPersonsRequest, GetSignedUserDetailRequest, GetTechnologiesByTechnologyTypeRequest, MarkNotificationsViewedRequest, SaveUserDetailRequest } from "./model.request";
import { GetAllBusinessDomainsResponse, GetCustomerByIdResponse, GetNotificationsResponse, GetSalesPersonsResponse, GetSignedUserDetailResponse, GetTechnologiesByTechnologyTypeResponse, SaveUserDetailResponse } from "./model.response";

const api = ApiInstance();

export function GetNotificationByUser({ email, count, success, error }: GetNotificationByUserRequest): Promise<GetNotificationsResponse> {
    return api.get({
        url: `${GET_NOTIFICATIONS_BY_USER}/${email}`,
        success,
        error
    });
}

export function MarkNotificationsViewed({ ids, email, success, error }: MarkNotificationsViewedRequest): Promise<GetNotificationsResponse> {
    return api.put({
        url: `${PUT_MARK_NOTIFICATION_VIEWED}`,
        body: { ids, email },
        success,
        error
    });
}

export function GetSignedUserDetail({ success, error }: GetSignedUserDetailRequest): Promise<GetSignedUserDetailResponse> {
    return api.post({
        url: POST_GET_SIGNED_USER_DETAILS,
        body: {},
        success,
        error
    })
}


export function SaveUserDetail({ name, email, success, error }: SaveUserDetailRequest): Promise<SaveUserDetailResponse> {
    return api.post({
        url: POST_SAVE_USER_DETAIL,
        body: { name, email },
        success,
        error
    })
}

export function GetTechnologiesByTechnologyType({ technologyType, success, error }: GetTechnologiesByTechnologyTypeRequest): Promise<GetTechnologiesByTechnologyTypeResponse> {
    return api.get({
        url: `${GET_TECHNOLOGIES_BY_TECHNOLOGY_TYPE}?technologyType=${technologyType.join(",")}`,
        success,
        error
    });
}

export function GetAllBusinessDomains({ success, error }: GetAllBusinessDomainsRequest): Promise<GetAllBusinessDomainsResponse> {
    return api.get({
        url: GET_ALL_BUSINESS_DOMAINS,
        success,
        error
    })
}

export function GetCustomerById({
    id,
    success,
    error,
}: GetCustomerByIdRequest): Promise<GetCustomerByIdResponse> {
    return api.get({
        url: `${GET_CUSTOMER_BY_ID}?customerId=${id}`,
        success,
        error,
    });
}

export function GetSalesPersons({ success, error }: GetSalesPersonsRequest): Promise<GetSalesPersonsResponse> {
    return api.get({
        url: GET_SALES_PERSONS,
        headers: {
            mode: "no-cors"
        },
        success,
        error
    })
}
