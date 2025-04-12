import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import sleep from "../../../../../helpers/sleep";
import Button from "../../../../../ui-components/Button";
import Loading from "../../../../../ui-components/Loading";
import ConversationLogo from "../../../../migration-request-tracker/components/conversation-container/conversation-logo";
import { Status } from "../../../enums";
import * as Services from "../../../services";
import { AssignConfirmationProps } from "./model";

function CustomerAssignPersonConfirmation({
  firstName,
  lastName,
  email,
  customerId,
  onAssign,
  onCancel,
}: AssignConfirmationProps) {
  const [assigning, setAssigning] = useState(false);
  const router = useRouter();

  const assignSuccess = async () => {
    await sleep(1000);

    toast.success(`Assigned to ${firstName}`);
    setAssigning(false);
    onAssign?.({ firstName, lastName, email });
    router.back();
  };

  const assignError = () => {
    toast.error("Error Occurred");
    setAssigning(false);
  };

  const confirmHandler = () => {
    setAssigning(true);

    Services.AssignCustomerSalesPerson({
      salesPerson: email ?? "",
      customerId: customerId,
      comments: "",
      firstName: firstName ?? "Unknown",
      lastName: lastName ?? "User",
      status: Status.NEW,
      success: assignSuccess,
      error: assignError,
    });
  };

  return (
    <div className="flex flex-col w-full gap-4 px-4 py-6 font-primary">
      <div className="flex flex-col gap-1">
        <div className="flex justify-center w-full">
          <ConversationLogo
            userName={firstName + " " + lastName}
            className="!h-[50px] !w-[50px] !text-lg"
          />
        </div>

        <div className="flex flex-col px-2 py-1 text-center">
          <span className="text-lg font-semibold capitalize text-theme-secondary">
            {firstName} {lastName}
          </span>
          <span className="text-lg text-theme-secondary-550">{email}</span>
        </div>
      </div>

      <h3 className="text-lg font-medium text-center text-theme-secondary-600">
        Do you want the assign this Customer to <br />
        <span className="font-semibold">
          {firstName} {lastName}
        </span>{" "}
        ?
      </h3>

      <div className="flex flex-col gap-4 mt-6">
        <Button
          size="lg"
          theme="primary"
          className="w-full"
          onClick={confirmHandler}
          disabled={assigning}
        >
          {assigning ? (
            <div className="flex items-center gap-2">
              <Loading size="sm" theme="secondary" />
              <span>Please wait</span>
            </div>
          ) : (
            "Yes, Proceed"
          )}
        </Button>
        <Button
          size="lg"
          theme="secondary"
          buttonThemeStyle="ghost"
          className="w-full"
          onClick={onCancel}
        >
          Close
        </Button>
      </div>
    </div>
  );
}

export default CustomerAssignPersonConfirmation;
