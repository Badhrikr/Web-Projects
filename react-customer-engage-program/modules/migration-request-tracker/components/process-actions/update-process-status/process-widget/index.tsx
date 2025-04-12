import React, { useState } from "react";
import { clock, poppers } from "../../../../../../helpers/icons";
import Icon from "../../../../../../ui-components/Icon";
import Modal from "../../../../../../ui-components/Modal";
import { ProcessStatus } from "../../../../enums";
import UpdateStatusWidget from "../update-status-widget";
import { ProcessProps } from "./model";

function ProcessWidget({
  taskName,
  taskDescription,
  migrationRequestId,
  taskStatus,
  onUpdate,
  ...props
}: ProcessProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const showConfirmationToggle = () => {
    setShowConfirmation((prev) => !prev);
  };

  const updateHandler = () => {
    showConfirmationToggle();
    onUpdate?.();
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div
          onClick={showConfirmationToggle}
          className="flex flex-col flex-1 gap-1 cursor-pointer"
        >
          <h4 className="text-theme-secondary font-medium">{taskName}</h4>
          <h5 className="text-theme-secondary-400 text-sm">
            {taskDescription}
          </h5>
        </div>

        <div className="w-[35px]">
          {taskStatus === ProcessStatus.TODO && (
            <div className="h-[30px] w-[30px] rounded-full flex-center-center">
              <Icon icon={clock} size="md" theme="primary" className="[&>svg]:!stroke-gray-500" />
            </div>
          )}

          {taskStatus === ProcessStatus.WIP && (
            <div className="h-[30px] w-[30px] rounded-full flex-center-center">
              <Icon icon={clock} size="md" theme="primary" className="[&>svg]:!stroke-[rgb(205,147,65)]" />
            </div>
          )}

          {taskStatus === ProcessStatus.COMPLETED && (
            <div className="h-[30px] w-[30px] rounded-full flex-center-center">
              <Icon icon={poppers} size="md" theme="primary" iconType="solid" className="[&>svg]:!fill-green-500" />
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showConfirmation}
        showClose={false}
        closeOnEsc={true}
        closeOnOverlay
        close={showConfirmationToggle}
      >
        <div className="px-4 pt-10 pb-4">
          <UpdateStatusWidget
            migrationRequestId={migrationRequestId}
            {...{ taskName, taskDescription, taskStatus, ...props }}
            onClose={showConfirmationToggle}
            onSubmit={updateHandler}
          />
        </div>
      </Modal>
    </>
  );
}

export default ProcessWidget;
