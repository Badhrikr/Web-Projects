import React from "react";
import Button from "../../../../ui-components/Button";
import { FileDeleteConfirmationProps } from "./model";

function FileDeleteConfirmation({
  fileName,
  loading,
  onCancel,
  onDelete,
}: FileDeleteConfirmationProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-theme-secondary font-semibold text-xl">Are you sure ?</h3>
        <h3 className="text-theme-secondary-500 font-medium">
          Do you want to delete {fileName}
        </h3>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onCancel}
          size="md"
          theme="secondary"
          buttonThemeStyle="ghost"
        >
          Cancel
        </Button>
        <Button
          onClick={onDelete}
          size="md"
          theme="primary"
          className="!bg-red-900"
        >
          Yes, Delete
        </Button>
      </div>
    </div>
  );
}

export default FileDeleteConfirmation;
