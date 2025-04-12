import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { NotificationDescItemProps } from "./model";
import moment from "moment";
import getActionAvatar from "../../../helpers/get-action-avatar";
import replaceBoldWithCustomStyles from "../../../helpers/replace-bold-with-custom-styles";
import {
  CustomerUpdateType,
  LeadTrackerAction,
  LeadUpdateType,
} from "../../../modules/sales/enums";
import { LeadType } from "../../enums";
import { useRouter } from "next/router";
import { NotificationType } from "../../model";

function NotificationDescItem({
  container,
  id,
  detailId,
  isViewed,
  message,
  createdDate,
  action,
  messageSeen,
}: NotificationDescItemProps) {
  const router = useRouter();

  const { ref, inView } = useInView({
    root: container.current,
    threshold: 1,
  });

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

  useEffect(() => {
    if (!isViewed && inView) {
      messageSeen?.(id);
    }
  }, [inView]);

  return (
    <div
      onClick={clickHandler}
      ref={ref}
      className="cursor-pointer font-primary w-full flex justify-between items-center gap-3"
    >
      <div>{getActionAvatar(action, "lg")}</div>

      <div className="relative flex-1 flex flex-wrap justify-between gap-3">
        <div className="relative flex flex-col items-start px-1">
          {!isViewed && (
            <span className="absolute top-[15px] -left-[10px] h-[5.5px] w-[5.5px] rounded-full bg-red-700"></span>
          )}

          <span className="text-theme-secondary-700 text-base font-semibold">
            {action}
          </span>

          <span
            dangerouslySetInnerHTML={{
              __html: replaceBoldWithCustomStyles(
                message,
                "font-semibold",
                "b",
                "span"
              ),
            }}
            className={`text-sm py-2 first-letter:capitalize text-theme-secondary`}
          ></span>
        </div>

        <span className="py-2 first-letter:capitalize text-sm whitespace-nowrap font-medium">
          {moment(createdDate).format("DD MMMM YYYY")}
        </span>
      </div>
    </div>
  );
}

export default React.memo(NotificationDescItem);
