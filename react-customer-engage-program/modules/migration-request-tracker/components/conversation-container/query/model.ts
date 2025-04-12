import { MigrationRequestQuery } from "../../../model";
import { GetConversationResponse } from "../../../services/model.response";

export interface QueryProps {
    userName: string;
    query: MigrationRequestQuery;
    repliedTo?: GetConversationResponse | null;
    loggedOn: string;
    onReply?(): void;
}