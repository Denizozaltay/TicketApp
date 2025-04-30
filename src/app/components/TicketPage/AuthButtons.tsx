"use client";

import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push("/login")}
        className="text-sm text-blue-500 border border-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
      >
        Login
      </button>
      <button
        onClick={() => router.push("/register")}
        className="text-sm text-green-500 border border-green-500 px-3 py-1 rounded hover:bg-green-500 hover:text-white transition"
      >
        Register
      </button>
    </div>
  );
}
