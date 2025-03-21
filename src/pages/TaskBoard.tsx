
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";

const TaskBoard = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Task Board
            </h1>
            <p className="text-gray-600">
              Manage and track your business planning tasks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* To Do Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm flex items-center">
                  To Do
                  <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                    2
                  </span>
                </h3>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-medium text-sm mb-2">Executive Summary</h4>
                <p className="text-xs text-gray-500 mb-3">
                  Write the executive summary section for the business plan.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                      High
                    </span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                    MK
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-medium text-sm mb-2">Marketing Strategy</h4>
                <p className="text-xs text-gray-500 mb-3">
                  Outline marketing channels, budget allocation, and campaign ideas.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="border border-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded">
                      Low
                    </span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                    JP
                  </div>
                </div>
              </div>
            </div>
            
            {/* In Progress Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm flex items-center">
                  In Progress
                  <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                    2
                  </span>
                </h3>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-medium text-sm mb-2">Market Analysis</h4>
                <p className="text-xs text-gray-500 mb-3">
                  Research and document market trends, competitors, and target audience.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                      High
                    </span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                    JP
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-medium text-sm mb-2">Financial Projections</h4>
                <p className="text-xs text-gray-500 mb-3">
                  Develop 3-year financial projections including income statement, balance sheet and cash flow.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded">
                      Medium
                    </span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                    EL
                  </div>
                </div>
              </div>
            </div>
            
            {/* Review Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm flex items-center">
                  Review
                  <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                    1
                  </span>
                </h3>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-medium text-sm mb-2">Competitive Analysis</h4>
                <p className="text-xs text-gray-500 mb-3">
                  Analyze top 5 competitors and create SWOT analysis for each.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded">
                      Medium
                    </span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                    MK
                  </div>
                </div>
              </div>
            </div>
            
            {/* Completed Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm flex items-center">
                  Completed
                  <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                    2
                  </span>
                </h3>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-medium text-sm mb-2">Operations Plan</h4>
                <p className="text-xs text-gray-500 mb-3">
                  Document operational processes, facility needs, and supply chain.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded">
                      Medium
                    </span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                    HJ
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h4 className="font-medium text-sm mb-2">Management Team</h4>
                <p className="text-xs text-gray-500 mb-3">
                  Create bios and role descriptions for key team members.
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="border border-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded">
                      Low
                    </span>
                  </div>
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                    EL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TaskBoard;
