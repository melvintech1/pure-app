import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = "https://pure-app-production.up.railway.app/api/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const sessionUser = localStorage.getItem("pure_session_user");
    if (sessionUser) {
      try {
        setUser(JSON.parse(sessionUser));
      } catch {
        localStorage.removeItem("pure_session_user");
        localStorage.removeItem("pure_token");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mengirim request ke Backend
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        return { success: false, error: data.message || "Gagal login" };
      }

      localStorage.setItem("pure_token", data.token);
      localStorage.setItem("pure_session_user", JSON.stringify(data.user));
      setUser(data.user);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Tidak dapat terhubung ke server backend" };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        return { success: false, error: data.message || "Gagal mendaftar" };
      }

      return await login(email, password);
    } catch (error) {
      return { success: false, error: "Tidak dapat terhubung ke server backend" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pure_token");
    localStorage.removeItem("pure_session_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}