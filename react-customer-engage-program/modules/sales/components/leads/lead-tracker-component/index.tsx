import moment from "moment";
import { getLeadTrackerData } from "../../../../../helpers/lead-tracker";
import { LeadTrackerComponentProps } from "./model";

function LeadTrackerComponent({
  index,
  trackerListLength,
  ...tracker
}: LeadTrackerComponentProps) {
  const {
    icon,
    actionLabel,
    datakey,
    isDateField,
    hasWaitingMessage,
    waitingMessage,
    waitingIcon,
    showComments,
  } = getLeadTrackerData(tracker.action);

  return (
    <>
      {index === 0 && hasWaitingMessage && (
        <div className="flex justify-between gap-4">
          <div className="flex gap-4 items-center">
            <div
              className={`rounded-full bg-theme-background-primary self-start`}
            >
              {waitingIcon}
            </div>
            <div>
              <h5 className="text-theme-secondary-600 text-base font-medium ">
                {waitingMessage}
              </h5>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between gap-20">
        <div className="flex gap-4 items-center">
          <div
            className={`rounded-full bg-theme-background-primary ${
              index === trackerListLength - 1 ? "self-end" : "self-start"
            }`}
          >
            {icon}
          </div>
          <div>
            <h5 className="text-theme-secondary-600 text-base ">
              {actionLabel}
            </h5>
            <h5 className="text-theme-secondary font-medium capitalize">
              {isDateField
                ? moment((tracker as any)[datakey]).format("DD MMM YYYY")
                : (tracker as any)[datakey]}
            </h5>
            {showComments && (
              <h5 className="text-theme-secondary-600 text-sm mt-1 leading-6">
                {tracker.comments}
              </h5>
            )}
          </div>
        </div>

        <div className="text-theme-secondary font-medium  whitespace-nowrap text-sm">
          <p>{moment(tracker.createdDate).format("DD MMM YYYY")}</p>
          <p className="text-xs text-right text-theme-secondary-500">
            {moment(tracker.createdDate).format("hh:mm a")}
          </p>
        </div>
      </div>
    </>
  );
}

export default LeadTrackerComponent;
