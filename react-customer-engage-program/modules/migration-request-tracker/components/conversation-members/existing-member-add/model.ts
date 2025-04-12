import { GetMembersResponse } from "../../../services/model.response";

export interface ExistingMemberAddProps {
    addedMembers: GetMembersResponse[];
    customerId: string;
    migrationRequestId: string;
    onMemberAdd?(): void;
}