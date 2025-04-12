import { ChatHistoryProps } from "./model";

function ChatHistory({ chats }: ChatHistoryProps) {
  console.log(chats);

  return (
    <div className="flex flex-col-reverse flex-1 overflow-auto gap-4 w-full">
      {chats.map((chat) => (
        <div
          className={`w-full flex ${
            chat.isBotReply ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`text-sm max-w-[60%] w-fit p-2 rounded-md ${
              chat?.isBotReply
                ? " bg-theme-button-elevate text-theme-secondary "
                : " bg-theme-secondary text-theme-primary "
            }`}
            dangerouslySetInnerHTML={{ __html: chat.message }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export default ChatHistory;
