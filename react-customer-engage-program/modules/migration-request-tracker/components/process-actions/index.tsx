import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { date, upload } from "../../../../helpers/icons";
import useLogin from "../../../../hooks/use-login";
import { ApplicationRoles } from "../../../../shared/enums";
import Button from "../../../../ui-components/Button";
import Icon from "../../../../ui-components/Icon";
import Modal from "../../../../ui-components/Modal";
import InitiateProcess from "./initiate-process";
import ScheduleMeeting from "./schedule-meeting";
import UpdateProcessStatus from "./update-process-status";
import UploadDocuments from "./upload-documents";
import UploadFromRepository from "./upload-from-repository";
import ScheduleRouter from "./schedule-meeting";

function ProcessActions({
  migrationRequestId,
}: {
  migrationRequestId: string;
}) {
  const router = useRouter();
  const { roles } = useLogin();
  const [actionPopup, setActionPopup] = useState<JSX.Element | null>(null);

  const isSalesPerson = roles.includes(ApplicationRoles.SALES_PERSON);

  const actionPopupToggle = () => {
    setActionPopup(null);
  };

  const setUploadDocuments = () => {
    setActionPopup(
      <React.Fragment>
        <UploadDocuments
          migrationRequestId={migrationRequestId}
          onCancel={actionPopupToggle}
        />
      </React.Fragment>
    );
  };

  const setInitateProcess = () => {
    setActionPopup(
      <React.Fragment>
        <InitiateProcess
          migrationRequestId={migrationRequestId}
          onCancel={actionPopupToggle}
        />
      </React.Fragment>
    );
  };

  const setScheduleMeeting = () => {
    setActionPopup(
      <React.Fragment>
        <ScheduleRouter
          onCancel={actionPopupToggle}
          migrationRequestId={migrationRequestId}
        />
      </React.Fragment>
    );
  };

  const setUpdateProcessStatus = () => {
    setActionPopup(
      <React.Fragment>
        <UpdateProcessStatus
          migrationRequestId={migrationRequestId}
          onCancel={actionPopupToggle}
        />
      </React.Fragment>
    );
  };

  const setUploadFromRepository = () => {
    setActionPopup(
      <React.Fragment>
        <UploadFromRepository
          migrationRequestId={migrationRequestId}
          onCancel={actionPopupToggle}
        />
      </React.Fragment>
    );
  };

  const microsoftLoginInitializer = async () => {
    const LoginType = (await import("@microsoft/mgt-element")).LoginType;
    const Providers = (await import("@microsoft/mgt-element")).Providers;
    const Msal2Provider = (await import("@microsoft/mgt-msal2-provider"))
      .Msal2Provider;

    Providers.globalProvider = new Msal2Provider({
      clientId: "bc866189-0784-486a-8fcd-f4f90b2debdd",
      authority:
        "https://login.microsoftonline.com/52a933d4-9b8c-45c3-8fcb-70c74df3f660",
      scopes: ["Calendars.Read", "Calendars.ReadWrite"],
      loginType: LoginType.Popup,
    });
  };

  useEffect(() => {
    microsoftLoginInitializer();
  }, []);

  return (
    <div className="flex flex-col gap-6 py-2">
      <h4 className="font-medium text-theme-secondary">Process Actions</h4>

      <div className="flex flex-col w-full gap-3">
        {isSalesPerson && (
          <React.Fragment>
            <Button
              size="md"
              theme="primary"
              color="elevate"
              className="flex-1"
              onClick={setInitateProcess}
            >
              <span className="text-sm">Initiate Process</span>
            </Button>

            <Button
              size="md"
              theme="primary"
              color="elevate"
              className="flex-1"
              onClick={setUpdateProcessStatus}
            >
              <span className="text-sm">Update Process Status</span>
            </Button>

            <Button
              size="md"
              theme="primary"
              color="elevate"
              className="flex-1"
              onClick={setUploadFromRepository}
            >
              <span className="text-sm">Upload From Repository</span>
            </Button>
          </React.Fragment>
        )}
      </div>

      <div className="h-[1px] w-full bg-gray-500" />

      <div className="flex flex-col w-full gap-3">
        <Button
          size="md"
          theme="primary"
          color="elevate"
          className="flex-1"
          onClick={setUploadDocuments}
          startIcon={
            <Icon icon={upload} theme="secondary" size="sm" iconType="solid" />
          }
        >
          <span className="text-sm">Upload Documents</span>
        </Button>

        <Button
          size="md"
          theme="primary"
          color="elevate"
          className="flex-1"
          onClick={setScheduleMeeting}
          startIcon={
            <Icon icon={date} theme="secondary" size="sm" iconType="outline" />
          }
        >
          <span className="text-sm">Schedule Meeting</span>
        </Button>
      </div>

      <Modal isOpen={actionPopup !== null} close={actionPopupToggle}>
        <div className="flex flex-col gap-4 px-6 py-12 pb-4">{actionPopup}</div>
      </Modal>
    </div>
  );
}

export default ProcessActions;
