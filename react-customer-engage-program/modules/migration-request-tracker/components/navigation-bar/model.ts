import { NavigationTabs } from "../../enums";

export interface NavigationBarProps {
    onTabChange?(tab: NavigationTabs): void;
    hideActions?: boolean;
    hasReadonlyAccess?: boolean;
}