import { cancel } from "../../../../helpers/icons";
import Icon from "../../../../ui-components/Icon";
import { FilterChipProps } from "./model";

function FilterChip({ title, filterText, onRemove }: FilterChipProps) {
  return (
    <div className="flex gap-2 items-center bg-[rgba(15,82,186,0.1)] px-2 py-1 rounded-md">
      <span className="text-sm text-theme-secondary"> {title}: </span>
      <span className="text-sm text-theme-secondary font-semibold">
        {filterText}
      </span>
      <button onClick={onRemove}>
        <Icon icon={cancel} size="sm" theme="secondary" />
      </button>
    </div>
  );
}

export default FilterChip;
