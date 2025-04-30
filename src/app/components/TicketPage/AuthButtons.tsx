"use client";

import { LogIn, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push("/login")}
        className="cursor-pointer flex flex-row items-center gap-1 text-s text-blue-500 border border-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
      >
        <LogIn
        size={14}/>Login
      </button>
      <button
        onClick={() => router.push("/register")}
        className="cursor-pointer flex flex-row items-center gap-1 text-s text-green-500 border border-green-500 px-3 py-1 rounded hover:bg-green-500 hover:text-white transition"
      >
        <UserRound
        size={14}/> Register
      </button>
    </div>
  );
}
