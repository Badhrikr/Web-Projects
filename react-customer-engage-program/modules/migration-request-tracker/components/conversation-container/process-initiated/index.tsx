import moment from "moment";
import { bell } from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import ConversationActions from "../conversation-actions";
import { ProcessInitiatedProps } from "./model";

function ProcessInitiated({
  process,
  loggedOn,
  onReply,
}: ProcessInitiatedProps) {
  return (
    <div className="group/process-initiated flex flex-col gap-6 bg-theme-background-elevate rounded-md p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Icon
            icon={bell}
            theme="secondary"
            size="md"
            className="[&>svg]:!stroke-green-600"
          />
          <h2 className="font-medium !text-base text-green-600">
            Process Initiated
          </h2>
        </div>
        <div>
          <ConversationActions
            className="invisible group-hover/process-initiated:visible"
            onReply={onReply}
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-20">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium text-theme-secondary">{process.title}</h3>
          <h3 className="text-theme-secondary-600">{process.desc}</h3>
        </div>
        <div className="flex flex-col gap-0">
          {loggedOn && (
            <>
              <h4 className="font-medium">
                {moment(new Date(loggedOn)).format("DD MMM")}
              </h4>
              <h4 className="!text-xs">
                {" "}
                {moment(new Date(loggedOn)).format("HH:MM a")}{" "}
              </h4>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProcessInitiated;
