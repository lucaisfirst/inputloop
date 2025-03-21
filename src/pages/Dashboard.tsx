
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { FileText, Upload, TrendingUp, Users, MessageSquareText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AIChatbot from "@/components/ai/AIChatbot";

// Sample data for charts
const revenueData = [
  { month: "1월", revenue: 3200 },
  { month: "2월", revenue: 4500 },
  { month: "3월", revenue: 4200 },
  { month: "4월", revenue: 5800 },
  { month: "5월", revenue: 6100 },
  { month: "6월", revenue: 7300 },
];

const projectData = [
  { type: "사업계획서", count: 12 },
  { type: "공공입찰", count: 8 },
  { type: "IR 자료", count: 5 },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock documents for previous business plans
  const documents = [
    { id: 1, title: "2023년 기술개발 사업계획서", date: "2023-11-15", type: "사업계획서" },
    { id: 2, title: "스마트팩토리 구축 공공입찰", date: "2023-09-22", type: "공공입찰" },
    { id: 3, title: "시리즈 A 투자유치 IR", date: "2024-01-08", type: "IR 자료" },
    { id: 4, title: "AI 솔루션 사업계획서", date: "2024-02-12", type: "사업계획서" },
    { id: 5, title: "해외시장 진출 전략 사업계획서", date: "2024-03-05", type: "사업계획서" },
  ];

  // Mock products
  const products = [
    { id: 1, name: "스마트팩토리 솔루션", description: "제조업 효율화를 위한 통합 IoT 플랫폼" },
    { id: 2, name: "AI 품질관리 시스템", description: "딥러닝 기반 제품 불량 감지 시스템" },
    { id: 3, name: "스마트 센서 네트워크", description: "제조환경 모니터링을 위한 센서 통합 솔루션" },
  ];

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    doc.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chartConfig = {
    revenue: {
      label: "매출액",
      theme: {
        light: "#4f46e5",
        dark: "#818cf8",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              환영합니다, {user?.name || "고객님"}
            </h1>
            <p className="text-gray-600">
              Refinery와 함께 사업계획서 및 입찰 문서를 효율적으로 관리하세요
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">개요</TabsTrigger>
              <TabsTrigger value="documents">문서</TabsTrigger>
              <TabsTrigger value="products">주요 제품</TabsTrigger>
              <TabsTrigger value="ai-chat">AI 어시스턴트</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-500">진행 중인 프로젝트</p>
                      <FileText className="h-5 w-5 text-indigo-500" />
                    </div>
                    <h4 className="text-2xl font-bold mt-2 tracking-tight">12</h4>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-500">완료율</p>
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <h4 className="text-2xl font-bold mt-2 tracking-tight">68%</h4>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-500">작업자</p>
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <h4 className="text-2xl font-bold mt-2 tracking-tight">8</h4>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-500">월 매출 (백만원)</p>
                      <TrendingUp className="h-5 w-5 text-purple-500" />
                    </div>
                    <h4 className="text-2xl font-bold mt-2 tracking-tight">24.5</h4>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>매출 현황</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip 
                              content={<ChartTooltipContent />} 
                            />
                            <Bar dataKey="revenue" name="revenue" fill="var(--color-revenue)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>프로젝트 유형</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={projectData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <ChartTooltip 
                              content={<ChartTooltipContent />} 
                            />
                            <Bar dataKey="count" name="count" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>기존 사업계획서 및 문서</CardTitle>
                    <Button onClick={() => navigate('/task-board')} className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      문서 업로드
                    </Button>
                  </div>
                  <div className="mt-4">
                    <Input
                      placeholder="문서 검색..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="max-w-md"
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map((doc) => (
                        <div key={doc.id} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200">
                          <div>
                            <h4 className="font-medium">{doc.title}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-500">{doc.date}</span>
                              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{doc.type}</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">보기</Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">검색 결과가 없습니다.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>주요 제품</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <Card key={product.id}>
                        <CardContent className="p-6">
                          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                          <p className="text-gray-600 text-sm">{product.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai-chat">
              <AIChatbot />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
