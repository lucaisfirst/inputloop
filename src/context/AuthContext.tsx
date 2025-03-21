
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define types for our authentication context
type User = {
  id: string;
  email: string;
  name: string;
  role: "client" | "worker" | "admin";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: "client" | "worker") => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication functions (would be replaced with actual API calls)
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, accept any credentials with valid format
  if (!email.includes("@") || password.length < 6) {
    throw new Error("Invalid credentials");
  }
  
  // Create a mock user based on email
  const role = email.includes("admin") 
    ? "admin" 
    : email.includes("worker") 
      ? "worker" 
      : "client";
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name: email.split("@")[0],
    role
  };
};

const mockRegister = async (
  email: string, 
  password: string, 
  name: string, 
  role: "client" | "worker"
): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate inputs
  if (!email.includes("@") || password.length < 6 || !name) {
    throw new Error("Invalid registration data");
  }
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name,
    role
  };
};

// Create a provider for components to consume and subscribe to changes
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on initial load
  useEffect(() => {
    const checkExistingSession = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };

    checkExistingSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const loggedInUser = await mockLogin(email, password);
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      toast.success("Login successful!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (
    email: string, 
    password: string, 
    name: string, 
    role: "client" | "worker"
  ) => {
    setLoading(true);
    setError(null);
    
    try {
      const newUser = await mockRegister(email, password, name, role);
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Registration successful!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  // The context value that will be supplied to any descendants of this provider
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier context consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
