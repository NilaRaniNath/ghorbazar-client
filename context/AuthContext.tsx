"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "user" | "admin";
  favorites?: string[];
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user && !!token;

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
  }, []);

  const fetchUser = useCallback(async (authToken: string) => {
    try {
      const response = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.data.success) {
        setUser(response.data.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    if (response.data.success) {
      const { user: userData, token: authToken } = response.data.data;
      localStorage.setItem("token", authToken);
      setToken(authToken);
      setUser(userData);
      router.push("/");
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    const response = await api.post<AuthResponse>("/auth/register", {
      name,
      email,
      password,
      phone,
    });

    if (response.data.success) {
      const { user: userData, token: authToken } = response.data.data;
      localStorage.setItem("token", authToken);
      setToken(authToken);
      setUser(userData);
      router.push("/");
    }
  };

  const demoLogin = async () => {
    const response = await api.post<AuthResponse>("/auth/demo-login");

    if (response.data.success) {
      const { user: userData, token: authToken } = response.data.data;
      localStorage.setItem("token", authToken);
      setToken(authToken);
      setUser(userData);
      router.push("/");
    }
  };

  const googleLogin = async (credential: string) => {
    const response = await api.post<AuthResponse>("/auth/google", { credential });

    if (response.data.success) {
      const { user: userData, token: authToken } = response.data.data;
      localStorage.setItem("token", authToken);
      setToken(authToken);
      setUser(userData);
      router.push("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        register,
        demoLogin,
        googleLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return {
      user: null,
      token: null,
      isLoading: true,
      isAuthenticated: false,
      login: async () => {},
      register: async () => {},
      demoLogin: async () => {},
      googleLogin: async () => {},
      logout: () => {},
      updateUser: () => {},
    };
  }
  return context;
}
