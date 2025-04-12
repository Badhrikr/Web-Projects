import { GetSalesPersonsResponse } from "../../../../../shared/services/model.response";

export interface AssignConfirmationProps extends Partial<GetSalesPersonsResponse> {
    leadId: string;
    onAssign?(person: Partial<GetSalesPersonsResponse>): void;
    onCancel?(): void;
}