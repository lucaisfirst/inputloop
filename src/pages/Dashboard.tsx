
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name || "User"}
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your business plans today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder Stats */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <h4 className="text-2xl font-bold mt-2 tracking-tight">12</h4>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <h4 className="text-2xl font-bold mt-2 tracking-tight">68%</h4>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm font-medium text-gray-500">Team Members</p>
              <h4 className="text-2xl font-bold mt-2 tracking-tight">8</h4>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm font-medium text-gray-500">Budget Used</p>
              <h4 className="text-2xl font-bold mt-2 tracking-tight">$24,500</h4>
            </div>
          </div>
          
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500">Your projects will appear here.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
