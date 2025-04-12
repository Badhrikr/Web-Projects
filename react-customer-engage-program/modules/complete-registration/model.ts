import { GetCustomerByEncIdResponse } from "./services/model.response";

interface CompleteRegistrationProps extends SuccessProps, ErrorProps { }

interface ErrorProps {
    invalidRequest?: boolean;
    alreadyRegistered?: boolean;
    timeExpired?: boolean;
    encCode?: string;
    message?: string;
}

interface SuccessProps extends GetCustomerByEncIdResponse {

}

export type { CompleteRegistrationProps }