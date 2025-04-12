import { Address } from "../../../shared/model";
import { GetCustomerByEncIdResponse, RegisterCustomerStep2Response } from "./model.response";

interface GetCustomerByEncIdRequest {
    encryptedId: string;
    success?(response?: GetCustomerByEncIdResponse): void;
    error?(error?: any): void;
}

interface RegisterCustomerStep2Request {
    custid: string;
    bussinessDomain: string;
    address: Address;
    encCode?: string | null;
    success?(response?: RegisterCustomerStep2Response): void;
    error?(error: any): void;
}

export type { GetCustomerByEncIdRequest, RegisterCustomerStep2Request, Address }