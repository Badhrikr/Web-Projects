import { Address } from "../../../../../shared/model";
import { CustomersResponse } from "../../../../sales/services/model.response";

export interface EditDemographicsInformationProps extends CustomersResponse {
    onCancel?(): void;
    onSubmit?(updatedData: Address): void;
}