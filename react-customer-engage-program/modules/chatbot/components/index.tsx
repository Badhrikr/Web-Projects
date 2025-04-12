import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { chat } from "../../../helpers/icons";
import Icon from "../../../ui-components/Icon";
import IconButton from "../../../ui-components/IconButton";
import * as Services from "../services";
import { ChatBotResponse } from "../services/model.response";
import ChatHeader from "./chat-header";
import ChatHistory from "./chat-history";
import Chatbox from "./chatbox";
import { Chat } from "./model";
import QuerySuggestions from "./query-suggestions";

function ChatbotContainer() {
  const [expand, setExpand] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<Chat[]>([]);

  const expandToggle = () => {
    setExpand((prev) => !prev);
  };

  const splitSentences = (output: string): string[] => {
    let replyList: string[] = [];
    let count = 0;
    let _output = output;

    const separator = ".";
    let dotIndex = output.indexOf(separator);
    let startIndex = 0;

    while (dotIndex && dotIndex !== -1 && count < 50) {
      let sentence = output.substring(startIndex, dotIndex + 1);
      replyList = [sentence, ...replyList];

      output = output.substring(dotIndex + 1);
      dotIndex = output.indexOf(separator);

      count++;
    }

    return replyList.length > 0 ? replyList : [_output];
  };

  const sentSuccess = ({ output }: ChatBotResponse) => {
    if (!output) return;

    output = output.replace(/.{1}\n/gi, "<br />")
    let replyList = splitSentences(output);

    console.log(replyList);

    setConversation((prev) => [
      ...replyList.map((reply) => ({ message: reply, isBotReply: true })),
      ...prev,
    ]);
    setLoading(false);
  };

  const sentError = () => {
    setLoading(false);
  };

  const sendHandler = (message: string) => {
    setLoading(true);
    setConversation((prev) => [{ message }, ...prev]);

    Services.ChatBot({
      input: message,
      success: sentSuccess,
      error: sentError,
    });
  };

  return (
    <div className="relative flex flex-col gap-4">
      <CSSTransition in={expand} timeout={150} unmountOnExit classNames="flyx">
        <div className="shadow-lg w-[490px] px-3 py-4 bg-theme-background-popup rounded-xl">
          <ChatHeader />
          <div className="h-[45vh] flex flex-col gap-2 pt-2 pb-6">
            {conversation.length > 0 ? (
              <ChatHistory chats={conversation} />
            ) : (
              <QuerySuggestions onQuestionClick={sendHandler} />
            )}
            {loading && <ReplyLoading />}
          </div>
          <Chatbox loading={loading} onSubmit={sendHandler} />
        </div>
      </CSSTransition>

      <div className="flex gap-2 justify-end">
        <IconButton onClick={expandToggle} size="xl" theme="secondary">
          <Icon icon={chat} size="lg" theme="primary" />
        </IconButton>
      </div>
    </div>
  );
}

export const ReplyLoading = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      height={50}
      width={50}
      enable-background="new 0 0 0 0"
      xmlSpace="preserve"
    >
      <circle fill="#e15b64" stroke="none" cx="6" cy="50" r="6">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 15 ; 0 -15; 0 15"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle fill="#f8b26a" stroke="none" cx="30" cy="50" r="6">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 10 ; 0 -10; 0 10"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle fill="#abbd81" stroke="none" cx="54" cy="50" r="6">
        <animateTransform
          attributeName="transform"
          dur="1s"
          type="translate"
          values="0 5 ; 0 -5; 0 5"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </svg>
  );
};

export default ChatbotContainer;
