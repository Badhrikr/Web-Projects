import { useState } from "react";
import Modal from "../../../../../../ui-components/Modal";
import InitiateProcessConfirmation from "../initiate-process-confirmation";
import { ProcessProps } from "./model";

function InitiateProcessWidget({
  taskName,
  taskDescription,
  migrationRequestId,
  onSubmit,
  ...props
}: ProcessProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const showConfirmationToggle = () => {
    setShowConfirmation((prev) => !prev);
  };

  return (
    <>
      <div
        onClick={showConfirmationToggle}
        className="flex flex-col gap-1 cursor-pointer"
      >
        <h4 className="text-theme-secondary font-medium">{taskName}</h4>
        <h5 className="text-theme-secondary-400 text-sm">{taskDescription}</h5>
      </div>

      <Modal
        isOpen={showConfirmation}
        showClose={false}
        closeOnEsc={true}
        closeOnOverlay
        close={showConfirmationToggle}
      >
        <div className="px-4 pt-10 pb-4">
          <InitiateProcessConfirmation
            migrationRequestId={migrationRequestId}
            {...{ taskName, taskDescription, ...props }}
            onClose={showConfirmationToggle}
            onSubmit={onSubmit}
          />
        </div>
      </Modal>
    </>
  );
}

export default InitiateProcessWidget;
