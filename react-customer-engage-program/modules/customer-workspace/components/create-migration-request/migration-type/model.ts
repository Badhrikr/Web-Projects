import { MigrationType } from "../../../../sales/enums";
import { GetOfferingsResponse, GetOfferingTypesResponse } from "../../../services/model.response";

export interface ChooseMigrationTypeProps {
    selectedMigrationRequestType: GetOfferingsResponse;
    onSelect(migrationType: GetOfferingTypesResponse): void;
}

export interface ChosenMigrationTypeProps {
    migrationType: GetOfferingTypesResponse;
    showResetButton?: boolean;
    onReset?(): void;
}