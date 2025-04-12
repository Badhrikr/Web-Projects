import { POST_REGISTER_CUSTOMER_STEP1 } from "../../../common/api-routes";
import Api from "../../../common/http-service";
import { RegisterCustomerStep1Request } from "./model.request";
import { RegisterCustomerStep1Response } from "./model.response";

const api = Api();

function RegisterCustomerStep1({
    personalInfo,
    success,
    error
}: RegisterCustomerStep1Request): Promise<RegisterCustomerStep1Response> {
    return api.post({
        url: POST_REGISTER_CUSTOMER_STEP1,
        body: { personalInfo },
        success,
        error
    });
}

export { RegisterCustomerStep1 };
