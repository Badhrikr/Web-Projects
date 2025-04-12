import { CustomersResponse } from "../../../../sales/services/model.response";

export interface EditPersonalInformationProps extends CustomersResponse {
    onSubmit?(updatedData: CustomersResponse): void;
    onCancel?(): void;
}