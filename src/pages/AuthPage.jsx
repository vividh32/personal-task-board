
import React, { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { CheckCircle } from "lucide-react";

/**
 * Authentication page component
 * @returns {React.FC} React Function Component
 */
const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-task-primary mr-2" />
            <h1 className="text-xl font-bold">Task Manager</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800">
        <div className="w-full max-w-md">
          {showLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <RegisterForm onToggleForm={toggleForm} />
          )}
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

export default AuthPage;
