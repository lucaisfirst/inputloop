
import React from "react";
import { Bot, Plus } from "lucide-react";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FileUploadArea from "./FileUploadArea";
import { FileUploadProps } from "./types";

interface ChatHeaderProps extends FileUploadProps {
  onNewConversation: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  uploadedFiles, 
  setUploadedFiles, 
  onNewConversation 
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <CardTitle className="flex items-center text-lg font-semibold">
          <Bot className="mr-2 h-5 w-5" />
          Refinery AI 어시스턴트
        </CardTitle>
        <div className="flex gap-2">
          <FileUploadArea 
            uploadedFiles={uploadedFiles} 
            setUploadedFiles={setUploadedFiles} 
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onNewConversation}
            className="h-8 w-8"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        업로드된 기업 자료와 문서를 바탕으로 질문에 답변해 드립니다.
      </p>
    </>
  );
};

export default ChatHeader;
