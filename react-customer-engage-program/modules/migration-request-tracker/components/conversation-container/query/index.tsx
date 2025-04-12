import moment from "moment";
import { clock } from "../../../../../helpers/icons";
import Icon from "../../../../../ui-components/Icon";
import { GetCalendarForMigrationRequestResponse } from "../../../../migration-request-workspace/services/model.response";
import { ConversationTypes } from "../../../enums";
import {
  MigrationRequestFile,
  MigrationRequestProcess,
  MigrationRequestQuery,
} from "../../../model";
import { GetTasksResponse } from "../../../services/model.response";
import ConversationActions from "../conversation-actions";
import FileUploaded from "../file-uploaded";
import MeetingScheduled from "../meeting-scheduled";
import ProcessInitiated from "../process-initiated";
import ProcessUpdated from "../process-updated";
import { QueryProps } from "./model";

function Query({ query, userName, repliedTo, loggedOn, onReply }: QueryProps) {
  const repliedToClickHandler = () => {
    if (!repliedTo) return;

    const element = document.querySelector(`#_${repliedTo?.conversationId}`);
    element?.scrollIntoView();

    element?.classList?.add("animate-blink");
    setTimeout(() => {
      element?.classList?.remove("animate-blink");
    }, 2000);
  };

  return (
    <div className="group/query relative flex flex-col gap-2 p-4 bg-theme-background-elevate rounded-md">
      <div className="flex gap-1 items-center justify-between">
        <div className="flex gap-4 items-center">
          <h4 className="!text-sm font-semibold">{userName ?? "Unknown"}</h4>
          <div className="flex gap-1 items-center">
            <Icon icon={clock} size="sm" theme="secondary" />
            <h4 className="!text-xs text-theme-secondary-500">
              {moment(new Date(loggedOn)).fromNow()}
            </h4>
          </div>
        </div>

        <div>
          <ConversationActions
            className="invisible group-hover/query:visible"
            onReply={onReply}
          />
        </div>
      </div>

      {repliedTo && (
        <div
          onClick={repliedToClickHandler}
          className="my-2 cursor-pointer relative overflow-hidden text-ellipsis origin-top-left scale-[0.90]"
        >
          <div className="w-[2px] h-full absolute bg-gray-400 z-10 left-0" />
          <div className="pointer-events-none [&>div]:!py-4 [&>div]:bg-theme-button-elevate">
            {repliedTo.conversationType === ConversationTypes.QUERY && (
              <Query
                userName={repliedTo.userName}
                loggedOn={repliedTo.loggedOn}
                query={repliedTo?.data as MigrationRequestQuery}
              />
            )}

            {repliedTo.conversationType ===
              ConversationTypes.PROCESS_INITIATED && (
              <ProcessInitiated
                process={repliedTo.data as MigrationRequestProcess}
              />
            )}

            {repliedTo.conversationType ===
              ConversationTypes.PROCESS_UPDATED && (
              <ProcessUpdated
                loggedOn={repliedTo.loggedOn}
                process={repliedTo.data as GetTasksResponse}
              />
            )}

            {repliedTo.conversationType === ConversationTypes.FILE_UPLOAD && (
              <FileUploaded
                migrationRequestId={""}
                loggedOn={repliedTo.loggedOn}
                files={repliedTo.data as MigrationRequestFile[]}
                userName={repliedTo?.userName}
              />
            )}

            {repliedTo.conversationType === ConversationTypes.MEETING && (
              <MeetingScheduled
                {...(repliedTo.data as GetCalendarForMigrationRequestResponse)}
                loggedOn={repliedTo.loggedOn}
              />
            )}
          </div>
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: query?.message ?? "" }}></div>
    </div>
  );
}

export default Query;
