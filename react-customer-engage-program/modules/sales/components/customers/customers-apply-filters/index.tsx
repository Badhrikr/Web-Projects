import { useState } from "react";
import Button from "../../../../../ui-components/Button";
import Radiobutton from "../../../../../ui-components/Radiobutton";
import { SortField, SortOrder, Status } from "../../../enums";
import { CustomersFilterProps } from "../../../model";
import { CustomersApplyFilterProps } from "./model";

function CustomersApplyFilters({
  onApply,
  onReset,
  ...props
}: CustomersApplyFilterProps) {
  const [details, setDetails] = useState<CustomersFilterProps>(props);

  const filterChangeHandler = (value: any, id: string) => {
    setDetails({ ...details, [id]: value });
  };

  const applyFiltersHandler = () => {
    onApply?.(details);
  };

  return (
    <div className="text-theme-secondary h-full min-w-[300px] flex flex-col gap-5 bg-theme-background-popup shadow-2xl px-3 py-5">
      <div className="flex gap-2 justify-between items-center py-2">
        <h4 className="font-secondary font-semibold">Filter by</h4>
        <span
          className="text-sm cursor-pointer tracking-wide text-[#458eff] font-semibold"
          onClick={onReset}
        >
          Reset filters
        </span>
      </div>

      <div className="overflow-auto hide-scrollbar py-4 flex flex-1 flex-col gap-8">
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
      </div>

      <div className="[&>div]:w-full">
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

export default CustomersApplyFilters;
