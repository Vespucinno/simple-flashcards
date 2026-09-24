"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  id?: string;
  email?: string;
  username?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated) {
          setIsLoggedIn(true);
          setUser(data.user || null);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Auth validation error:", error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, loading, setIsLoggedIn, checkAuth, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

