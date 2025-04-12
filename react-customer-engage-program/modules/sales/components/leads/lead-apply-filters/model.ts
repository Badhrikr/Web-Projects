import { LeadsFilterProps } from "../../../model";

export interface LeadsApplyFilterProps extends LeadsFilterProps {
    onApply?(props: LeadsFilterProps): void;
    onReset?(): void;
}
