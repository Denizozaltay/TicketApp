"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });

    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex flex-row items-center gap-1 cursor-pointer text-s w-auto text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
    >
      <LogOut size={14} /> Logout
    </button>
  );
}
