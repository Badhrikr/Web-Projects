import { GetAddedResponsibilitiesResponse, GetAllResponsibilitiesResponse } from "../../../services/model.response";

export interface AddResponsibilityMatrixProps {
    addedResponsibilities: GetAddedResponsibilitiesResponse[];
    onCancel?(): void;
    onSubmitToUs?(responsibilities: GetAllResponsibilitiesResponse[]): void;
    onSubmitToClient?(responsibilities: GetAllResponsibilitiesResponse[]): void;
}