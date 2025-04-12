import { RefObject } from "react";
import { GetNotificationsResponse } from "../../services/model.response";

interface NotificationDescItemProps extends GetNotificationsResponse {
    container: RefObject<any>;
    messageSeen?(id?: string): void;
}

export type { NotificationDescItemProps }