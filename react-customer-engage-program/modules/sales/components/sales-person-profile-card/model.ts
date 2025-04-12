import { GetSalesPersonsResponse } from "../../../../shared/services/model.response";

export interface SalesPersonProfileCardProps extends GetSalesPersonsResponse {
    onPersonSelect?(response: GetSalesPersonsResponse): void;
}
