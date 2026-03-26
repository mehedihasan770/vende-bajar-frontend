"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getBrowserUser } from "@/utils/getBrowserUser";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface UserType {
  id?: string;
  fullName?: string;
  email?: string;
  role?: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  logout: () => void;
  loading: boolean;
  refreshUser: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const data = getBrowserUser();
    setTimeout(() => {
      setUser(data);
    setLoading(false);
    },0)
  }, []);

  const logout = () => {
    Cookies.remove("vende_token", { path: '/' });
    setUser({ isLoggedIn: false });
    router.refresh();
  };

  const refreshUser = () => {
    const data = getBrowserUser();
    setUser(data); 
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};