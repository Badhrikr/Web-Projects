import { Event } from "react-big-calendar";
import { GetCalendarForMigrationRequestResponse } from "../../../modules/migration-request-workspace/services/model.response";

export interface MyEvent extends Event {
    data?: GetCalendarForMigrationRequestResponse;
}