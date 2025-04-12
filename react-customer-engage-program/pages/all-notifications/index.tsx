import { useKeycloak } from "@react-keycloak/web";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Ripples from "react-ripples";
import { arrow_left } from "../../helpers/icons";
import Connector from "../../signalR/signalRconnection";
import HomeLayout from "../../layouts/home-layout";
import NotificationDescItem from "../../shared/components/notification-desc-item";
import { NotificationObject } from "../../shared/model";
import * as SharedServices from "../../shared/services";
import { GetNotificationsResponse } from "../../shared/services/model.response";
import Icon from "../../ui-components/Icon";
import IconButton from "../../ui-components/IconButton";
import Loading from "../../ui-components/Loading";
import { ReceiveMessageforSpecificRole } from "../../signalR/model";

function AllNotificationsPage() {
  const { events, removeEvents } = Connector();
  const { keycloak, initialized } = useKeycloak();

  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<
    Array<GetNotificationsResponse>
  >([]);
  const [seenNotifications, setSeenNotifications] = useState<Array<string>>([]);

  const router = useRouter();
  const notificationContainer = useRef(null);

  const fetchSuccess = (response: Array<GetNotificationsResponse>) => {
    setNotifications(response);
    setLoading(false);
  };

  const fetchError = () => {
    setLoading(false);
  };

  const notificationSetViewedSuccess = () => {
    setLoading(false);
    getNotificationByUser();
  };

  const getNotificationByUser = () => {
    SharedServices.GetNotificationByUser({
      email: keycloak?.tokenParsed?.email ?? "",
      success: fetchSuccess,
      error: fetchError,
    });
  };

  const messageSeenHandler = (id: string) => {
    setSeenNotifications((prevSeenNotifications) => {
      return Array.from(new Set([...prevSeenNotifications, id]));
    });
  };

  const markAllAsRead = () => {
    setLoading(true);

    SharedServices.MarkNotificationsViewed({
      ids: notifications.map((notification) => notification?.id)?.join(","),
      email: keycloak?.tokenParsed?.email,
      success: notificationSetViewedSuccess,
    });
  };

  const markSeenAsRead = () => {
    if (seenNotifications.length === 0) return;

    SharedServices.MarkNotificationsViewed({
      ids: seenNotifications.join(","),
      email: keycloak?.tokenParsed?.email,
      success: notificationSetViewedSuccess,
    });
  };

  const markAllAsReadHandler = () => {
    if (notifications.length > 0) {
      markAllAsRead();
    }
  };

  const receiveMessage = ({ notification }: ReceiveMessageforSpecificRole) => {
    const notificationObject: NotificationObject = JSON.parse(
      notification
    ) as NotificationObject;

    // setNotifications((prevNotifications) => {
    //   return [
    //     {
    //       ...notificationObject,
    //       createdDate: new Date().toDateString(),
    //     },
    //     ...prevNotifications,
    //   ];
    // });
  };

  useEffect(() => {
    if (initialized && keycloak?.authenticated) {
      getNotificationByUser();
    }
  }, [initialized]);

  useEffect(() => {
    events(receiveMessage, receiveMessage);

    return () => {
      removeEvents(receiveMessage, receiveMessage);
    };
  }, []);

  return (
    <div ref={notificationContainer} className="flex justify-center pt-10">
      <div>
        <IconButton
          size="md"
          theme="secondary"
          buttonThemeStyle="ghost"
          className="mt-[10px]"
          onClick={() => router.back()}
        >
          <Icon icon={arrow_left} size="md" theme="secondary" />
        </IconButton>
      </div>

      <div className="w-[55%]">
        <div className="flex justify-between items-center w-full p-4">
          <div className="flex items-center gap-1">
            <h4 className="font-secondary text-lg text-theme-secondary font-semibold">
              All Notifications
            </h4>
          </div>

          <Ripples onClick={() => !loading && markAllAsReadHandler()}>
            <span className="text-[#007F7E] p-1 cursor-pointer whitespace-nowrap font-semibold text-base">
              Mark all as read
            </span>
          </Ripples>
        </div>

        {loading && (
          <div className="h-[65vh] w-full flex justify-center items-center gap-2">
            <Loading size="xl" theme="secondary" />
            <span className="text-theme-secondary">Loading..</span>
          </div>
        )}

        {!loading && (
          <div className="z-50 p-4 mt-1 flex flex-col gap-8 text-theme-secondary">
            {notifications?.map?.((notification, index) => (
              <NotificationDescItem
                key={index}
                container={notificationContainer}
                messageSeen={messageSeenHandler}
                {...notification}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

AllNotificationsPage.PageLayout = HomeLayout;
export default AllNotificationsPage;
