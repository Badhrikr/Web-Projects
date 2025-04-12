import { useEffect, useMemo, useState } from "react";
import Dropdown from "../../../../../ui-components/Dropdown";
import { MigrationTypeComponentProps } from "./model";

function MigrationTypeComponent({
  componentName,
  componentId,
  fromTechnologies,
  toTechnologies,
  onNA,
  onComponentDataChange,
}: MigrationTypeComponentProps) {
  const [fromTech, setFromTech] = useState<{
    name: string | null;
    id: string | null;
  }>();
  const [toTech, setToTech] = useState<{
    name: string | null;
    id: string | null;
  }>();

  const fromTechnologiesOptions = useMemo(() => {
    return (
      fromTechnologies?.map((technology) => ({
        label: technology.technologyName,
        value: technology.technologyId,
      })) ?? []
    );
  }, [fromTechnologies]);

  const toTechnologiesOptions = useMemo(() => {
    return (
      [
        ...toTechnologies.map((technology) => ({
          label: technology.technologyName,
          value: technology.technologyId,
        })),
        ...(fromTech?.id === "NA" ? [{ label: "NA", value: "NA" }] : []),
      ] ?? []
    );
  }, [fromTech, toTechnologies]);

  const fromTechChangeHandler = (value: string, id: string, label: string) => {
    if (value === "NA") {
      setToTech({ name: "NA", id: "NA" });
    } else if (toTech?.id === "NA") {
      setToTech({ name: null, id: null });
    }

    setFromTech({ name: label, id: value });

    if (value === "NA") {
      onNA?.(componentId);
    } else {
      onComponentDataChange?.({
        componentId: componentId,
        componentName: componentName,
        fromTech: value,
        fromTechName: label,
        toTech: toTech?.id ?? "",
        toTechName: toTech?.name ?? "",
      });
    }
  };

  const toTechChangeHandler = (value: string, id: string, label: string) => {
    setToTech({ name: label, id: value });

    onComponentDataChange?.({
      componentId: componentId,
      componentName: componentName,
      fromTech: fromTech?.id ?? "",
      fromTechName: fromTech?.name ?? "",
      toTech: value,
      toTechName: label,
    });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex-[1.3] flex items-center gap-8">
        <h4 className="text-theme-secondary-600 font-medium">
          {componentName}
        </h4>
      </div>

      <div className="flex-[5] flex gap-4">
        <Dropdown
          value={fromTech?.id}
          options={[...fromTechnologiesOptions, { label: "NA", value: "NA" }]}
          size="md"
          theme="primary"
          label="Source Tech"
          changeEvent={fromTechChangeHandler}
          required
        />

        <Dropdown
          value={toTech?.id}
          options={toTechnologiesOptions}
          size="md"
          theme="primary"
          label="Target Tech"
          disabled={fromTech?.id === "NA"}
          changeEvent={toTechChangeHandler}
          required
        />
      </div>
    </div>
  );
}

export default MigrationTypeComponent;
