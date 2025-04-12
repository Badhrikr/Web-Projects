import { CustomersResponse } from "../../modules/sales/services/model.response";
import { ApplicationRoles, TechnologyType } from "../enums";
import { NotificationType } from "../model";

export interface GetNotificationsResponse {
    id: string;
    detailId?: string;
    message: string;
    isViewed?: boolean;
    createdDate: string;
    viewedRecipients?: string;
    action: NotificationType;
    role: ApplicationRoles;
}

export interface SaveUserDetailResponse { }

export interface MarkNotificationsViewedResponse { }

export interface GetTechnologiesByTechnologyTypeResponse {
    id: string;
    technologyType: TechnologyType;
    technologyName: string;
}

export interface GetAllBusinessDomainsResponse {
    domainId: string;
    domainName: string;
}

export interface GetCustomerByIdResponse extends CustomersResponse { }

export interface GetSalesPersonsResponse {
    firstName: string;
    lastName: string;
    email: string;
}

export interface GetSignedUserDetailResponse {
    
}