import { GetMembersResponse } from "../../../../services/model.response";

export interface MembersAddProps {
    members: GetMembersResponse[];
    addedMembers: GetMembersResponse[];
    onMemberAdd?(addedMember: GetMembersResponse): void;
    onLastPersonRemove?(): void;
}