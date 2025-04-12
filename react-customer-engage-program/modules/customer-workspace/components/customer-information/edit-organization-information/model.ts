import { CustomersResponse } from "../../../../sales/services/model.response";

export interface EditOrganizationInformationProps extends CustomersResponse {
    onSubmit?(updatedData: CustomersResponse): void;
    onCancel?(): void;
}