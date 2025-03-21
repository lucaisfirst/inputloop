
import React from "react";
import { RefreshCw } from "lucide-react";
import { Message } from "./types";
import MessageItem from "./Message";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4 my-2">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-lg px-4 py-2 bg-muted text-muted-foreground">
            <div className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              <span>답변 생성 중...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;
