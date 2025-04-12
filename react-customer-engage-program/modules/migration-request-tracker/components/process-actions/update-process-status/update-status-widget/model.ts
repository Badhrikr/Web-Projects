import { GetTasksResponse } from "../../../../services/model.response";

export interface UpdateStatusWidgetProps extends GetTasksResponse {
    migrationRequestId: string;
    onClose?(): void;
    onSubmit?(): void;
}