import { CreateMigrationRequestTechnologies } from "../../../services/model.request";
import { GetOfferingTypesResponse } from "../../../services/model.response";

export interface MigrationTypeComponentsProps {
    selectedMigrationType: GetOfferingTypesResponse;
    onCreate?(data: CreateMigrationRequestTechnologies[]): void;
}