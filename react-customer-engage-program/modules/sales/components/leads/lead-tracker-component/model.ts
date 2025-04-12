import { GetLeadTrackerByIdResponse } from "../../../services/model.response";

export interface LeadTrackerComponentProps extends GetLeadTrackerByIdResponse {
    index: number;
    trackerListLength: number;
}
