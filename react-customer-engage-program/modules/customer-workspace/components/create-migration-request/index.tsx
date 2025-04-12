import { useRouter } from "next/router";
import { useState } from "react";
import Confetti from "react-confetti";
import { poppers } from "../../../../helpers/icons";
import Button from "../../../../ui-components/Button";
import Icon from "../../../../ui-components/Icon";
import Loading from "../../../../ui-components/Loading";
import Modal from "../../../../ui-components/Modal";
import * as Services from "../../services";
import { CreateMigrationRequestTechnologies } from "../../services/model.request";
import {
  CreateMigrationRequestResponse,
  GetOfferingsResponse,
  GetOfferingTypesResponse,
} from "../../services/model.response";
import {
  ChooseMigrationRequestType,
  ChosenMigrationRequestType,
} from "./migration-request-type";
import { ChooseMigrationType, ChosenMigrationType } from "./migration-type";
import MigrationTypeComponents from "./migration-type-components";

function CreateMigrationRequestContainer({
  customerId,
}: {
  customerId: string;
}) {
  const router = useRouter();
  const [stage, setStage] = useState<number>(1);
  const [selectedMigrationRequestType, setSelectedMigrationRequestType] =
    useState<GetOfferingsResponse>();
  const [selectedMigrationType, setSelectedMigrationType] =
    useState<GetOfferingTypesResponse>();

  const [creatingMigrationRequest, setCreatingMigrationRequest] =
    useState(false);
  const [newMigrationRequestId, setNewMigrationRequestId] = useState<
    string | null
  >(null);

  const migrationRequestTypeSelectHandler = (
    migrationRequestType: GetOfferingsResponse
  ) => {
    setStage(2);
    setSelectedMigrationRequestType(migrationRequestType);
  };

  const migrationTypeSelectHandler = (
    migrationType: GetOfferingTypesResponse
  ) => {
    setStage(3);
    setSelectedMigrationType(migrationType);
  };

  const migrationRequestTypeReset = () => {
    setSelectedMigrationRequestType(undefined);
    setStage(1);
  };

  const migrationTypeReset = () => {
    setSelectedMigrationType(undefined);
    setStage(2);
  };

  const createdSuccess = (response: CreateMigrationRequestResponse) => {
    setTimeout(() => {
      setCreatingMigrationRequest(false);
      if (response?.engagementId) {
        setNewMigrationRequestId(response.engagementId);
      }
    }, 2000);
  };

  const createError = () => {
    setCreatingMigrationRequest(false);
  };

  const createMigrationRequestHandler = (
    technologies: CreateMigrationRequestTechnologies[]
  ) => {
    if (
      !selectedMigrationRequestType ||
      !selectedMigrationType ||
      technologies.length === 0
    )
      return;

    setCreatingMigrationRequest(true);

    Services.CreateMigrationRequest({
      customerId: customerId,
      chosenMigrationRequest: selectedMigrationRequestType.offeringName,
      chosenMigrationType: selectedMigrationType.offeringTypeId,
      chosenMigrationTypeName: selectedMigrationType.offeringTypeName,
      technologies,
      success: createdSuccess,
      error: createError,
    });
  };

  return (
    <div className={`w-[580px] relative flex flex-col gap-8 mt-0`}>
      {stage >= 1 && (
        <div className="flex flex-col gap-2 relative">
          {selectedMigrationRequestType && (
            <div className="h-[25px] w-[25px] -left-10 absolute top-0 bottom-0 z-20 bg-theme-background-primary">
              <div className="h-[25px] w-[25px] flex-center-center text-theme-secondary rounded-full bg-theme-background-elevate shadow-md">
                1
              </div>
            </div>
          )}

          <h2 className="text-theme-secondary">
            Please choose the type of migration request that you are looking for{" "}
          </h2>
          {selectedMigrationRequestType ? (
            <ChosenMigrationRequestType
              migrationRequestType={selectedMigrationRequestType}
              onReset={migrationRequestTypeReset}
              showResetButton={stage <= 2}
            />
          ) : (
            <ChooseMigrationRequestType
              onSelect={migrationRequestTypeSelectHandler}
            />
          )}
        </div>
      )}

      {stage >= 2 && (
        <div className="flex flex-col gap-2 relative">
          {selectedMigrationRequestType && (
            <div className="h-[25px] w-[25px] -left-10 absolute top-0 bottom-0 z-20 bg-theme-background-primary">
              <div className="h-[25px] w-[25px] flex-center-center text-theme-secondary rounded-full bg-theme-background-elevate shadow-md">
                2
              </div>
            </div>
          )}

          <h2 className="text-theme-secondary">
            Please choose the migration type
          </h2>

          {selectedMigrationType ? (
            <ChosenMigrationType
              migrationType={selectedMigrationType}
              onReset={migrationTypeReset}
              showResetButton={stage <= 3}
            />
          ) : selectedMigrationRequestType ? (
            <ChooseMigrationType
              selectedMigrationRequestType={selectedMigrationRequestType}
              onSelect={migrationTypeSelectHandler}
            />
          ) : (
            <></>
          )}
        </div>
      )}

      {stage >= 3 && (
        <div className="flex flex-col gap-2 relative">
          {selectedMigrationRequestType && (
            <div
              className={`h-[25px] w-[25px] -left-10 absolute top-0 bottom-0 z-20 bg-theme-background-primary`}
            >
              <div className="h-[25px] w-[25px] flex-center-center text-theme-secondary rounded-full bg-theme-background-elevate shadow-md">
                3
              </div>
            </div>
          )}
          <div className={`flex flex-col gap-1`}>
            <h2 className="text-theme-secondary">
              Please choose the Source and Target technologies
            </h2>
            <h2 className="text-theme-secondary-600 text-sm">
              If any of the below one is not applicable please choose{" "}
              <span className="font-medium">"NA"</span> from the picklist
            </h2>
          </div>
          <br />
          {selectedMigrationType && (
            <MigrationTypeComponents
              selectedMigrationType={selectedMigrationType}
              onCreate={createMigrationRequestHandler}
            />
          )}
        </div>
      )}

      {stage > 1 && (
        <div className="absolute w-[3px] bg-[rgba(128,128,128,0.53)] h-full -left-7 z-10"></div>
      )}

      <Modal isOpen={creatingMigrationRequest} showClose={false}>
        <div className="pt-6 pb-6 relative px-5 flex flex-col gap-6">
          <div className="flex-center-center">
            <Loading theme="primary" size="lg" />
            <h2 className="text-theme-secondary text-base">
              Creating your migration Request. Please wait..
            </h2>
          </div>
        </div>
      </Modal>

      <Modal isOpen={newMigrationRequestId !== null} showClose={false}>
        <div className="pt-6 pb-6 relative px-5 flex flex-col gap-6">
          <Confetti className="h-full w-full" gravity={0.6} />
          <h3 className="flex gap-2 items-center font-medium text-lg text-theme-secondary">
            <Icon
              icon={poppers}
              theme="secondary"
              size="xl"
              iconType="solid"
              className="[&>svg]:!fill-[#D5AD46]"
            />
            Migration Request Created Successfully
          </h3>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                router.push({
                  pathname:
                    "/customer/[customerid]/workspace/migration-requests",
                  query: {
                    customerid: router.query.customerid,
                  },
                });
              }}
              size="md"
              theme="secondary"
              buttonThemeStyle="ghost"
            >
              Close
            </Button>
            <Button
              size="md"
              theme="primary"
              onClick={() => {
                router.push({
                  pathname:
                    "/customer/[customerid]/workspace/migration-requests/[migrationrequestid]/workspace/request-tracker",
                  query: {
                    customerid: router.query.customerid,
                    migrationrequestid: newMigrationRequestId,
                  },
                });
              }}
            >
              Open Workspace
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateMigrationRequestContainer;
