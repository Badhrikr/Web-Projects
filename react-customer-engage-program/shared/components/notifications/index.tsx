import { useKeycloak } from "@react-keycloak/web";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Ripples from "react-ripples";
import { toast } from "react-toastify";
import { CSSTransition } from "react-transition-group";
import { bell } from "../../../helpers/icons";
import isBrowser from "../../../helpers/is-browser";
import useOutsideClick from "../../../hooks/use-outside-click";
import { ReceiveMessageforSpecificRole } from "../../../signalR/model";
import Connector from "../../../signalR/signalRconnection";
import Button from "../../../ui-components/Button";
import Icon from "../../../ui-components/Icon";
import IconButton from "../../../ui-components/IconButton";
import Loading from "../../../ui-components/Loading";
import { ApplicationRoles, LeadType } from "../../enums";
import { NotificationObject } from "../../model";
import * as Services from "../../services";
import { GetNotificationsResponse } from "../../services/model.response";
import NotificationsItem from "../notifications-item";
import { NotificationsProps } from "./model";

const localStorageKey = "welcome-message";

function Notifications() {
  const { initialized, keycloak } = useKeycloak();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { events, removeEvents } = Connector();

  const [notificationsContainerRef] = useOutsideClick(
    () => setShowNotifications(false),
    { closeOnEsc: true }
  );

  const [notifications, setNotifications] = useState<Array<NotificationsProps>>(
    []
  );

  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [seenNotifications, setSeenNotifications] = useState<Array<string>>([]);

  const notificationContainer = useRef(null);

  const notificationsToggle = () => {
    setShowNotifications(!showNotifications);
  };

  const notificationFetchSuccess = (
    response: Array<GetNotificationsResponse>
  ) => {
    setLoading(false);
    setNotifications(response ?? []);
  };

  const messageSeenHandler = (id: string, action: LeadType) => {
    if (action === LeadType.WELCOME) {
      const data = JSON.parse(localStorage.getItem(localStorageKey) ?? "{}");
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ ...data, isread: true })
      );
      setUnreadNotificationsCount(0);
      return;
    }

    setSeenNotifications((prevSeenNotifications) => {
      return Array.from(new Set([...prevSeenNotifications, id]));
    });
  };

  const getLocalStorageDate = () => {
    if (!isBrowser()) return;

    let localStorageData = localStorage.getItem(localStorageKey);
    if (localStorageData) {
      return JSON.parse(localStorageData).date;
    }

    const now = new Date().toString();
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ date: new Date().toString(), isread: false })
    );
    return now;
  };

  const notificationSetViewedSuccess = () => {
    setLoading(false);
    getNotificationByUser();
  };

  const markAllAsReadHandler = () => {
    if (notifications.length > 0) {
      markAllAsRead();
    }
  };

  const getNotificationByUser = () => {
    Services.GetNotificationByUser({
      email: keycloak?.tokenParsed?.email ?? "",
      success: notificationFetchSuccess,
    });
  };

  const markSeenAsRead = () => {
    setLoading(true);

    Services.MarkNotificationsViewed({
      ids: seenNotifications.join(","),
      email: keycloak?.tokenParsed?.email,
      success: notificationSetViewedSuccess,
    });
  };

  const markAllAsRead = () => {
    setLoading(true);

    Services.MarkNotificationsViewed({
      ids: notifications.map((notification) => notification?.id)?.join(","),
      email: keycloak?.tokenParsed?.email,
      success: notificationSetViewedSuccess,
    });
  };

  const isWelcomeMessageSeen = () => {
    try {
      const localStorageData = JSON.parse(
        localStorage.getItem(localStorageKey) ?? "{}"
      );
      return localStorageData.isread === true;
    } catch (err) {
      return false;
    }
  };

  const setWelcomeMessage = () => {
    setNotifications([
      {
        id: "",
        message: "<b>Hi there</b>, Welcome to <b>Kumaran</b> world",
        role: ApplicationRoles.CUSTOMER,
        action: LeadType.WELCOME,
        createdDate: getLocalStorageDate(),
        isViewed: isWelcomeMessageSeen(),
      },
    ]);

    try {
      const localStorageData = JSON.parse(
        localStorage.getItem(localStorageKey) ?? "{}"
      );
      setUnreadNotificationsCount(localStorageData.isread === true ? 0 : 1);
    } catch (err) {}
  };

  let receiveMessage = ({
    message,
    notification,
  }: ReceiveMessageforSpecificRole) => {
    // toast(message, {
    //   type: "info",
    //   hideProgressBar: true,
    // });

    // const notificationObject: NotificationObject = JSON.parse(
    //   notification
    // ) as NotificationObject;

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
    events(receiveMessage, receiveMessage);

    return () => {
      removeEvents(receiveMessage, receiveMessage);
    };
  }, []);

  useEffect(() => {
    if (showNotifications === false && seenNotifications?.length > 0) {
      markSeenAsRead();
    }
  }, [showNotifications]);

  useEffect(() => {
    if (!initialized) return;

    if (keycloak.authenticated) {
      getNotificationByUser();
      return;
    }

    setWelcomeMessage();
  }, [initialized]);

  useEffect(() => {
    setUnreadNotificationsCount(() => {
      let count = 0;
      notifications.forEach((notification) => {
        count = notification.isViewed ? count : count + 1;
      });
      return count;
    });
  }, [notifications]);

  useEffect(() => {
    setShowNotifications(false);
  }, [router.asPath]);

  return (
    <div ref={notificationsContainerRef}>
      <div className="relative">
        <IconButton
          size="sm"
          theme="secondary"
          buttonThemeStyle="ghost"
          onClick={notificationsToggle}
        >
          <Icon icon={bell} size="md" theme="primary" />
        </IconButton>

        {unreadNotificationsCount > 0 && (
          <span className="-top-1 -right-1 absolute bg-red-700 text-theme-primary grid place-content-center text-sm h-[15px] w-[15px] rounded-full">
            {unreadNotificationsCount}
          </span>
        )}
      </div>

      <CSSTransition
        in={showNotifications}
        timeout={300}
        classNames="fly"
        unmountOnExit
      >
        <div className="z-50 absolute top-10 -right-1 shadow-lg bg-theme-background-popup rounded-md min-w-[450px]">
          <div className="flex justify-between items-center w-full p-4">
            <div className="flex flex-col">
              <h4 className="text-theme-secondary font-semibold">
                Notifications
              </h4>
            </div>

            {keycloak?.authenticated && unreadNotificationsCount > 0 && (
              <Ripples onClick={() => !loading && markAllAsReadHandler()}>
                <span className="text-[#007F7E] p-1 cursor-pointer whitespace-nowrap font-semibold text-sm">
                  Mark all as read
                </span>
              </Ripples>
            )}
          </div>

          <div
            ref={notificationContainer}
            className="z-50 p-4 mt-1 flex flex-col gap-4 text-theme-secondary max-h-[300px] overflow-auto"
          >
            {notifications?.map?.((notification, key) => (
              <NotificationsItem
                key={key}
                container={notificationContainer}
                messageSeen={messageSeenHandler}
                {...notification}
              />
            ))}
          </div>

          {!loading &&
            keycloak?.authenticated &&
            notifications.length === 0 && (
              <div className="px-1 py-4 text-center">
                No notifications received yet
              </div>
            )}

          {!loading && notifications.length > 0 && keycloak.authenticated && (
            <div className="py-3 text-center text-sm cursor-pointer font-semibold ">
              <Button
                size="md"
                theme="secondary"
                className="text-[#007F7E]"
                buttonThemeStyle="ghost"
                onClick={() => {
                  notificationsToggle();
                  router.push("/all-notifications");
                }}
              >
                View All
              </Button>
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 z-50 flex justify-center items-center">
              <Loading size="md" theme="primary" />
            </div>
          )}
        </div>
      </CSSTransition>
    </div>
  );
}

export default Notifications;
