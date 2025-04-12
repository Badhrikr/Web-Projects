import { LeadsFilterProps } from "../../../model";
import { CustomersResponse } from "../../../services/model.response";

export interface CustomersContainerProps {
    query: LeadsFilterProps;
}

export interface CustomersProps extends CustomersResponse {
    isNew?: boolean;
}

