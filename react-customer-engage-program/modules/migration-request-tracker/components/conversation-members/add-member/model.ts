import { CreateMembersRequest } from "../../../services/model.request";

export interface AddMemberProps {
    migrationRequestId: string;
    customerId: string;
    onSubmit?(data: CreateMembersRequest): void;
}