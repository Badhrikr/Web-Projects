import { GetTasksResponse } from "../../../services/model.response";

export interface ProcessUpdatedProps {
    process: GetTasksResponse & { remarks?: string };
    loggedOn: string;
    onReply?(): void;
}