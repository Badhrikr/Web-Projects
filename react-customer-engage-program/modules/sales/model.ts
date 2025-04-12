import { LeadType } from "../../shared/enums";

export interface FilterProps {
    Offset?: number | null;
    Limit?: number | null;
    SearchText?: string | null;
}

export interface LeadsFilterProps extends FilterProps {
    LeadStatus?: string | null;
    LeadType?: LeadType | null;
    Status?: string | null;
    AssignStatus?: string | null;
    SortOrder?: string | null;
    SortField?: string | null;
    AssignedTo?: string | null;
    SourceTechnology?: string | null;
    TargetTechnology?: string | null;

    // Workaround to display name in filter chip
    SourceTechnologyName?: string | null;
    TargetTechnologyName?: string | null;
}

export interface CustomersFilterProps extends FilterProps {
    Status?: string | null;
    SalesPerson?: string | null
    SortOrder?: string | null;
    SortField?: string | null;
}
