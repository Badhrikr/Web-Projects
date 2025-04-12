import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { user_circle } from "../../../../../helpers/icons";
import sleep from "../../../../../helpers/sleep";
import Button from "../../../../../ui-components/Button";
import Icon from "../../../../../ui-components/Icon";
import Loading from "../../../../../ui-components/Loading";
import * as Services from "../../../services";
import { AssignConfirmationProps } from "./model";

function AssignPersonConfirmation({
  firstName,
  lastName,
  email,
  leadId,
  onAssign,
  onCancel,
}: AssignConfirmationProps) {
  const router = useRouter();

  const [assigning, setAssigning] = useState(false);

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

    Services.AssignSalesPerson({
      salesPerson: email ?? "",
      leadId: leadId,
      success: assignSuccess,
      error: assignError,
    });
  };

  return (
    <div className="px-4 py-6 flex flex-col gap-4 w-full font-primary">
      <div className="flex flex-col gap-1">
        <div className="w-full flex justify-center">
          <Icon
            icon={user_circle}
            size="_2xl"
            theme="secondary"
            iconType="solid"
            className="[&>svg]:!h-[4.11rem] [&>svg]:!w-[4.11rem]"
          />
        </div>

        <div className="flex flex-col px-2 py-1 text-center">
          <span className="capitalize font-semibold text-theme-secondary text-lg">
            {firstName} {lastName}
          </span>
          <span className="text-theme-secondary-550 text-lg">{email}</span>
        </div>
      </div>

      <h3 className="text-center text-theme-secondary-600 font-medium text-xl">
        Do you want the assign the lead to <br />
        <span className="font-semibold">
          {firstName} {lastName}
        </span>{" "}
        ?
      </h3>

      <div className="mt-6 flex justify-end gap-2 items-center">
        <Button
          size="md"
          theme="secondary"
          buttonThemeStyle="outlined"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          size="md"
          theme="primary"
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
      </div>
    </div>
  );
}

export default AssignPersonConfirmation;
