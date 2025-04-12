import { GetMigrationRequestsForCustomerResponse } from "../../../services/model.response";

export interface MigrationRequestWidgetProps extends GetMigrationRequestsForCustomerResponse {
    customerId: string;
}