"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
    >
      Logout
    </button>
  );
}
