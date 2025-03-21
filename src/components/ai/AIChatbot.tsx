
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, RefreshCw, Plus, Download, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: string;
}

const AIChatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content: "안녕하세요! Refinery AI 어시스턴트입니다. 사업계획서, 공공입찰, IR 자료 작성에 관련된 질문이 있으시면 무엇이든 물어보세요.",
      timestamp: new Date().toLocaleString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      toast({
        title: "파일 업로드 완료",
        description: `${newFiles.length}개의 파일이 분석 대기 중입니다.`,
      });
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    // 사용자 메시지 추가
    const newMessage: Message = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    setIsLoading(true);

    // AI 응답을 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      // 질문에 따른 응답 로직 (실제로는 RAG 기반 응답)
      let aiResponse = "";
      const userQuery = inputMessage.toLowerCase();
      
      if (userQuery.includes("사업계획서") && userQuery.includes("작성")) {
        aiResponse = "사업계획서 작성은 크게 7단계로 나뉩니다: 1) 집행 요약, 2) 회사 소개, 3) 시장 분석, 4) 제품/서비스 설명, 5) 마케팅 전략, 6) 운영 계획, 7) 재무 예측입니다. 업로드하신 기존 문서를 분석해 보니 특히 시장 분석 부분이 잘 작성되어 있습니다. 더 구체적인 부분에 대해 질문해 주시면 도움드리겠습니다.";
      } else if (userQuery.includes("공공입찰") || userQuery.includes("조달")) {
        aiResponse = "공공입찰 참여를 위해서는 먼저 나라장터(G2B)에 업체 등록이 필요합니다. 이후 조달청 입찰공고를 확인하고, 적합한 입찰에 참여할 수 있습니다. 귀사의 업로드된 정보를 바탕으로, 스마트팩토리 관련 공공사업과 AI 품질관리 시스템 분야의 입찰이 적합할 것으로 보입니다. 세부적인 준비사항이 궁금하시면 추가 질문해 주세요.";
      } else if (userQuery.includes("ir") || userQuery.includes("투자")) {
        aiResponse = "IR 자료 작성 시 가장 중요한 부분은 1) 명확한 비즈니스 모델, 2) 시장 기회 및 경쟁 분석, 3) 제품/서비스의 차별점, 4) 실행 가능한 사업 전략, 5) 구체적인 재무 예측입니다. 귀사의 제품 포트폴리오를 살펴보니, AI 품질관리 시스템의 경쟁 우위를 강조하는 것이 효과적일 것 같습니다.";
      } else if (userQuery.includes("재무") || userQuery.includes("예측") || userQuery.includes("매출")) {
        aiResponse = "재무 예측은 매출, 비용, 수익성, 현금흐름을 포함해야 합니다. 귀사의 매출 데이터를 분석해 보니, 최근 6개월간 꾸준한 성장세를 보이고 있습니다. 특히 3월부터 5월까지의 성장률이 15%로, 이 추세를 재무 예측에 반영하는 것이 좋겠습니다. 더 자세한 분석이 필요하시면 추가 데이터를 업로드해 주세요.";
      } else if (userQuery.includes("경쟁") || userQuery.includes("swot")) {
        aiResponse = "귀사의 업로드된 자료를 바탕으로 SWOT 분석을 제안드립니다:\n\n강점(S): 독자적인 AI 품질관리 기술, 전문 인력 보유, 유연한 서비스 커스터마이징\n\n약점(W): 마케팅 인지도 부족, 대규모 프로젝트 경험 제한적\n\n기회(O): 스마트팩토리 시장 성장, 품질관리 자동화 수요 증가, 정부 지원 확대\n\n위협(T): 대기업의 시장 진입, 기술 모방 가능성, 경기 침체 시 투자 축소\n\n이러한 분석을 사업계획서에 포함하면 투자자와 평가자에게 균형 잡힌 시각을 제공할 수 있습니다.";
      } else {
        aiResponse = "질문해 주셔서 감사합니다. 업로드된 문서와 기업 데이터를 바탕으로, 사업계획서, 공공입찰, IR 자료 작성과 관련된 구체적인 질문에 답변드릴 수 있습니다. 좀 더 구체적인 질문을 해주시면 더 정확한 정보를 제공해 드리겠습니다.";
      }

      const aiMessage: Message = {
        id: Date.now(),
        type: "ai",
        content: aiResponse,
        timestamp: new Date().toLocaleString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewConversation = () => {
    setMessages([
      {
        id: Date.now(),
        type: "ai",
        content: "새로운 대화를 시작합니다. 어떤 도움이 필요하신가요?",
        timestamp: new Date().toLocaleString()
      }
    ]);
    setUploadedFiles([]);
    toast({
      title: "새 대화 시작",
      description: "대화 내용이 초기화되었습니다.",
    });
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName));
    toast({
      title: "파일 삭제됨",
      description: `${fileName} 파일이 삭제되었습니다.`,
    });
  };

  return (
    <Card className="relative flex flex-col h-[500px] shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center text-lg font-semibold">
            <Bot className="mr-2 h-5 w-5" />
            Refinery AI 어시스턴트
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="h-4 w-4" />
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={startNewConversation}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          업로드된 기업 자료와 문서를 바탕으로 질문에 답변해 드립니다.
        </p>
        
        {uploadedFiles.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {uploadedFiles.map((file, idx) => (
              <Badge key={idx} variant="secondary" className="flex items-center gap-1 px-2 py-1">
                <span className="text-xs truncate max-w-[120px]">{file.name}</span>
                <button 
                  onClick={() => removeFile(file.name)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <Separator />
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 my-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2 ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <div className="mb-1 text-xs opacity-70">
                {message.type === "user" ? "나" : "AI 어시스턴트"} • {message.timestamp}
              </div>
              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
            </div>
          </div>
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
      </CardContent>
      <CardFooter className="p-3 border-t">
        <div className="flex space-x-2 w-full">
          <Textarea
            placeholder="질문을 입력하세요..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] resize-none"
            disabled={isLoading}
          />
          <Button 
            className="self-end" 
            size="icon"
            disabled={!inputMessage.trim() || isLoading}
            onClick={sendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 w-full">
          Shift + Enter로 줄바꿈, Enter로 전송합니다.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AIChatbot;
