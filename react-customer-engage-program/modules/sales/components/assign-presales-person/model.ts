import { GetSalesPersonsResponse } from "../../../../shared/services/model.response";

export interface AssignPreSalesPersonProps {
    loading?: boolean;
    onCancel?(): void;
    onSubmit?(preSalesPerson: GetSalesPersonsResponse): void;
}