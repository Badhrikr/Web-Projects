import React, { useState } from "react";
import { clock, poppers } from "../../../../../../helpers/icons";
import Button from "../../../../../../ui-components/Button";
import Icon from "../../../../../../ui-components/Icon";
import Textarea from "../../../../../../ui-components/Textarea";
import { ProcessStatus } from "../../../../enums";
import { UpdateStatusWidgetProps } from "./model";
import Confetti from "react-confetti";
import * as Services from "../../../../services";

function UpdateStatusWidget({
  migrationRequestId,
  taskName,
  taskId,
  taskStatus,
  onSubmit,
  onClose,
}: UpdateStatusWidgetProps) {
  const [processStatus, setProcessStatus] = useState<ProcessStatus>(
    taskStatus ?? ProcessStatus.TODO
  );
  const [remarks, setRemarks] = useState("");

  const updateSuccess = () => {
    onSubmit?.();
  };

  const updateError = () => {};

  const updateHandler = () => {
    Services.UpdateTask({
      migrationRequestId,
      processId: taskId,
      status: processStatus,
      remarks,
      success: updateSuccess,
      error: updateError,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-theme-secondary">{taskName}</h1>

      <div className="flex gap-4 items-center">
        <div
          onClick={() => setProcessStatus(ProcessStatus.TODO)}
          className={`relative overflow-hidden cursor-pointer flex-1 px-2 py-3 flex justify-center items-center gap-2 rounded-md ${
            processStatus === ProcessStatus.TODO
              ? "bg-gray-500 text-theme-primary"
              : "bg-theme-background-elevate text-theme-secondary"
          }`}
        >
          <Icon
            icon={clock}
            size="md"
            theme={
              processStatus === ProcessStatus.TODO ? "primary" : "secondary"
            }
          />
          <span className="text-sm">TODO</span>
        </div>

        <div
          onClick={() => setProcessStatus(ProcessStatus.WIP)}
          className={`relative overflow-hidden cursor-pointer flex-1 px-2 py-3 flex justify-center items-center gap-2 rounded-md ${
            processStatus === ProcessStatus.WIP
              ? "bg-[rgb(205,147,65)] text-theme-primary"
              : "bg-theme-background-elevate text-theme-secondary"
          }`}
        >
          <Icon
            icon={clock}
            size="md"
            theme={
              processStatus === ProcessStatus.WIP ? "primary" : "secondary"
            }
          />
          <span className="text-sm">WIP</span>
        </div>

        <div
          onClick={() => setProcessStatus(ProcessStatus.COMPLETED)}
          className={`relative overflow-hidden cursor-pointer flex-1 px-2 py-3 flex justify-center items-center gap-2 rounded-md ${
            processStatus === ProcessStatus.COMPLETED
              ? "bg-green-600 text-theme-primary"
              : "bg-theme-background-elevate text-theme-secondary"
          }`}
        >
          <Icon
            icon={poppers}
            size="md"
            iconType="solid"
            theme={
              processStatus === ProcessStatus.COMPLETED
                ? "primary"
                : "secondary"
            }
          />
          <span className="text-sm">Completed</span>
          {processStatus === ProcessStatus.COMPLETED && (
            <Confetti className="h-full w-full scale-[3]" gravity={3} />
          )}
        </div>
      </div>

      <div>
        <Textarea
          size="md"
          theme="secondary"
          placeholder="Remarks"
          rows={5}
          onChangeEvent={(e) => {
            setRemarks((e?.target as HTMLTextAreaElement).value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          size="lg"
          theme="primary"
          className="w-full"
          onClick={updateHandler}
        >
          <span className="font-normal text-base">
            Update Status as{" "}
            <span className="font-semibold">{processStatus}</span>
          </span>
        </Button>
        <Button
          size="md"
          theme="secondary"
          buttonThemeStyle="ghost"
          className="w-full"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default UpdateStatusWidget;
