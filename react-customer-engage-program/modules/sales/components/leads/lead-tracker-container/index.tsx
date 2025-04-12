import { useEffect, useState } from "react";
import { NotificationObject } from "../../../../../shared/model";
import { ReceiveMessageforSpecificRole } from "../../../../../signalR/model";
import Connector from "../../../../../signalR/signalRconnection";
import Loading from "../../../../../ui-components/Loading";
import { LeadTrackerAction } from "../../../enums";
import * as Services from "../../../services";
import { GetLeadTrackerByIdResponse } from "../../../services/model.response";
import LeadTrackerComponent from "../lead-tracker-component";
import { LeadTrackerContainerProps } from "./model";

function LeadTrackerContainer({ leadId }: LeadTrackerContainerProps) {
  const [fetching, setFetching] = useState(false);
  const [trackerList, setTrackerList] = useState<
    Array<GetLeadTrackerByIdResponse>
  >([]);

  const { events, removeEvents } = Connector();

  const leadTrackerFetchSuccess = (
    response: Array<GetLeadTrackerByIdResponse>
  ) => {
    setFetching(false);
    setTrackerList(response);
  };

  const leadTrackerFetchError = () => {
    setFetching(false);
  };

  let receiveLeadUpdate = ({
    data,
    notification,
  }: ReceiveMessageforSpecificRole) => {
    const notificationObject: NotificationObject = JSON.parse(notification);

    const isLeadUpdate = Object.values(LeadTrackerAction).includes(
      notificationObject.action as LeadTrackerAction
    );

    if (isLeadUpdate) {
      const dataObject = JSON.parse(data);

      if (dataObject?.leadsTracker?.length > 0 && dataObject.id === leadId) {
        setTrackerList((prevList) => {
          return [...prevList, ...dataObject?.leadsTracker];
        });
      }
    }
  };

  useEffect(() => {
    setFetching(true);

    Services.GetLeadTrackerById({
      leadId,
      success: leadTrackerFetchSuccess,
      error: leadTrackerFetchError,
    });
  }, []);

  useEffect(() => {
    events(receiveLeadUpdate, receiveLeadUpdate);

    return () => {
      removeEvents(receiveLeadUpdate, receiveLeadUpdate);
    };
  }, []);

  if (fetching || trackerList.length === 0) {
    return (
      <div className="h-full w-full flex-center-center !gap-2">
        <Loading size="md" theme="primary" />
        <span> Loading History </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 relative">
      <span className="h-full absolute z-0 top-0 bottom-0 left-7 w-[4px] !bg-[rgba(128,128,128,0.53)]" />

      <div id="lead-tracker" className="relative z-[0] flex flex-col gap-8">
        {trackerList.reverse().map((tracker, key) => (
          <LeadTrackerComponent
            key={key}
            index={key}
            trackerListLength={trackerList.length}
            {...tracker}
          />
        ))}
      </div>
    </div>
  );
}

export default LeadTrackerContainer;
