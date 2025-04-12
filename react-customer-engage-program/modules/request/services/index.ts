import { POST_CREATE_CALLBACK_REQUEST, POST_CREATE_DEMO_REQUEST } from "../../../common/api-routes";
import Api from "../../../common/http-service";
import { RequestCallbackRequest,RequestRCreateDemoRequest } from "./model.request";
import { RequestCallbackResponse,CreateDemoResponse } from "./model.response";

const api = Api();

const CreateCallbackRequest = ({
    personalInfoVo,
    requestDetails,
    success,
    error
}: RequestCallbackRequest): Promise<RequestCallbackResponse> => {
    return api.post({
        url: POST_CREATE_CALLBACK_REQUEST,
        body: {
            personalInfoVo,
            requestDetails
        },
        success,
        error
    });
};

const CreateDemoRequest = ({
    personalInfoVo,
    requestDetails,
    sourceTechnology,
    targetTechnology,
    success,
    error
}: RequestRCreateDemoRequest): Promise<CreateDemoResponse> => {
    return api.post({
        url: POST_CREATE_DEMO_REQUEST,
        body: {
            personalInfoVo,
            requestDetails,
            sourceTechnology,
            targetTechnology
        },
        success,
        error
    });
};

export { CreateCallbackRequest, CreateDemoRequest };
