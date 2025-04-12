import { PersonalInfo } from "../../../../shared/model";

interface OrganizationDetailsProps extends PersonalInfo {
    encCode?: string;
    custId: string;
    alreadyRegistered: boolean;
    userName: string;
    customerName: string;
}

export type { OrganizationDetailsProps }