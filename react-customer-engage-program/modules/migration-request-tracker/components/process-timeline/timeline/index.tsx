import moment from "moment";
import { clock, poppers } from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import { ProcessStatus } from "../../../enums";
import { GetTimelineResponse } from "../../../services/model.response";

function Timeline({ taskName, taskStatus, loggedTime }: GetTimelineResponse) {
  return (
    <div className="flex items-center justify-between relative">
      <div className="flex gap-2 items-center">
        {taskStatus === ProcessStatus.TODO && (
          <div className="h-[30px] w-[30px] rounded-full flex-center-center bg-gray-500">
            <Icon icon={clock} size="md" theme="primary" />
          </div>
        )}

        {taskStatus === ProcessStatus.WIP && (
          <div className="h-[30px] w-[30px] rounded-full flex-center-center bg-[rgb(205,147,65)]">
            <Icon icon={clock} size="md" theme="primary" />
          </div>
        )}

        {taskStatus === ProcessStatus.COMPLETED && (
          <div className="h-[30px] w-[30px] rounded-full flex-center-center bg-green-500">
            <Icon icon={poppers} size="md" theme="primary" iconType="solid" />
          </div>
        )}

        <h4 className="text-theme-secondary text-sm"> {taskName} </h4>
      </div>

      <h5 className="text-theme-secondary-500 font-semibold text-sm">
        {loggedTime ? moment(new Date(loggedTime)).format("DD MMM") : "-"}
      </h5>
    </div>
  );
}

export default Timeline;
