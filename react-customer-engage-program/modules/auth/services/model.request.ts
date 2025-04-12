import { PersonalInfo } from "../../../shared/model";
import { RegisterCustomerStep1Response } from "./model.response";

interface RegisterCustomerStep1Request {
    personalInfo: PersonalInfo;
    success?(response?: RegisterCustomerStep1Response): void;
    error?(error: any): void;
}

export type { RegisterCustomerStep1Request };