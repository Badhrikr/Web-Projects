import moment from "moment";
import React from "react";
import {
  bell,
  calendar,
  clock,
  date,
  user,
} from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import ConversationActions from "../conversation-actions";
import { MeetingScheduledProps } from "./model";

function MeetingScheduled({
  agenda,
  description,
  startDate,
  endDate,
  loggedOn,
  createdBy,
  onReply,
}: MeetingScheduledProps) {
  return (
    <div className="flex flex-col gap-6 p-4 rounded-md group/meeting-scheduled bg-theme-background-elevate">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Icon
              icon={calendar}
              theme="secondary"
              size="md"
              iconType="solid"
              className="[&>svg]:!fill-[#3a96d3]"
            />
            <h2 className="font-medium !text-base text-[#3a96d3]">Meeting</h2>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon={clock} size="sm" theme="secondary" />
            <h4 className="!text-xs text-theme-secondary-500">
              {moment(new Date(loggedOn)).fromNow()}
            </h4>
          </div>
        </div>
        <div>
          <ConversationActions
            className="invisible group-hover/meeting-scheduled:visible"
            onReply={onReply}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium text-theme-secondary">
              {agenda ?? "Unknown"}
            </h3>
            <h5 className="text-sm text-theme-secondary-550">
              {moment(startDate).format("DD MMM YYYY")} &nbsp;&nbsp;&nbsp;
              {moment(startDate).format("HH:MM")}
              {" - "}
              {moment(endDate).format("HH:MM")}
            </h5>
          </div>
        </div>

        <h3 className="min-w-[50ch] max-w-full text-theme-secondary-600 p-4 w-full bg-theme-button-elevate rounded-md">
          {description}
        </h3>

        <div className="flex items-center gap-2">
          <Icon icon={user} theme="secondary" size="sm" />
          <div>
            <h5 className="text-sm font-medium text-theme-secondary">
              {createdBy}
            </h5>
            <h6 className="text-xs text-theme-secondary-650">(organiser)</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingScheduled;
