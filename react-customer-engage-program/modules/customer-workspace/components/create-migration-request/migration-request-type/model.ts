import { MigrationRequestType } from "../../../../sales/enums";
import { GetOfferingsResponse } from "../../../services/model.response";

export interface ChooseMigrationRequestTypeProps {
    onSelect(migrationType: GetOfferingsResponse): void;
}

export interface ChosenMigrationTypeProps {
    migrationRequestType: GetOfferingsResponse;
    showResetButton?: boolean;
    onReset?(): void;
}