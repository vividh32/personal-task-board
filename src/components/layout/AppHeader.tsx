
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, LogOut } from "lucide-react";

const AppHeader: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <CheckCircle className="h-6 w-6 text-task-primary mr-2" />
          <h1 className="text-xl font-bold">Task Manager</h1>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {user.name || user.email}
            </span>
            <Button variant="ghost" size="sm" onClick={logout} className="text-gray-500">
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
