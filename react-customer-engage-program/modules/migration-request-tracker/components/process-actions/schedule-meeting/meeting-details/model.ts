import { GetMembersResponse } from "../../../../services/model.response";

export interface MeetingDetailsProps {
    migrationRequestId: string;
    loading?: boolean;
    onSubmit?(meetingDetails: MeetingDetailsData, addedMembers: GetMembersResponse[]): void;
    onCancel?(): void;
}

export interface MeetingDetailsData {
    subject: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
}