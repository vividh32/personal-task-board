
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * AuthProvider component for managing authentication state
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components
 * @returns {React.FC} React Function Component
 */
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("taskUser");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error("Failed to parse saved user", error);
        localStorage.removeItem("taskUser");
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call
      // Simulate successful login for demo
      if (email && password) {
        const mockUser = {
          id: "user1",
          email,
          name: email.split("@")[0],
        };
        
        localStorage.setItem("taskUser", JSON.stringify(mockUser));
        
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
        });
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${mockUser.name || mockUser.email}!`,
        });
      } else {
        throw new Error("Email and password are required");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (email, password, name) => {
    try {
      // In a real app, this would be an API call
      // Simulate successful registration for demo
      if (email && password) {
        const mockUser = {
          id: "user" + Date.now(),
          email,
          name: name || email.split("@")[0],
        };
        
        localStorage.setItem("taskUser", JSON.stringify(mockUser));
        
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
        });
        
        toast({
          title: "Registration successful",
          description: `Welcome, ${mockUser.name || mockUser.email}!`,
        });
      } else {
        throw new Error("Email and password are required");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("taskUser");
    localStorage.removeItem("tasks");
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
