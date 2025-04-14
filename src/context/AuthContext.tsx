
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AuthState } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
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

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      // Simulate successful login for demo
      if (email && password) {
        const mockUser: User = {
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

  const register = async (email: string, password: string, name?: string) => {
    try {
      // In a real app, this would be an API call
      // Simulate successful registration for demo
      if (email && password) {
        const mockUser: User = {
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
