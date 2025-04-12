import { useState } from "react";
import { members_add } from "../../../../../helpers/icons";
import useLogin from "../../../../../hooks/use-login";
import { ApplicationRoles } from "../../../../../shared/enums";
import Icon from "../../../../../ui-components/Icon";
import IconButton from "../../../../../ui-components/IconButton";
import Modal from "../../../../../ui-components/Modal";
import CustomerAddConfirmation from "../user-add-confirmation";
import { MemberComponentProps } from "./model";
import * as Services from "../../../services";

function MemberComponent({
  firstname,
  lastname,
  useremail,
  migrationRequestId,
  userId,
  onMemberAdd,
}: MemberComponentProps) {
  const { roles } = useLogin();

  const isCustomer = roles.includes(ApplicationRoles.CUSTOMER);
  const isSalesPerson = roles.includes(ApplicationRoles.SALES_PERSON);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [creating, setCreating] = useState(false);

  const showConfirmationToggle = () => {
    setShowConfirmation((prev) => !prev);
  };

  const createSuccess = () => {
    setCreating(false);
    onMemberAdd?.();
  };

  const createError = () => {
    setCreating(false);
  };

  const memberAddHandler = () => {
    setCreating(true);

    if (isCustomer && userId) {
      Services.AddCustomerUser({
        migrationRequestId,
        userId,
        success: createSuccess,
        error: createError,
      });
    }

    if (isSalesPerson) {
      Services.AddSalesPersonUser({
        migrationRequestId,
        firstname,
        lastname,
        useremail,
        success: createSuccess,
        error: createError,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <h4 className="text-theme-secondary font-medium">
            {firstname} {lastname}
          </h4>
          <h4 className="text-theme-secondary-550">{useremail}</h4>
        </div>

        <IconButton
          theme="secondary"
          size="md"
          buttonThemeStyle="ghost"
          className="!shadow-none"
          onClick={showConfirmationToggle}
        >
          <Icon
            icon={members_add}
            theme="secondary"
            size="md"
            iconType="outline"
          />
        </IconButton>
      </div>

      <Modal isOpen={showConfirmation} close={showConfirmationToggle}>
        <div className="pt-14 pb-4 px-4">
          <CustomerAddConfirmation
            onSubmit={memberAddHandler}
            onCancel={showConfirmationToggle}
            loading={creating}
            userName={firstname + " " + lastname}
            email={useremail}
          />
        </div>
      </Modal>
    </>
  );
}

export default MemberComponent;
