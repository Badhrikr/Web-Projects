import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { poppers } from "../../../../../helpers/icons";
import Button from "../../../../../ui-components/Button";
import Icon from "../../../../../ui-components/Icon";
import Loading from "../../../../../ui-components/Loading";
import * as Services from "../../../services";
import { CreateMigrationRequestTechnologies } from "../../../services/model.request";
import { GetComponentsResponse } from "../../../services/model.response";
import MigrationTypeComponent from "../migration-type-component";
import { MigrationTypeComponentsProps } from "./model";

export default function MigrationTypeComponents({
  selectedMigrationType,
  onCreate,
}: MigrationTypeComponentsProps) {
  const [fetching, setFetching] = useState(true);
  const [components, setComponents] = useState<GetComponentsResponse[]>([]);

  const [chosenComponents, setChosenComponents] = useState<
    CreateMigrationRequestTechnologies[]
  >([]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate?.(chosenComponents);
  };

  console.log({ chosenComponents });

  const componentDataChangeHandler = (
    componentData: CreateMigrationRequestTechnologies
  ) => {
    setChosenComponents((chosenComponents) => {
      let removeComponent =
        chosenComponents?.filter(
          (chosenComponent) =>
            chosenComponent.componentId !== componentData.componentId
        ) ?? [];

      return [...removeComponent, componentData];
    });
  };

  const onNAChange = (componentId: string) => {
    setChosenComponents(
      (chosenComponents) =>
        chosenComponents?.filter(
          (chosenComponent) => chosenComponent.componentId !== componentId
        ) ?? []
    );
  };

  const createMigrationRequestHandler = () => {
    onCreate?.(chosenComponents);
  };

  const fetchSuccess = ({
    components,
  }: {
    components: GetComponentsResponse[];
  }) => {
    setComponents(components ?? []);
    setFetching(false);
  };

  const fetchError = () => {
    toast.error("Error Occurred");
    setFetching(false);
  };

  useEffect(() => {
    setFetching(true);
    Services.GetComponents({
      offeringTypeId: selectedMigrationType.offeringTypeId,
      success: fetchSuccess,
      error: fetchError,
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={submitHandler} className="flex flex-col gap-6">
        {components.map((component) => (
          <MigrationTypeComponent
            onNA={onNAChange}
            onComponentDataChange={componentDataChangeHandler}
            {...component}
          />
        ))}

        {!fetching && components.length === 0 && (
          <h3 className="text-center text-theme-secondary text-sm">
            No Components Found
          </h3>
        )}

        {fetching && (
          <div className="flex-center-center">
            <Loading theme="secondary" size="lg" />
            <span className="text-theme-secondary">Loading</span>
          </div>
        )}

        <Button
          type="submit"
          theme="secondary"
          color="elevate"
          size="lg"
          className="w-full"
          endIcon={
            <Icon
              icon={poppers}
              theme="secondary"
              size="md"
              iconType="solid"
              className="[&>svg]:!fill-[#D5AD46]"
            />
          }
        >
          <span className="text-base">Create Migration Request</span>
        </Button>
      </form>
    </div>
  );
}
