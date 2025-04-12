import { ChatBotResponse } from "./model.response";

export interface ChatBotRequest {
    input: string;
    success?(response: ChatBotResponse): void;
    error?(err: any): void;
}