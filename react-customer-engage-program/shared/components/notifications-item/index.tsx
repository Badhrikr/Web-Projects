import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import getActionAvatar from "../../../helpers/get-action-avatar";
import replaceBoldWithCustomStyles from "../../../helpers/replace-bold-with-custom-styles";
import {
  CustomerUpdateType,
  LeadTrackerAction,
  LeadUpdateType,
} from "../../../modules/sales/enums";
import { LeadType } from "../../enums";
import { NotificationType } from "../../model";
import { NotificationItemProps } from "./model";

function NotificationsItem({
  container,
  id,
  isViewed,
  createdDate,
  action,
  message,
  detailId,
  messageSeen,
}: NotificationItemProps) {
  const router = useRouter();

  const { ref, inView } = useInView({
    root: container.current,
    threshold: 1,
  });

  useEffect(() => {
    if (action === "Welcome" || (!isViewed && inView)) {
      messageSeen?.(id, action);
    }
  }, [inView]);

  const getDate = (date: Date) => {
    return new Date().toDateString() === date.toDateString()
      ? moment(date).fromNow()
      : moment(date).format("DD MMM");
  };

  const clickHandler = () => {
    const leadValues: Array<NotificationType> = [
      ...Object.values(LeadTrackerAction),
      ...Object.values(LeadType),
      ...Object.values(LeadUpdateType),
    ];

    const customerValues: Array<NotificationType> = [
      ...Object.values(CustomerUpdateType),
    ];

    const isLead = leadValues.includes(action);
    if (isLead && detailId) {
      router.push(`/sales/leads/${detailId}`);
      return;
    }

    const isCustomer = customerValues.includes(action as CustomerUpdateType);
    if (isCustomer && detailId) {
      router.push(`/sales/customers/${detailId}`);
      return;
    }
  };

  return (
    <div
      ref={ref}
      onClick={clickHandler}
      className="cursor-pointer font-primary w-full flex justify-between items-center gap-2 relative"
    >
      {!isViewed && (
        <div className="absolute -left-[10px] h-[5.5px] w-[5.5px] rounded-full bg-red-800"></div>
      )}

      <div className="grid place-content-center">
        {getActionAvatar(action, "lg")}
      </div>

      <div className="relative flex-1 flex justify-between gap-3">
        <div className="relative flex items-center gap-1 px-1">
          <span
            dangerouslySetInnerHTML={{
              __html: replaceBoldWithCustomStyles(
                message,
                "font-[505]",
                "b",
                "span"
              ),
            }}
            className={`text-[0.9rem] py-2 first-letter:capitalize text-theme-secondary`}
          ></span>
        </div>

        <span className="py-2 first-letter:capitalize text-sm whitespace-nowrap font-medium text-theme-secondary-550">
          {getDate(new Date(createdDate))}
        </span>
      </div>
    </div>
  );
}

const NotificationsItemMemo = React.memo(NotificationsItem);
export default NotificationsItemMemo;
