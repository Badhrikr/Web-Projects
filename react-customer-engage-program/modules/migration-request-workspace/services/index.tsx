import {
  GET_ADDED_RESPONSIBILITIES,
  GET_ALL_RESPONSIBILITIES,
  GET_CALENDAR_FOR_MIGRATION_REQUEST,
  GET_FILES_FOR_MIGRATION_REQUEST,
  GET_SIGNED_FILES_FOR_MIGRATION_REQUEST
} from "../../../common/api-routes";
import { Api } from "../../../common/http-service";
import {
  GetAddedResponsibilitiesRequest,
  GetAllResponsibilitiesRequest,
  GetCalendarForMigrationRequestRequest,
  GetFilesForMigrationRequestRequest
} from "./model.request";
import {
  GetAddedResponsibilitiesResponse,
  GetAllResponsibilitiesResponse,
  GetCalendarForMigrationRequestResponse,
  GetFilesForMigrationRequestResponse
} from "./model.response";

const api = new Api();

// DUMMY-DATA
export function GetFilesForMigrationRequest({
  migrationRequestId,
  success,
  error,
}: GetFilesForMigrationRequestRequest): Promise<GetFilesForMigrationRequestResponse> {
  return api.get({
    url: GET_FILES_FOR_MIGRATION_REQUEST,
    success,
    error,
  });
}

// DUMMY-DATA
export function GetSignedFilesForMigrationRequest({
  migrationRequestId,
  success,
  error,
}: GetFilesForMigrationRequestRequest): Promise<GetFilesForMigrationRequestResponse> {
  return api.get({
    url: GET_SIGNED_FILES_FOR_MIGRATION_REQUEST,
    success,
    error,
  });
}

// DUMMY-DATA
export function GetAddedResponsibilities({
  migrationRequestId,
  success,
  error,
}: GetAddedResponsibilitiesRequest): Promise<GetAddedResponsibilitiesResponse> {
  return api.get({
    url: GET_ADDED_RESPONSIBILITIES,
    success,
    error,
  });
}

// DUMMY-DATA
export function GetAllResponsibilities({
  success,
  error,
}: GetAllResponsibilitiesRequest): Promise<GetAllResponsibilitiesResponse> {
  return api.get({
    url: GET_ALL_RESPONSIBILITIES,
    success,
    error,
  });
}

export function GetCalendarForMigrationRequest({
  migrationRequestId,
  success,
  error,
}: GetCalendarForMigrationRequestRequest): Promise<GetCalendarForMigrationRequestResponse> {
  return api.get({
    url: `${GET_CALENDAR_FOR_MIGRATION_REQUEST}/${migrationRequestId}`,
    success,
    error,
  });
}
