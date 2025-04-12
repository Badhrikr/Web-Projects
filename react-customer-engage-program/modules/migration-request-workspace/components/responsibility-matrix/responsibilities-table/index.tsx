import React, { useState } from "react";
import { minus } from "../../../../../helpers/icons";
import useLogin from "../../../../../hooks/use-login";
import { ApplicationRoles } from "../../../../../shared/enums";
import Button from "../../../../../ui-components/Button";
import Icon from "../../../../../ui-components/Icon";
import Modal from "../../../../../ui-components/Modal";
import { GetAddedResponsibilitiesResponse } from "../../../services/model.response";
import ResponsibilityDeleteConfirmation from "../responsibility-delete-confirmation";
import { ResponsibilitiesTableProps } from "./model";

function ResponsibilitiesTable({
  responsibilities,
}: ResponsibilitiesTableProps) {
  const [showResponsibilityDelete, setShowResponsibilityDelete] =
    useState(false);
  const [toDeleteResponsibility, setToDeleteResponsibility] =
    useState<GetAddedResponsibilitiesResponse>();

  const { roles } = useLogin();

  const showResponsibilityDeleteToggle = () => {
    setShowResponsibilityDelete((prev) => !prev);
  };

  const deleteHandler = (responsibility: GetAddedResponsibilitiesResponse) => {
    showResponsibilityDeleteToggle();
    setToDeleteResponsibility(responsibility);
  };

  return (
    <>
      <table cellPadding={15} className="w-full bg-theme-background-elevate">
        <thead className="text-left">
          <tr>
            <th className="font-medium text-theme-secondary-600">Name</th>
            <th className="font-medium text-theme-secondary-600">Owner</th>
            <th className="font-medium text-theme-secondary-600"></th>
          </tr>
        </thead>

        <tbody>
          {responsibilities.map((responsibility, i) => (
            <tr
              className={`text-theme-secondary text-base ${
                i % 2 === 0 ? "bg-theme-zebra-table" : ""
              }`}
            >
              <td className="w-[50%]">
                <div className="flex flex-col gap-2">
                  <span className="text-theme-secondary font-medium">
                    {responsibility?.title}
                  </span>
                  <span className="text-theme-secondary-550 font-medium">
                    {responsibility?.description}
                  </span>
                </div>
              </td>

              <td className="text-theme-secondary font-medium">
                {responsibility.owner}
              </td>
              <td>
                {roles.includes(ApplicationRoles.SALES_PERSON) && (
                  <Button
                    onClick={() => deleteHandler(responsibility)}
                    size="md"
                    theme="secondary"
                    buttonThemeStyle="ghost"
                  >
                    <div className="flex-center-center">
                      <Icon
                        icon={minus}
                        theme="secondary"
                        size="md"
                        className="[&>svg]:!stroke-red-600"
                      />
                      <span className="!text-red-600">Delete</span>
                    </div>
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={showResponsibilityDelete}
        close={showResponsibilityDeleteToggle}
      >
        <div className="pt-14 pb-4 px-4">
          {toDeleteResponsibility && (
            <ResponsibilityDeleteConfirmation
              {...toDeleteResponsibility}
              onCancel={showResponsibilityDeleteToggle}
            />
          )}
        </div>
      </Modal>
    </>
  );
}

export default ResponsibilitiesTable;
