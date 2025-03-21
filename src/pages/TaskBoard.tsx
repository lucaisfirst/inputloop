
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  MessageSquare, 
  ChevronDown, 
  Mail, 
  AlertCircle,
  PlusCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TaskBoard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Mock task data with comments
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "사업계획서 - 집행 요약",
      description: "사업계획서의 집행 요약 섹션 작성",
      status: "todo",
      priority: "high",
      assignee: "MK",
      comments: [
        { id: 1, user: "관리자", text: "집행 요약은 2페이지 내외로 작성해 주세요.", timestamp: "2023-11-15 14:30" }
      ],
      files: []
    },
    {
      id: 2,
      title: "마케팅 전략",
      description: "마케팅 채널, 예산 할당 및 캠페인 아이디어 개요",
      status: "todo",
      priority: "low",
      assignee: "JP",
      comments: [],
      files: []
    },
    {
      id: 3,
      title: "시장 분석",
      description: "시장 동향, 경쟁사 및 목표 고객 조사 및 문서화",
      status: "in-progress",
      priority: "high",
      assignee: "JP",
      comments: [
        { id: 2, user: "고객", text: "최근 경쟁사 동향도 포함해 주세요.", timestamp: "2023-11-16 10:15" },
        { id: 3, user: "관리자", text: "네, 반영하겠습니다.", timestamp: "2023-11-16 11:30" }
      ],
      files: []
    },
    {
      id: 4,
      title: "재무 예측",
      description: "3년 재무 예측 개발(손익계산서, 대차대조표, 현금흐름표 포함)",
      status: "in-progress",
      priority: "medium",
      assignee: "EL",
      comments: [],
      files: []
    },
    {
      id: 5,
      title: "경쟁 분석",
      description: "상위 5개 경쟁업체 분석 및 각각에 대한 SWOT 분석 작성",
      status: "review",
      priority: "medium",
      assignee: "MK",
      comments: [],
      files: []
    },
    {
      id: 6,
      title: "운영 계획",
      description: "운영 프로세스, 시설 요구 사항 및 공급망 문서화",
      status: "completed",
      priority: "medium",
      assignee: "HJ",
      comments: [],
      files: []
    },
    {
      id: 7,
      title: "관리 팀",
      description: "주요 팀원의 약력 및 역할 설명 작성",
      status: "completed",
      priority: "low",
      assignee: "EL",
      comments: [],
      files: []
    }
  ]);

  const addComment = (taskId: number) => {
    if (!commentText.trim()) {
      toast({
        title: "댓글을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          comments: [
            ...task.comments, 
            {
              id: Date.now(),
              user: user?.name || "고객",
              text: commentText,
              timestamp: new Date().toLocaleString()
            }
          ]
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setCommentText("");
    
    // 이메일 알림을 보내는 기능을 시뮬레이션
    toast({
      title: "댓글이 추가되었습니다",
      description: "담당자에게 이메일 알림이 전송되었습니다.",
    });
  };

  const sendEmailNotification = (taskId: number) => {
    toast({
      title: "이메일 알림 전송됨",
      description: "이 태스크에 대한 알림이 고객에게 전송되었습니다.",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const uploadFiles = (taskId: number) => {
    if (selectedFiles.length === 0) {
      toast({
        title: "파일을 선택해주세요",
        variant: "destructive",
      });
      return;
    }

    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          files: [...task.files, ...selectedFiles.map(file => file.name)]
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setSelectedFiles([]);
    
    toast({
      title: "파일 업로드 완료",
      description: `${selectedFiles.length}개의 파일이 업로드되었습니다.`,
    });
  };

  const addNewTask = () => {
    if (!newTaskTitle.trim()) {
      toast({
        title: "제목을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      description: newTaskDescription,
      status: "todo",
      priority: newTaskPriority,
      assignee: user?.name?.substring(0, 2) || "신규",
      comments: [],
      files: []
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskPriority("medium");
    setShowNewTaskDialog(false);
    
    toast({
      title: "새 태스크가 생성되었습니다",
      description: "모든 담당자에게 이메일 알림이 전송되었습니다.",
    });
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case "todo": return "할 일";
      case "in-progress": return "진행 중";
      case "review": return "검토 중";
      case "completed": return "완료";
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">높음</span>;
      case "medium": return <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded">중간</span>;
      case "low": return <span className="border border-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded">낮음</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                작업 보드
              </h1>
              <p className="text-gray-600">
                사업계획 및 입찰 문서 작업을 관리하고 추적하세요
              </p>
            </div>
            <Button onClick={() => setShowNewTaskDialog(true)} className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              새 태스크
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["todo", "in-progress", "review", "completed"].map((status) => (
              <div key={status} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm flex items-center">
                    {getStatusName(status)}
                    <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                      {tasks.filter(t => t.status === status).length}
                    </span>
                  </h3>
                </div>
                
                {tasks
                  .filter(task => task.status === status)
                  .map(task => (
                    <div 
                      key={task.id} 
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                      <h4 className="font-medium text-sm mb-2">{task.title}</h4>
                      <p className="text-xs text-gray-500 mb-3">
                        {task.description}
                      </p>
                      
                      {task.files.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-600 mb-1">첨부 파일: {task.files.length}개</p>
                          <div className="flex flex-wrap gap-1">
                            {task.files.map((fileName, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                {fileName}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          {getPriorityLabel(task.priority)}
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7"
                                onClick={() => setSelectedTaskId(task.id)}
                              >
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>{task.title} - 댓글</DialogTitle>
                              </DialogHeader>
                              <div className="max-h-[300px] overflow-y-auto mb-4">
                                {task.comments.length > 0 ? (
                                  <div className="space-y-3">
                                    {task.comments.map(comment => (
                                      <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                          <span className="font-medium">{comment.user}</span>
                                          <span>{comment.timestamp}</span>
                                        </div>
                                        <p className="text-sm">{comment.text}</p>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-center text-gray-500 py-4">아직 댓글이 없습니다.</p>
                                )}
                              </div>
                              <div className="space-y-3">
                                <Textarea
                                  placeholder="댓글을 작성하세요..."
                                  value={commentText}
                                  onChange={(e) => setCommentText(e.target.value)}
                                />
                                <div className="flex justify-between">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => sendEmailNotification(task.id)}
                                    className="flex items-center gap-1"
                                  >
                                    <Mail className="h-3 w-3" />
                                    이메일 알림
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={() => addComment(task.id)}
                                  >
                                    댓글 추가
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7"
                                onClick={() => setSelectedTaskId(task.id)}
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>{task.title} - 파일 업로드</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                  <Input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                  />
                                  <p className="text-xs text-gray-500">
                                    최대 5MB까지 업로드 가능합니다.
                                  </p>
                                </div>
                                
                                {selectedFiles.length > 0 && (
                                  <div>
                                    <p className="text-sm font-medium mb-2">선택된 파일:</p>
                                    <ul className="text-sm space-y-1">
                                      {selectedFiles.map((file, idx) => (
                                        <li key={idx} className="text-gray-600">{file.name}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                                <Button 
                                  onClick={() => uploadFiles(task.id)}
                                  className="w-full"
                                >
                                  업로드
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <div className="h-7 w-7 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                            {task.assignee}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>새 태스크 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="task-title" className="text-sm font-medium">제목</label>
              <Input
                id="task-title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="태스크 제목"
              />
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <label htmlFor="task-description" className="text-sm font-medium">설명</label>
              <Textarea
                id="task-description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="태스크 설명"
              />
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <label htmlFor="task-priority" className="text-sm font-medium">우선 순위</label>
              <select
                id="task-priority"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="high">높음</option>
                <option value="medium">중간</option>
                <option value="low">낮음</option>
              </select>
            </div>
            
            <Button 
              onClick={addNewTask}
              className="w-full"
            >
              태스크 추가
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskBoard;
