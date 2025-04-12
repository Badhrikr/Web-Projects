import { CustomersFilterProps } from "../../../model";

export interface CustomersApplyFilterProps extends CustomersFilterProps {
    onApply?(props: CustomersFilterProps): void;
    onReset?(): void;
}
