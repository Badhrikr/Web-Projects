import { PersonalInfo } from "../../../shared/model";

interface RegisterCustomerStep1Response {
    message: string;
    response: {
        enccode: string;
        id: string;
        personalInfo: PersonalInfo;
    };
}

export type { RegisterCustomerStep1Response }