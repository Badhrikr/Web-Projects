import { GetAddedResponsibilitiesResponse } from "../../../services/model.response";

export interface ResponsibilityDeleteConfirmationProps extends GetAddedResponsibilitiesResponse {
    loading?: boolean;
    onCancel?(): void;
    onDelete?(): void;
}