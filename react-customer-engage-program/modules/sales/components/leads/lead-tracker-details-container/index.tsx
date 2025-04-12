import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingScreen from "../../../../../shared/components/loading-screen";
import { NotificationObject } from "../../../../../shared/model";
import { ReceiveMessageforSpecificRole } from "../../../../../signalR/model";
import Connector from "../../../../../signalR/signalRconnection";
import { LeadTrackerAction, Status } from "../../../enums";
import * as Services from "../../../services";
import {
  GetLeadByIdResponse,
  LeadsResponse,
} from "../../../services/model.response";
import AddFollowup from "../add-followup";
import AssignSalesPerson from "../assign-salesperson";
import LeadDetailsHeader from "../lead-details-header";
import LeadTrackerContainer from "../lead-tracker-container";
import QualifyDisqualifyLead from "../qualify-disqualify-container";
import ViewDefaultLeadDetails from "../view-default-lead-details";

function LeadTrackerDetailsContainer() {
  const router = useRouter();
  const { leadid } = router.query;

  const [fetching, setFetching] = useState(false);
  const [leadDetails, setLeadDetails] = useState<LeadsResponse>();

  const { events, removeEvents } = Connector();

  const showAssignedSalesPerson =
    (leadDetails?.status === Status.NEW && leadDetails?.salesPerson === null) ??
    false;
  const showQualifyDisqualifyLead =
    !showAssignedSalesPerson &&
    leadDetails?.status === Status.NEW &&
    !leadDetails?.isQualified;
  const showLeadDetails =
    leadDetails?.status === Status.CLOSED ||
    leadDetails?.status === Status.INACTIVE;
  const showFollowUp =
    !showLeadDetails && !showAssignedSalesPerson && !showQualifyDisqualifyLead;

  const leadDetailsFetchSuccess = (response: GetLeadByIdResponse) => {
    setLeadDetails(response);
    setFetching(false);
  };

  const leadDetailsFetchError = () => {
    setFetching(false);
  };

  const receiveLeadUpdate = ({
    data,
    notification,
  }: ReceiveMessageforSpecificRole) => {
    const notificationObject: NotificationObject = JSON.parse(notification);

    const isLeadUpdate = Object.values(LeadTrackerAction).includes(
      notificationObject.action as LeadTrackerAction
    );

    if (isLeadUpdate) {
      const dataObject = JSON.parse(data);
      setLeadDetails(dataObject);
    }
  };

  useEffect(() => {
    if (!leadid) return;
    setFetching(true);

    Services.GetLeadById({
      leadId: leadid as string,
      success: leadDetailsFetchSuccess,
      error: leadDetailsFetchError,
    });
  }, [router.query]);

  useEffect(() => {
    events(receiveLeadUpdate, receiveLeadUpdate);

    return () => {
      removeEvents(receiveLeadUpdate, receiveLeadUpdate);
    };
  }, []);

  if (fetching || !leadDetails) {
    return (
      <div className="block fixed inset-0 z-30">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <div className="flex-1 flex flex-col gap-2">
        <LeadDetailsHeader {...leadDetails} />

        <div className="flex gap-10 justify-between flex-wrap">
          <div className="flex-1 py-10 bg-theme-background-elevate rounded-xl px-8 shadow-md">
            <LeadTrackerContainer leadId={leadid as string} />
          </div>

          <div className="sticky top-0 flex-1 shadow-md rounded-xl h-fit px-4 bg-theme-background-elevate py-8">
            {showAssignedSalesPerson && (
              <AssignSalesPerson leadId={leadid as string} />
            )}

            {showQualifyDisqualifyLead && (
              <QualifyDisqualifyLead leadId={leadid as string} />
            )}

            {showFollowUp && <AddFollowup leadId={leadid as string} />}

            {showLeadDetails && <ViewDefaultLeadDetails {...leadDetails} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadTrackerDetailsContainer;
