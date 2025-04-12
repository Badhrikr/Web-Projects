import {
  GET_ALL_LEGACY_COMPONENTS,
  GET_ALL_MIGRATION_REQUESTS_FOR_CUSTOMER,
  GET_ALL_MIGRATION_REQUEST_FOR_CUSTOMER,
  GET_CALENDAR_FOR_CUSTOMER,
  GET_COMPONENTS,
  GET_OFFERINGS,
  GET_OFFERING_TYPES,
  POST_CREATE_MIGRATION_REQUEST,
} from "../../../common/api-routes";
import { Api } from "../../../common/http-service";
import {
  CreateMigrationRequestRequest,
  GetAllLegacyComponentsRequest,
  GetAllMigrationRequestsForCustomerRequest,
  GetCalendarForCustomerRequest,
  GetComponentsRequest,
  GetMigrationRequestsForCustomerRequest,
  GetOfferingsRequest,
  GetOfferingTypesRequest,
} from "./model.request";
import {
  CreateMigrationRequestResponse,
  GetAllLegacyComponentsResponse,
  GetAllMigrationRequestsForCustomerResponse,
  GetCalendarForCustomerResponse,
  GetComponentsResponse,
  GetMigrationRequestsForCustomerResponse,
  GetOfferingsResponse,
} from "./model.response";

const api = new Api();

// DUMMY-DATA
export function GetAllMigrationRequestsForCustomer({
  id,
  success,
  error,
}: GetAllMigrationRequestsForCustomerRequest): Promise<GetAllMigrationRequestsForCustomerResponse> {
  return api.get({
    url: `${GET_ALL_MIGRATION_REQUEST_FOR_CUSTOMER}`,
    success,
    error,
  });
}

// DUMMY-DATA
export function GetAllLegacyComponents({
  success,
  error,
}: GetAllLegacyComponentsRequest): Promise<GetAllLegacyComponentsResponse> {
  return api.get({
    url: `${GET_ALL_LEGACY_COMPONENTS}`,
    success,
    error,
  });
}

export function GetOfferings({
  success,
  error,
}: GetOfferingsRequest): Promise<GetOfferingsResponse> {
  return api.get({
    url: GET_OFFERINGS,
    success,
    error,
  });
}

export function GetOfferingTypes({
  offeringName,
  success,
  error,
}: GetOfferingTypesRequest) {
  return api.get({
    url: `${GET_OFFERING_TYPES}/${offeringName}`,
    success,
    error,
  });
}

export function GetComponents({
  offeringTypeId,
  success,
  error,
}: GetComponentsRequest): Promise<GetComponentsResponse> {
  return api.get({
    url: `${GET_COMPONENTS}/${offeringTypeId}`,
    success,
    error,
  });
}

export function CreateMigrationRequest({
  success,
  error,
  ...props
}: CreateMigrationRequestRequest): Promise<CreateMigrationRequestResponse> {
  return api.post({
    url: POST_CREATE_MIGRATION_REQUEST,
    body: props,
    success,
    error,
  });
}

export function GetCalendarForCustomer({
  customerId,
  success,
  error,
}: GetCalendarForCustomerRequest): Promise<GetCalendarForCustomerResponse> {
  return api.get({
    url: `${GET_CALENDAR_FOR_CUSTOMER}/${customerId}`,
    success,
    error,
  });
}

export function GetMigrationRequestsForCustomer({
  customerId,
  success,
  error,
}: GetMigrationRequestsForCustomerRequest): Promise<
  GetMigrationRequestsForCustomerResponse[]
> {
  return api.get({
    url: `${GET_ALL_MIGRATION_REQUESTS_FOR_CUSTOMER}?customerId=${customerId}`,
    success,
    error,
  });
}
