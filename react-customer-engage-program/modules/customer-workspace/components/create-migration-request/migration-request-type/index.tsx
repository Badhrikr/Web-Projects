import Image from "next/image";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { refresh } from "../../../../../helpers/icons";
import LoadingScreen from "../../../../../shared/components/loading-screen";
import Icon from "../../../../../ui-components/Icon";
import IconButton from "../../../../../ui-components/IconButton";
import Loading from "../../../../../ui-components/Loading";
import * as Services from "../../../services";
import { GetOfferingsResponse } from "../../../services/model.response";
import {
  ChooseMigrationRequestTypeProps,
  ChosenMigrationTypeProps,
} from "./model";

function ChooseMigrationRequestType({
  onSelect,
}: ChooseMigrationRequestTypeProps) {
  const [fetching, setFetching] = useState(true);
  const [offerings, setOfferings] = useState<GetOfferingsResponse[]>([]);

  const fetchSuccess = (response: GetOfferingsResponse[]) => {
    if (!(response instanceof Array)) return;

    setFetching(false);
    setOfferings(response);
  };

  const fetchError = () => {
    setFetching(false);
  };

  useEffect(() => {
    Services.GetOfferings({
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  const selectHandler = (migrationRequestType: GetOfferingsResponse) => {
    onSelect(migrationRequestType);
  };

  return (
    <div className="flex gap-8 justify-center mt-4">
      {fetching && (
        <div className="flex-center-center">
          <Loading theme="secondary" size="lg" />
          <span className="text-theme-secondary">Loading</span>
        </div>
      )}
      {!fetching &&
        offerings.map((offering) => (
          <div
            onClick={() => selectHandler(offering)}
            className="relative flex flex-col gap-6 items-center justify-center bg-theme-background-elevate rounded-md shadow-md px-16 py-8 elevate cursor-pointer"
          >
            <Image
              src={
                offering.offeringIcon
                  ? `${process.env.NEXT_PUBLIC_PROCEDURE_COMMON_BASE_PATH}/${offering.offeringIcon}`
                  : "/kumaran-logo.png"
              }
              alt="image"
              height={35}
              width={35}
            />
            <span className="text-theme-secondary text-center">
              {offering.offeringName}
            </span>
          </div>
        ))}
    </div>
  );
}

function ChosenMigrationRequestType({
  migrationRequestType,
  showResetButton,
  onReset,
}: ChosenMigrationTypeProps) {
  return (
    <div className="text-theme-secondary flex relative">
      <div className="flex gap-4 items-center bg-theme-background-elevate shadow-md px-4 py-3 rounded-md">
        <span>Chosen Migration Request</span>
        <div className="h-full w-[1.5px] bg-gray-500"></div>
        <div className="flex gap-2 items-center">
          <Image
            src={
              migrationRequestType.offeringIcon
                ? `${process.env.NEXT_PUBLIC_PROCEDURE_COMMON_BASE_PATH}/${migrationRequestType.offeringIcon}`
                : "/kumaran-logo.png"
            }
            alt="image"
            height={27}
            width={27}
          />
          <span>{migrationRequestType.offeringName}</span>
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

export { ChooseMigrationRequestType, ChosenMigrationRequestType };
