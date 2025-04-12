import { useEffect, useMemo, useState } from "react";
import { LeadType, TechnologyType } from "../../../../../shared/enums";
import {
  GetSalesPersonsResponse,
  GetTechnologiesByTechnologyTypeResponse,
} from "../../../../../shared/services/model.response";
import Button from "../../../../../ui-components/Button";
import Dropdown from "../../../../../ui-components/Dropdown";
import { DropdownOptions } from "../../../../../ui-components/DropdownOption/model";
import Radiobutton from "../../../../../ui-components/Radiobutton";
import {
  AssignStatus,
  LeadStatus,
  SortField,
  SortOrder,
  Status,
} from "../../../enums";
import { LeadsFilterProps } from "../../../model";
import * as SharedServices from "../../../../../shared/services";
import { LeadsApplyFilterProps } from "./model";

function LeadApplyFilters({
  onApply,
  onReset,
  ...props
}: LeadsApplyFilterProps) {
  const [details, setDetails] = useState<LeadsFilterProps>(props);
  const [technologies, setTechnologies] = useState<
    Array<GetTechnologiesByTechnologyTypeResponse>
  >([]);
  const [salesPersons, setSalesPersons] = useState<
    Array<GetSalesPersonsResponse>
  >([]);

  const sourceTechnologies: Array<DropdownOptions> = useMemo(() => {
    return technologies
      .filter(
        ({ technologyType }) =>
          technologyType === TechnologyType.SOURCE_TECHNOLOGY
      )
      .map(({ id, technologyName }) => ({ label: technologyName, value: id }));
  }, [technologies]);

  const targetTechnologies: Array<DropdownOptions> = useMemo(() => {
    return technologies
      .filter(
        ({ technologyType }) =>
          technologyType === TechnologyType.TARGET_TECHNOLOGY
      )
      .map(({ id, technologyName }) => ({ label: technologyName, value: id }));
  }, [technologies]);

  const salesPersonDetails: Array<DropdownOptions> = useMemo(() => {
    return salesPersons.map(({ firstName, lastName, email }) => ({
      label: (
        <div>
          <h4 className="text-theme-secondary font-medium block capitalize text-sm">
            {firstName} {lastName}
          </h4>
          <h4 className="text-theme-secondary-600 text-xs">{email}</h4>
        </div>
      ),
      value: email,
    }));
  }, [salesPersons]);

  const filterChangeHandler = (value: any, id: string) => {
    setDetails({ ...details, [id]: value });
  };

  const applyFiltersHandler = () => {
    onApply?.(details);
  };

  const technologiesFetchSuccess = (
    response: Array<GetTechnologiesByTechnologyTypeResponse>
  ) => {
    // REMOVE
    setTechnologies(response instanceof Array ? response : []);
  };

  const technologiesFetchError = () => {};

  const salesPersonFetchSuccess = (
    response: Array<GetSalesPersonsResponse>
  ) => {
    setSalesPersons(response);
  };

  const salesPersonFetchError = () => {};

  const sourceTechChangeHandler = (
    value: string,
    id: string,
    label: string
  ) => {
    // Added technology name here to display it in the filter chip
    setDetails({ ...details, [id]: value, SourceTechnologyName: label });
  };

  const targetTechChangeHandler = (
    value: string,
    id: string,
    label: string
  ) => {
    // Added technology name here to display it in the filter chip
    setDetails({ ...details, [id]: value, TargetTechnologyName: label });
  };

  useEffect(() => {
    SharedServices.GetTechnologiesByTechnologyType({
      technologyType: [
        TechnologyType.SOURCE_TECHNOLOGY,
        TechnologyType.TARGET_TECHNOLOGY,
      ],
      success: technologiesFetchSuccess,
      error: technologiesFetchError,
    });

    SharedServices.GetSalesPersons({
      success: salesPersonFetchSuccess,
      error: salesPersonFetchError,
    });
  }, []);

  return (
    <div className="text-theme-secondary min-w-[300px] grid gap-5 bg-theme-background-popup shadow-2xl px-3 py-5">
      <div className="flex gap-2 justify-between items-center py-2">
        <h4 className="font-secondary font-semibold">Filter by</h4>
        <span
          className="text-sm cursor-pointer tracking-wide text-[#458eff] font-semibold"
          onClick={onReset}
        >
          Reset filters
        </span>
      </div>

      <div className="overflow-y-auto overflow-x-hidden scrollbar-on-hover py-4 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h5 className="uppercase tracking-wider text-xs font-medium">
            Status
          </h5>
          <div>
            <Radiobutton
              id="Status"
              size="md"
              theme="secondary"
              value={details.Status}
              options={[
                { label: "All", value: null },
                { label: "New", value: Status.NEW },
                { label: "Active", value: Status.ACTIVE },
                { label: "Inactive", value: Status.INACTIVE },
                { label: "Closed", value: Status.CLOSED },
              ]}
              onSelect={filterChangeHandler}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="uppercase tracking-wider text-xs font-medium">
            Assign Status
          </h5>
          <div>
            <Radiobutton
              id="AssignStatus"
              size="md"
              theme="secondary"
              value={details.AssignStatus}
              options={[
                { label: "All", value: null },
                { label: "Assigned", value: AssignStatus.ASSIGNED },
                { label: "Non-Assigned", value: AssignStatus.NON_ASSIGNED },
              ]}
              onSelect={filterChangeHandler}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="uppercase tracking-wider text-xs font-medium">
            Lead Type
          </h5>
          <div>
            <Radiobutton
              id="LeadType"
              size="md"
              theme="secondary"
              value={details.LeadType}
              options={[
                { label: "All", value: null },
                { label: "Demo Request", value: LeadType.DEMO_REQUEST },
                { label: "Content View", value: LeadType.CONTENT_VIEW },
                { label: "CallBack Request", value: LeadType.CALLBACK_REQUEST },
                { label: "Refferal", value: LeadType.REFFERAL },
              ]}
              onSelect={filterChangeHandler}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="uppercase tracking-wider text-xs font-medium">
            Sort by
          </h5>
          <div>
            <Radiobutton
              id="SortField"
              size="md"
              theme="secondary"
              value={details.SortField}
              options={[
                { label: "None", value: null },
                { label: "Name", value: SortField.NAME },
                { label: "Date", value: SortField.DATE },
                { label: "Type", value: SortField.TYPE },
              ]}
              onSelect={filterChangeHandler}
            />
          </div>
        </div>

        <div className="flex gap-4 mb-4">
          <Radiobutton
            id="SortOrder"
            size="md"
            theme="secondary"
            value={details.SortOrder}
            className="!flex-row"
            options={[
              { label: "Asc", value: SortOrder.ASC },
              { label: "Desc", value: SortOrder.DESC },
            ]}
            onSelect={filterChangeHandler}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="uppercase tracking-wider text-xs font-medium">
            Lead status
          </h5>
          <div>
            <Radiobutton
              id="LeadStatus"
              size="md"
              theme="secondary"
              value={details.LeadStatus}
              options={[
                { label: "All", value: null },
                { label: "Qualified", value: LeadStatus.QUALIFIED },
                { label: "Disqualified", value: LeadStatus.DISQUALIFIED },
              ]}
              onSelect={filterChangeHandler}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="uppercase tracking-wider text-xs font-medium">
            Assigned to
          </h5>
          <div>
            <Dropdown
              id="AssignedTo"
              label=""
              value={details.AssignedTo}
              options={[{ label: "None", value: null }, ...salesPersonDetails]}
              size="md"
              theme="primary"
              changeEvent={filterChangeHandler}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="uppercase tracking-wider text-xs font-medium">
            Source Tech
          </h5>
          <div>
            <Dropdown
              id="SourceTechnology"
              label=""
              value={details.SourceTechnology}
              options={[{ label: "None", value: null }, ...sourceTechnologies]}
              size="md"
              theme="primary"
              changeEvent={sourceTechChangeHandler}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="uppercase tracking-wider text-xs font-medium">
            Target Tech
          </h5>

          <div>
            <Dropdown
              id="TargetTechnology"
              label=""
              value={details.TargetTechnology}
              options={[{ label: "None", value: null }, ...targetTechnologies]}
              size="md"
              theme="primary"
              changeEvent={targetTechChangeHandler}
            />
          </div>
        </div>
      </div>

      <div className="block [&>div]:w-full">
        <Button
          onClick={applyFiltersHandler}
          size="md"
          theme="primary"
          className="w-full"
        >
          <span>Apply filters</span>
        </Button>
      </div>
    </div>
  );
}

export default LeadApplyFilters;
