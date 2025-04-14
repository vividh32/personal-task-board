import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useToast } from "@/components/ui/use-toast";

const TaskContext = createContext(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

/**
 * TaskProvider component for managing tasks state
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.FC} React Function Component
 */
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Load tasks from localStorage when the component mounts or user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks);
          // Filter tasks for the current user
          const userTasks = parsedTasks.filter(task => task.userId === user.id);
          setTasks(userTasks);
        } catch (error) {
          console.error("Failed to parse saved tasks", error);
          localStorage.removeItem("tasks");
        }
      }
    } else {
      // Clear tasks when logged out
      setTasks([]);
    }
  }, [isAuthenticated, user]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && user) {
      // Get all existing tasks for other users
      const savedTasks = localStorage.getItem("tasks");
      let allTasks = [];
      
      if (savedTasks) {
        try {
          const parsedTasks = JSON.parse(savedTasks);
          // Keep tasks that don't belong to the current user
          allTasks = parsedTasks.filter(task => task.userId !== user.id);
        } catch (error) {
          console.error("Failed to parse saved tasks", error);
        }
      }
      
      // Add current user's tasks
      allTasks = [...allTasks, ...tasks];
      localStorage.setItem("tasks", JSON.stringify(allTasks));
    }
  }, [tasks, isAuthenticated, user]);

  const addTask = (taskData) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to add tasks.",
        variant: "destructive",
      });
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    
    toast({
      title: "Task added",
      description: "Your task has been successfully added.",
    });
  };

  const editTask = (id, updates) => {
    if (!isAuthenticated) {
      return;
    }

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
    
    toast({
      title: "Task updated",
      description: "Your task has been successfully updated.",
    });
  };

  const deleteTask = (id) => {
    if (!isAuthenticated) {
      return;
    }

    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    
    toast({
      title: "Task deleted",
      description: "Your task has been successfully deleted.",
    });
  };

  const toggleTaskCompletion = (id) => {
    if (!isAuthenticated) {
      return;
    }

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    
    const taskCompleted = tasks.find(task => task.id === id)?.completed;
    toast({
      title: taskCompleted ? "Task marked incomplete" : "Task completed",
      description: `Task has been marked as ${taskCompleted ? "incomplete" : "complete"}.`,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
