"use client";

import { AuthProvider } from "@/src/lib/auth/AuthContext";

type Props = {
  children: React.ReactNode;
  user: {
    id: string;
    username: string;
    role: "user" | "admin";
  } | null;
};

export default function AuthWrapper({ children, user }: Props) {
  return (
    <AuthProvider
      value={{
        userId: user?.id,
        username: user?.username,
        role: user?.role,
      }}
    >
      {children}
    </AuthProvider>
  );
}
