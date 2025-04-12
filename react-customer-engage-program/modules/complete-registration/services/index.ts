import { POST_REGISTER_CUSTOMER_STEP2 } from "../../../common/api-routes";
import Api from "../../../common/http-service";
import { RegisterCustomerStep2Request } from "./model.request";
import { RegisterCustomerStep2Response } from "./model.response";

const api = Api();

function RegisterCustomerStep2({
    custid,
    bussinessDomain,
    address,
    encCode,
    success,
    error
}: RegisterCustomerStep2Request): Promise<RegisterCustomerStep2Response> {
    return api.put({
        url: `${POST_REGISTER_CUSTOMER_STEP2}`,
        body: {
            custid,
            bussinessDomain,
            address,
            encCode
        },
        success,
        error
    });
}

export { RegisterCustomerStep2 };

