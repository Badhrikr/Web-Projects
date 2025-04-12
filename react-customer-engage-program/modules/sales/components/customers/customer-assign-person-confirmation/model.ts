import { GetSalesPersonsResponse } from "../../../../../shared/services/model.response";

export interface AssignConfirmationProps extends Partial<GetSalesPersonsResponse> {
    customerId: string;
    onAssign?(person: Partial<GetSalesPersonsResponse>): void;
    onCancel?(): void;
}
