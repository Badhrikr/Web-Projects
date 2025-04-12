import Image from "next/image";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import {
  chevron_right,
  refresh,
  tick_circle,
} from "../../../../../helpers/icons";
import Button from "../../../../../ui-components/Button";
import Icon from "../../../../../ui-components/Icon";
import IconButton from "../../../../../ui-components/IconButton";
import Loading from "../../../../../ui-components/Loading";
import * as Services from "../../../services";
import { GetOfferingTypesResponse } from "../../../services/model.response";
import { ChooseMigrationTypeProps, ChosenMigrationTypeProps } from "./model";

export function ChooseMigrationType({
  selectedMigrationRequestType,
  onSelect,
}: ChooseMigrationTypeProps) {
  const [migrationTypes, setMigrationTypes] =
    useState<GetOfferingTypesResponse[]>();
  const [selectedMigrationType, setSelectedMigrationType] =
    useState<GetOfferingTypesResponse>();
  const [fetching, setFetching] = useState(false);

  const fetchSuccess = (response: GetOfferingTypesResponse[]) => {
    if (!(response instanceof Array)) return;

    setFetching(false);
    setMigrationTypes(response);
  };

  const fetchError = () => {
    setFetching(false);
  };

  useEffect(() => {
    Services.GetOfferingTypes({
      offeringName: selectedMigrationRequestType?.offeringName,
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {fetching && (
        <div className="flex-center-center">
          <Loading theme="secondary" size="lg" />
          <span className="text-theme-secondary">Loading</span>
        </div>
      )}

      {!fetching && migrationTypes?.length === 0 && (
        <h4 className="text-theme-secondary text-sm">
          No Offering types found
        </h4>
      )}

      {!fetching && migrationTypes && migrationTypes?.length > 0 && (
        <>
          <div className="flex flex-wrap gap-4">
            {migrationTypes?.map((migrationType) => (
              <div
                onClick={() => setSelectedMigrationType(migrationType)}
                className="flex relative flex-col gap-2 items-center justify-center cursor-pointer bg-theme-background-elevate min-h-[100px] flex-grow-1 flex-shrink-1 basis-[30%] px-2 py-4 rounded-md shadow-md child-elevate"
              >
                {selectedMigrationType?.offeringTypeId ===
                  migrationType.offeringTypeId && (
                  <div className="absolute -top-1 -right-2">
                    <Icon
                      icon={tick_circle}
                      size="lg"
                      theme="secondary"
                      iconType="solid"
                      className="[&>svg]:!fill-[#24c78f] [&>svg]:!stroke-[#24c78f]"
                    />
                  </div>
                )}

                <Image
                  src={
                    migrationType.offeringTypeIcon
                      ? `${process.env.NEXT_PUBLIC_PROCEDURE_COMMON_BASE_PATH}/${migrationType.offeringTypeIcon}`
                      : ""
                  }
                  alt="image"
                  height={35}
                  width={35}
                />

                <span className="text-theme-secondary text-center">
                  {migrationType.offeringTypeName}
                </span>
              </div>
            ))}
          </div>

          <span className="text-theme-secondary-550 text-sm">
            Chosen Type:{" "}
            <span className="text-theme-secondary font-medium">
              {selectedMigrationType?.offeringTypeName ?? "none"}
            </span>
          </span>

          <Button
            theme="secondary"
            size="md"
            color="elevate"
            className="flex-1 w-full"
            onClick={() =>
              selectedMigrationType && onSelect(selectedMigrationType)
            }
          >
            <div className="flex-center-center">
              <span>Yes Proceed</span>
              <Icon icon={chevron_right} size="sm" theme="secondary" />
            </div>
          </Button>
        </>
      )}
    </div>
  );
}

export function ChosenMigrationType({
  migrationType,
  showResetButton,
  onReset,
}: ChosenMigrationTypeProps) {
  return (
    <div className="text-theme-secondary flex relative">
      <div className="flex gap-4 items-center bg-theme-background-elevate shadow-md px-4 py-3 rounded-md">
        <span>Chosen Migration Type</span>
        <div className="h-full w-[1.5px] bg-gray-500"></div>
        <div className="flex gap-2 items-center">
          <Image
            src={
              migrationType.offeringTypeIcon
                ? `${process.env.NEXT_PUBLIC_PROCEDURE_COMMON_BASE_PATH}/${migrationType.offeringTypeIcon}`
                : ""
            }
            alt="image"
            height={27}
            width={27}
          />

          <span className="text-theme-secondary text-center">
            {migrationType.offeringTypeName}
          </span>
        </div>
      </div>

      <div className="my-auto">
        <CSSTransition
          in={showResetButton}
          timeout={150}
          classNames="popup"
          unmountOnExit
        >
          <IconButton
            onClick={onReset}
            size="md"
            theme="secondary"
            buttonThemeStyle="ghost"
            className="!shadow-none"
          >
            <Icon
              icon={refresh}
              size="md"
              theme="secondary"
              iconType="outline"
            />
          </IconButton>
        </CSSTransition>
      </div>
    </div>
  );
}
