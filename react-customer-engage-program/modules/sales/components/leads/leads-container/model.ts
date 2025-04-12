import { LeadsFilterProps } from "../../../model";
import { LeadsResponse } from "../../../services/model.response";

export interface LeadsContainerProps {
    query: LeadsFilterProps;
}

export interface LeadsProps extends LeadsResponse {
    isNew?: boolean;
}
