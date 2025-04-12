import { NotificationType } from "../../model";
import { GetNotificationsResponse } from "../../services/model.response";

interface NotificationItemProps extends GetNotificationsResponse {
    container: React.RefObject<any>;
    messageSeen?(id: string, action: NotificationType): void;
}

export type { NotificationItemProps };

