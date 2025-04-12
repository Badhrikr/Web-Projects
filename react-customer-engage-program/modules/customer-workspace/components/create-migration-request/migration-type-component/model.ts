import { CreateMigrationRequestTechnologies } from "../../../services/model.request";
import { GetComponentsResponse } from "../../../services/model.response";

export interface MigrationTypeComponentProps extends GetComponentsResponse {
    onNA?(componentId: string): void;
    onComponentDataChange?(data: CreateMigrationRequestTechnologies): void;
}