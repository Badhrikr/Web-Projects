import React, { useState } from "react";
import { MigrationRequestWidgetProps } from "./model";
import Image from "next/image";
import Button from "../../../../../ui-components/Button";
import Icon from "../../../../../ui-components/Icon";
import { chevron_down, share } from "../../../../../helpers/icons";
import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";
import useOutsideClick from "../../../../../hooks/use-outside-click";

function MigrationRequestWidget({
  customerId,
  ...migrationRequest
}: MigrationRequestWidgetProps) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);
  const [ref] = useOutsideClick(() => setShowDetails(false), {
    closeOnEsc: true,
  });

  const openWorkSpaceHandler = () => {
    router.push({
      pathname: `${router.pathname}/[migrationrequestid]/workspace/request-tracker`,
      query: {
        customerid: customerId,
        migrationrequestid: migrationRequest.migrationRequestId,
      },
    });
  };

  const showDetailsToggle = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <div
      ref={ref}
      className="flex flex-col justify-between gap-3 px-2 py-4 rounded-md shadow-md bg-theme-background-elevate"
    >
      <div className="flex items-center gap-2">
        <div className="p-1 rounded-full shadow-xl bg-theme-background-elevate -rotate-12">
          <Image
            src={`${process.env.NEXT_PUBLIC_PROCEDURE_COMMON_BASE_PATH}/${migrationRequest.chosenMigrationRequest.offeringIcon}`}
            alt=""
            title={migrationRequest.chosenMigrationRequest.offeringName}
            height={30}
            width={30}
          />
        </div>

        <div className="relative p-1 rounded-full shadow-xl right-4 bg-theme-background-elevate rotate-12">
          <Image
            src={`${process.env.NEXT_PUBLIC_PROCEDURE_COMMON_BASE_PATH}/${migrationRequest.chosenMigrationType.offeringTypeIcon}`}
            alt=""
            title={migrationRequest.chosenMigrationType.offeringTypeName}
            height={30}
            width={30}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 relative">
        <h3 className="font-medium text-theme-secondary">
          {migrationRequest.chosenMigrationType.offeringTypeName}
        </h3>
        <Button
          theme="secondary"
          className="!p-0"
          size="sm"
          buttonThemeStyle="ghost"
          onClick={showDetailsToggle}
          endIcon={
            <Icon
              icon={chevron_down}
              size="sm"
              theme="secondary"
              className={`transition duration-300 ${
                showDetails ? "rotate-180" : ""
              }`}
            />
          }
        >
          <span className="text-[#417eda]">View Details</span>
        </Button>

        <CSSTransition
          in={showDetails}
          timeout={150}
          classNames={"fly"}
          unmountOnExit
        >
          <div className="absolute z-20 px-2 py-4 rounded-md shadow-lg left-20 top-16 bg-theme-background-popup">
            <h3 className="px-2 my-2 text-base font-semibold text-theme-secondary">
              Details
            </h3>
            <table cellPadding={10}>
              <thead>
                <tr className="text-left">
                  <th className="text-sm font-medium text-theme-secondary">
                    Component
                  </th>
                  <th className="text-sm font-medium text-theme-secondary">
                    Source
                  </th>
                  <th className="text-sm font-medium text-theme-secondary">
                    Target
                  </th>
                </tr>
              </thead>

              <tbody>
                {migrationRequest.technologies.map((technology, i) => (
                  <tr
                    className={`text-sm text-theme-secondary ${
                      i % 2 === 0 ? "bg-theme-zebra-table" : ""
                    }`}
                  >
                    <td>{technology.componentName}</td>
                    <td>{technology.fromTechName}</td>
                    <td>{technology.toTechName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CSSTransition>
      </div>

      <Button
        color="elevate"
        size="sm"
        theme="secondary"
        className="w-full"
        onClick={openWorkSpaceHandler}
        endIcon={<Icon icon={share} size="sm" theme="secondary" />}
      >
        Open Workspace
      </Button>
    </div>
  );
}

export default MigrationRequestWidget;
