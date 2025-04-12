import moment from "moment";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { clock, poppers } from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import { ProcessStatus } from "../../../enums";
import ConversationActions from "../conversation-actions";
import { ProcessUpdatedProps } from "./model";

function ProcessUpdated({ process, loggedOn, onReply }: ProcessUpdatedProps) {
  const [showPoppers, setShowPoppers] = useState(false);

  useEffect(() => {
    if (process?.taskStatus === ProcessStatus.COMPLETED) {
      setShowPoppers(true);

      setTimeout(() => {
        setShowPoppers(false);
      }, 4000);
    }
  }, []);

  return (
    <div className="group/process-updated flex flex-col gap-6 bg-theme-background-elevate rounded-md p-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          {process?.taskStatus === ProcessStatus.TODO && (
            <Icon
              icon={clock}
              size="md"
              theme="secondary"
              className="[&>svg]:!stroke-gray-500"
            />
          )}

          {process?.taskStatus === ProcessStatus.WIP && (
            <Icon
              icon={clock}
              size="md"
              theme="secondary"
              className="[&>svg]:!stroke-[#cd9341]"
            />
          )}

          {process?.taskStatus === ProcessStatus.COMPLETED && (
            <Icon
              icon={poppers}
              size="md"
              theme="secondary"
              iconType="solid"
              className="[&>svg]:!fill-green-600"
            />
          )}
          <h2
            className={`font-medium !text-base ${
              process?.taskStatus === ProcessStatus.TODO
                ? "text-gray-500"
                : process?.taskStatus === ProcessStatus.WIP
                ? "text-[#cd9341]"
                : "text-green-600"
            }`}
          >
            {process?.taskStatus === ProcessStatus.TODO
              ? "Process Updated"
              : process?.taskStatus === ProcessStatus.WIP
              ? "Work in Progress"
              : "Process Completed"}
          </h2>
        </div>

        <div>
          <ConversationActions
            className="invisible group-hover/process-updated:visible"
            onReply={onReply}
          />
        </div>
      </div>

      {showPoppers && <Confetti gravity={3} className="h-full w-full" />}

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-20">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium text-theme-secondary">
              {process.taskName}
            </h3>
            <h3 className="text-theme-secondary-600">
              {process.taskDescription}
            </h3>
          </div>
          <div className="flex flex-col gap-0 whitespace-nowrap">
            {loggedOn && (
              <>
                <h4 className="font-medium">
                  {moment(loggedOn).format("DD MMM")}
                </h4>
                <h4 className="!text-xs">
                  {" "}
                  {moment(loggedOn).format("HH:MM a")}{" "}
                </h4>
              </>
            )}
          </div>
        </div>

        {process?.remarks && (
          <h3 className="text-theme-secondary-600 p-4 bg-theme-button-elevate rounded-md">
            {process.remarks}
          </h3>
        )}
      </div>
    </div>
  );
}

export default ProcessUpdated;
