import { RequestCallbackResponse,CreateDemoResponse } from "./model.response";

interface PersonalInfoVo {
    organisationName: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    contactNumber: string;
}

interface RequestCallbackRequest {
    personalInfoVo: PersonalInfoVo;
    requestDetails: string;
    success?(response?: RequestCallbackResponse): void;
    error?(error: any): void;
}
interface RequestRCreateDemoRequest {
    personalInfoVo: PersonalInfoVo;
    requestDetails: string;
    sourceTechnology: string;
    targetTechnology: string;
    success?(response?: CreateDemoResponse): void;
    error?(error: any): void;
}

export type { RequestCallbackRequest,RequestRCreateDemoRequest };

