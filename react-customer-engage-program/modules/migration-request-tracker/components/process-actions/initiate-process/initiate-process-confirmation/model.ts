import { GetTasksResponse } from "../../../../services/model.response";

export interface InitiateProcessConfirmationProps extends GetTasksResponse {
    migrationRequestId: string;
    onClose?(): void;
    onSubmit?(): void;
}