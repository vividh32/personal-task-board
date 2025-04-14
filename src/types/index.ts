
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  userId: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
