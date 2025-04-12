import { LeadTrackerAction } from "../modules/sales/enums";
import Icon from "../ui-components/Icon";
import getActionAvatar from "./get-action-avatar";
import {
  clock
} from "./icons";

const waitingIcon = (
  <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(255,255,0,0.15)]">
    <Icon
      icon={clock}
      size="lg"
      theme="secondary"
      className="[&>svg]:!stroke-[#848e12]  [&>svg]:h-8 [&>svg]:w-8"
    />
  </div>
);

function getLeadTrackerData(action: LeadTrackerAction) {
  return leadTrackerConfig[action] ?? leadTrackerConfig[LeadTrackerAction.NEW];
}

const leadTrackerConfig: Record<LeadTrackerAction, any> = {
  [LeadTrackerAction.NEW]: {
    actionLabel: "Lead Created",
    datakey: "action",
    hasWaitingMessage: true,
    waitingIcon,
    waitingMessage: "Waiting to Assign",
    showComments: true,
    icon: (
      <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(0,127,126,0.15)]">
        {getActionAvatar(LeadTrackerAction.NEW, "xl")}
      </div>
    ),
  },
  [LeadTrackerAction.ACTIVE]: {
    actionLabel: "",
    datakey: "createdBy",
    showComments: true,
    icon: (
      <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(69,142,255,0.25)]">
        {getActionAvatar(LeadTrackerAction.ACTIVE, "xl")}
      </div>
    ),
  },
  [LeadTrackerAction.ASSIGNED_BY]: {
    actionLabel: "Assigned by",
    datakey: "createdBy",
    hasWaitingMessage: true,
    waitingMessage: "Waiting to Qualify/Disqualify",
    waitingIcon,
    icon: (
      <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(69,142,255,0.25)]">
        {getActionAvatar(LeadTrackerAction.ASSIGNED_BY, "xl")}
      </div>
    ),
  },
  [LeadTrackerAction.ASSIGNED_TO]: {
    actionLabel: "Assigned To",
    datakey: "assignedTo",
    icon: (
      <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(69,142,255,0.25)]">
        {getActionAvatar(LeadTrackerAction.ACTIVE, "xl")}
      </div>
    ),
  },
  [LeadTrackerAction.QUALIFIED]: {
    actionLabel: "Qualified by",
    datakey: "createdBy",
    showComments: true,
    icon: (
      <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(0,127,126,0.15)]">
        {getActionAvatar(LeadTrackerAction.QUALIFIED, "xl")}
      </div>
    ),
  },
  [LeadTrackerAction.INACTIVE]: {
    actionLabel: "Disqualified by",
    datakey: "createdBy",
    showComments: true,
    icon: (
      <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(139,0,0,0.2)]">
        {getActionAvatar(LeadTrackerAction.INACTIVE, "xl")}
      </div>
    ),
  },
  [LeadTrackerAction.DISQUALIFIED]: {
    actionLabel: "Disqualified by",
    datakey: "createdBy",
    showComments: true,
    icon: (
      <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(139,0,0,0.2)]">
        {getActionAvatar(LeadTrackerAction.INACTIVE, "xl")}
      </div>
    ),
  },
  [LeadTrackerAction.FOLLOW_UP]: {
    actionLabel: "Follow up",
    datakey: "followUpDate",
    showComments: true,
    isDateField: true,
    icon: (
      <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(69,142,255,0.25)]">
        {getActionAvatar(LeadTrackerAction.FOLLOW_UP, "xl")}
      </div>
    ),
  },
  [LeadTrackerAction.LEAD_STATUS]: {
    actionLabel: "Follow up",
    datakey: "followUpDate",
    showComments: true,
    isDateField: true,
    icon: (
      <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(69,142,255,0.25)]">
        {getActionAvatar(LeadTrackerAction.FOLLOW_UP, "xl")}
      </div>
    ),
  },
  [LeadTrackerAction.CLOSED]: {
    actionLabel: "Closed by",
    datakey: "createdBy",
    showComments: true,
    icon: (
      <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(69,142,255,0.25)]">
        {getActionAvatar(LeadTrackerAction.ACTIVE, "xl")}
      </div>
    ),
  },
  [LeadTrackerAction.LEAD_DETAILS_UPDATE]: {
    actionLabel: "Details Updated by",
    datakey: "createdBy",
    showComments: true,
    icon: (
      <div className="h-[60px] w-[60px] rounded-full flex-center-center bg-[rgba(69,142,255,0.25)]">
        {getActionAvatar(LeadTrackerAction.LEAD_DETAILS_UPDATE, "xl")}
      </div>
    ),
  },
};

export { getLeadTrackerData, leadTrackerConfig, waitingIcon };

