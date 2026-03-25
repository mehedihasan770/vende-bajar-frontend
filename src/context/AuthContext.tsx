"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getBrowserUser } from "@/utils/getBrowserUser";
import Cookies from "js-cookie";

const AuthContext = createContext<unknown>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

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

export const useAuth = () => useContext(AuthContext);