import Button from "../../../../../ui-components/Button";
import { UserAddConfirmationProps } from "./model";

function CustomerAddConfirmation({
  userName,
  email,
  loading,
  onCancel,
  onSubmit,
}: UserAddConfirmationProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-theme-secondary font-semibold text-xl">
          {userName}
        </h3>
        <h3 className="text-theme-secondary-500 font-medium">
          {email}
          <br />
          <br />
        </h3>
        <div>
          <h4 className="text-theme-secondary font-medium">Are you sure ?</h4>
          <h4 className="text-theme-secondary-500">
            Do you want to add this user to this conversation
          </h4>
        </div>
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
        <Button onClick={onSubmit} size="md" theme="primary">
          Yes, Proceed
        </Button>
      </div>
    </div>
  );
}

export default CustomerAddConfirmation;
