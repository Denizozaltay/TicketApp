"use client";

import { createContext, useContext } from "react";

type AuthContextType = {
  userId?: string;
  username?: string;
  role?: "user" | "admin";
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AuthContextType;
}) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
