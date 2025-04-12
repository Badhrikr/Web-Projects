import { POST_CHATBOT } from "../../../common/api-routes";
import { Api } from "../../../common/http-service";
import { ChatBotRequest } from "./model.request";
import { ChatBotResponse } from "./model.response";

const api = new Api();

export function ChatBot({ input, success, error }: ChatBotRequest): Promise<ChatBotResponse> {
    return api.post({
        url: POST_CHATBOT,
        body: { input },
        success,
        error
    })
}