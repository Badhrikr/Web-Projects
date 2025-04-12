import { GetCalendarForMigrationRequestResponse } from "../../../../migration-request-workspace/services/model.response";

export interface MeetingScheduledProps extends GetCalendarForMigrationRequestResponse {
    loggedOn: string;
    onReply?(): void;
}