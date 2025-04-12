import { LeadTrackerAction } from "../modules/sales/enums";
import { LeadType } from "../shared/enums";
import { NotificationType } from "../shared/model";
import Icon from "../ui-components/Icon";
import { Size } from "../ui-components/model";
import {
  callback_request,
  cancel_circle,
  cloud_clock,
  content_viewed,
  date,
  demo_request,
  tick_circle,
  update_icon,
  user_pad,
} from "./icons";

function getActionAvatar(action: NotificationType, size: Size = "md") {
  switch (action) {
    case LeadType.DEMO_REQUEST:
      return (
        <Icon
          icon={demo_request}
          size={size}
          theme="primary"
          className="[&>svg]:!fill-[#37C6FF]"
          iconType="solid"
        />
      );
    case LeadType.CALLBACK_REQUEST:
      return (
        <Icon
          icon={callback_request}
          size={size}
          theme="primary"
          className="[&>svg]:!stroke-[#458EFF]"
          iconType="outline"
        />
      );
    case LeadType.CONTENT_VIEW:
      return (
        <Icon
          icon={content_viewed}
          size={size}
          theme="primary"
          className="[&>svg]:!stroke-[#25CD5E]"
        />
      );
    case LeadTrackerAction.NEW:
      return (
        <Icon
          icon={cloud_clock}
          size={size}
          theme="secondary"
          iconType="solid"
          className="[&>svg]:!fill-[#007F7E]"
        />
      );
    case LeadTrackerAction.ACTIVE:
    case LeadTrackerAction.ASSIGNED_TO:
    case LeadTrackerAction.CLOSED:
      return (
        <Icon
          icon={tick_circle}
          size={size}
          theme="secondary"
          className="[&>svg]:!stroke-[#458EFF] "
        />
      );
    case LeadTrackerAction.QUALIFIED:
      return (
        <Icon
          icon={tick_circle}
          size={size}
          theme="secondary"
          className="[&>svg]:!stroke-[#007F7E] "
        />
      );
    case LeadTrackerAction.INACTIVE:
    case LeadTrackerAction.DISQUALIFIED:
      return (
        <Icon
          icon={cancel_circle}
          size={size}
          theme="secondary"
          className="[&>svg]:!stroke-[rgb(139,0,0)]"
        />
      );
    case LeadTrackerAction.LEAD_STATUS:
    case LeadTrackerAction.FOLLOW_UP:
      return (
        <Icon
          icon={date}
          size={size}
          theme="secondary"
          className="[&>svg]:!stroke-[#458EFF] "
        />
      );
    case LeadTrackerAction.ASSIGNED_BY:
      return (
        <Icon
          icon={user_pad}
          size={size}
          theme="secondary"
          iconType="solid"
          className="[&>svg]:!fill-[#458EFF]"
        />
      );
    case LeadTrackerAction.LEAD_DETAILS_UPDATE:
      return (
        <Icon
          icon={update_icon}
          size={size}
          theme="secondary"
          iconType="solid"
          className="[&>svg]:!fill-[#458EFF]"
        />
      );
    default:
      return (
        <Icon
          icon={tick_circle}
          size={size}
          theme="secondary"
          className="[&>svg]:!stroke-[#458EFF] "
        />
      );
  }
}

export default getActionAvatar;
