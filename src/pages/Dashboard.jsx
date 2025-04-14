
import React from "react";
import AppHeader from "@/components/layout/AppHeader";
import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";

/**
 * Dashboard page component
 * @returns {React.FC} React Function Component
 */
const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
      <AppHeader />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <TaskForm />
          </div>
          <div className="md:col-span-2">
            <TaskList />
          </div>
        </div>
      </main>
      
      <footer className="bg-white dark:bg-gray-900 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
