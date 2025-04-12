import Button from "../../../../../ui-components/Button";
import { ResponsibilityDeleteConfirmationProps } from "./model";

function ResponsibilityDeleteConfirmation({
  title,
  description,
  owner,
  loading,
  onCancel,
  onDelete,
}: ResponsibilityDeleteConfirmationProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-theme-secondary font-semibold text-xl">
          Are you sure ?
        </h3>
        <h3 className="text-theme-secondary-500 font-medium">
          Do you want to delete
          <br />
          <br />
          <table cellPadding={10}>
            <thead className="text-left">
              <tr className="text-sm text-left h-[50px]">
                <th className="font-medium text-theme-secondary-600">Name</th>
                <th className="font-medium text-theme-secondary-600">
                  Description
                </th>
                <th className="font-medium text-theme-secondary-600">Owner</th>
              </tr>
            </thead>
            <tr className="bg-theme-zebra-table">
              <td>{title}</td>
              <td>{description}</td>
              <td>{owner}</td>
            </tr>
          </table>
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

export default ResponsibilityDeleteConfirmation;
