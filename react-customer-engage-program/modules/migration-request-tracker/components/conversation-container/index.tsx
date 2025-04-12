import React, { useEffect, useState } from "react";
import { cancel } from "../../../../helpers/icons";
import useLogin from "../../../../hooks/use-login";
import { NotificationObject } from "../../../../shared/model";
import { ReceiveMessageforSpecificRole } from "../../../../signalR/model";
import Connector from "../../../../signalR/signalRconnection";
import Icon from "../../../../ui-components/Icon";
import IconButton from "../../../../ui-components/IconButton";
import { ChosenMigrationRequestType } from "../../../customer-workspace/components/create-migration-request/migration-request-type";
import { ChosenMigrationType } from "../../../customer-workspace/components/create-migration-request/migration-type";
import {
  GetOfferingTypesResponse,
  GetOfferingsResponse,
} from "../../../customer-workspace/services/model.response";
import { GetCalendarForMigrationRequestResponse } from "../../../migration-request-workspace/services/model.response";
import { ConversationTypes } from "../../enums";
import {
  MigrationRequestFile,
  MigrationRequestProcess,
  MigrationRequestQuery,
  MigrationRequestTechnologies,
} from "../../model";
import * as Services from "../../services";
import {
  GetConversationResponse,
  GetTasksResponse
} from "../../services/model.response";
import MessageBox from "../message-box";
import ConversationLogo from "./conversation-logo";
import FileUploaded from "./file-uploaded";
import MeetingScheduled from "./meeting-scheduled";
import { ConversationContainerProps } from "./model";
import ProcessInitiated from "./process-initiated";
import ProcessUpdated from "./process-updated";
import Query from "./query";
import TechnologiesTable from "./technologies";

function ConversationContainer({
  migrationRequestId,
  readOnlyAccess = false,
}: ConversationContainerProps) {
  const { events, removeEvents } = Connector();

  const [conversations, setConversations] = useState<GetConversationResponse[]>(
    []
  );
  const [replyTo, setReplyTo] = useState<GetConversationResponse | undefined>();

  const messageSendHandler = (newMessage: string) => {
    Services.PostQuery({
      message: newMessage,
      migrationRequestId,
      repliedTo: replyTo?.conversationId ?? "",
      success: () => {
        setReplyTo(undefined);
      },
    });
  };

  const fetchSuccess = (response: GetConversationResponse[]) => {
    if (!(response instanceof Array)) return;
    setConversations(response);
  };

  const fetchError = () => {};

  const getConversation = () => {
    Services.GetConversation({
      migrationRequestId,
      success: fetchSuccess,
      error: fetchError,
    });
  };

  const receiveMessage = ({
    notification,
    data,
  }: ReceiveMessageforSpecificRole) => {
    const { action, detailId }: NotificationObject =
      JSON.parse(notification) ?? {};

    console.log(action, detailId, JSON.parse(data));

    if (action === "Conversation" && detailId === migrationRequestId) {
      setConversations((prev) => [
        JSON.parse(data) as GetConversationResponse,
        ...prev,
      ]);
    }
  };

  useEffect(() => {
    getConversation();

    events(() => {}, receiveMessage);

    return () => {
      removeEvents(() => {}, receiveMessage);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="pl-20 py-2 flex-1 overflow-auto flex flex-col-reverse gap-5 !text-sm relative">
        {conversations.map((convo) => (
          <div
            id={`_${convo.conversationId}`}
            className={`flex rounded-md text-theme-secondary`}
            key={convo.conversationId}
          >
            {convo?.conversationType ===
              ConversationTypes.CHOSEN_MIGRATION_REQUEST && (
              <div className="max-w-[70%]">
                <ChosenMigrationRequestType
                  migrationRequestType={convo.data as GetOfferingsResponse}
                />
              </div>
            )}

            {convo?.conversationType ===
              ConversationTypes.CHOSEN_MIGRATION_TYPE && (
              <div className="max-w-[70%]">
                <ChosenMigrationType
                  migrationType={convo.data as GetOfferingTypesResponse}
                />
              </div>
            )}

            {convo?.conversationType === ConversationTypes.TECHNOLOGIES && (
              <div className="max-w-[70%]">
                <TechnologiesTable
                  technologies={convo.data as MigrationRequestTechnologies[]}
                />
              </div>
            )}

            {convo?.conversationType ===
              ConversationTypes.PROCESS_INITIATED && (
              <div className="max-w-[70%]">
                <ProcessInitiated
                  process={convo.data as MigrationRequestProcess}
                  loggedOn={convo.loggedOn}
                  onReply={() => setReplyTo(convo)}
                />
              </div>
            )}

            {convo?.conversationType === ConversationTypes.PROCESS_UPDATED && (
              <div className="max-w-[70%]">
                <ProcessUpdated
                  process={convo.data as GetTasksResponse}
                  loggedOn={convo.loggedOn}
                  onReply={() => setReplyTo(convo)}
                />
              </div>
            )}

            {convo?.conversationType === ConversationTypes.FILE_UPLOAD && (
              <div className="max-w-[70%] relative">
                <div className="absolute -left-10 top-4">
                  <ConversationLogo
                    showDefault={convo.customerId ? false : true}
                    userName={convo.userName}
                  />
                </div>

                <FileUploaded
                  loggedOn={convo.loggedOn ?? ""}
                  migrationRequestId={migrationRequestId}
                  files={convo.data as MigrationRequestFile[]}
                  userName={convo.userName}
                  onReply={() => setReplyTo(convo)}
                />
              </div>
            )}

            {convo?.conversationType === ConversationTypes.QUERY && (
              <div className="max-w-[70%] relative">
                <div className="absolute -left-10 top-4">
                  <ConversationLogo
                    showDefault={convo.customerId ? false : true}
                    userName={convo.userName}
                  />
                </div>

                <div className="bg-theme-background-elevatex">
                  <Query
                    userName={convo.userName}
                    loggedOn={convo.loggedOn}
                    repliedTo={convo.repliedTo}
                    query={convo.data as MigrationRequestQuery}
                    onReply={() => setReplyTo(convo)}
                  />
                </div>
              </div>
            )}

            {convo?.conversationType === ConversationTypes.MEETING && (
              <div className="max-w-[70%] relative">
                <div className="absolute -left-10 top-4">
                  <ConversationLogo
                    showDefault={convo.customerId ? false : true}
                    userName={convo.userName}
                  />
                </div>

                <MeetingScheduled
                  {...(convo.data as GetCalendarForMigrationRequestResponse)}
                  loggedOn={convo.loggedOn}
                  onReply={() => setReplyTo(convo)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pl-20">
        <div>
          {replyTo && (
            <div className="pb-2 pl-2 bg-theme-background-elevate flex items-center h-fit">
              <div
                onClick={() =>
                  document
                    .querySelector(`#_${replyTo.conversationId}`)
                    ?.scrollIntoView()
                }
                className="cursor-pointer text-theme-secondary relative w-full [&>div]:pointer-events-none scale-[0.80] origin-bottom-left max-h-[240px] overflow-hidden [&>div]:!py-4 [&>div]:bg-theme-button-elevate"
              >
                <div className="w-[2px] h-full absolute !bg-gray-400 z-10 left-0"></div>

                <section className="w-full h-[20px] flex justify-end items-center !py-4 bg-theme-button-elevate">
                  <IconButton
                    onClick={() => setReplyTo(undefined)}
                    theme="secondary"
                    size="md"
                    buttonThemeStyle="ghost"
                    className="!shadow-none"
                  >
                    <Icon icon={cancel} theme="secondary" size="md" />
                  </IconButton>
                </section>

                {replyTo?.conversationType === ConversationTypes.QUERY && (
                  <Query
                    userName={replyTo.userName}
                    loggedOn={replyTo.loggedOn}
                    query={replyTo.data as MigrationRequestQuery}
                  />
                )}

                {replyTo?.conversationType ===
                  ConversationTypes.PROCESS_INITIATED && (
                  <ProcessInitiated
                    process={replyTo?.data as MigrationRequestProcess}
                  />
                )}

                {replyTo?.conversationType ===
                  ConversationTypes.PROCESS_UPDATED && (
                  <ProcessUpdated
                    loggedOn={replyTo.loggedOn}
                    process={replyTo?.data as GetTasksResponse}
                  />
                )}

                {replyTo?.conversationType ===
                  ConversationTypes.FILE_UPLOAD && (
                  <FileUploaded
                    loggedOn={replyTo.loggedOn}
                    migrationRequestId={migrationRequestId}
                    files={replyTo.data as MigrationRequestFile[]}
                    userName={replyTo?.userName}
                  />
                )}

                {replyTo?.conversationType === ConversationTypes.MEETING && (
                  <MeetingScheduled
                    {...(replyTo.data as GetCalendarForMigrationRequestResponse)}
                    loggedOn={replyTo.loggedOn}
                  />
                )}
              </div>
            </div>
          )}

          {readOnlyAccess === false && (
            <MessageBox
              focus={replyTo !== undefined}
              onSend={messageSendHandler}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ConversationContainer;
