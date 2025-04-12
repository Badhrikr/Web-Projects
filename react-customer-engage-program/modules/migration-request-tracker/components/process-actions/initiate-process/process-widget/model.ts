import { GetTasksResponse } from "../../../../services/model.response";

export interface ProcessProps extends GetTasksResponse {
    migrationRequestId: string;
    onSubmit?(): void;
} 