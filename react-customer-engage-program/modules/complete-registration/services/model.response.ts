import { PersonalInfo } from "../../../shared/model";

interface GetCustomerByEncIdResponse {
    id: string;
    personalInfo: PersonalInfo;
    salesPerson: string | null;
    bussinessDomain: string | null;
    address: string | null;
    status: string | null;
    userName: string;
    customerName: string;
}

interface RegisterCustomerStep2Response { }

export type { GetCustomerByEncIdResponse, RegisterCustomerStep2Response }