import React, { useState } from "react";
import Button from "../../../../../../ui-components/Button";
import { InitiateProcessConfirmationProps } from "./model";
import * as Services from "../../../../services";
import { ProcessStatus } from "../../../../enums";

function InitiateProcessConfirmation({
  taskId,
  taskName,
  migrationRequestId,
  onClose,
  onSubmit
}: InitiateProcessConfirmationProps) {
  const [initiating, setInitiating] = useState(false);

  const initiateSuccess = () => {
    setInitiating(false);
    onSubmit?.();
  };

  const initiateError = () => {
    setInitiating(false);
  };

  const initiateHandler = () => {
    setInitiating(true);
    Services.UpdateTask({
      migrationRequestId,
      processId: taskId,
      status: ProcessStatus.WIP,
      success: initiateSuccess,
      error: initiateError,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-theme-secondary">{taskName}</h1>
      <div>
        <h3 className="text-theme-secondary text-lg">Are you sure</h3>
        <h4 className="text-theme-secondary-500">
          Do you want to initiate this ?
        </h4>
      </div>

      <div className="flex items-center justify-end">
        <Button
          size="md"
          theme="secondary"
          buttonThemeStyle="ghost"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button onClick={initiateHandler} size="md" theme="primary">
          Yes, Initiate it
        </Button>
      </div>
    </div>
  );
}

export default InitiateProcessConfirmation;
