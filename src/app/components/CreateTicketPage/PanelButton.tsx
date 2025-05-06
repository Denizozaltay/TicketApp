"use client";

import { Monitor } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PanelButton() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push("/admin")}
        className="cursor-pointer flex flex-row items-center gap-1 text-s text-purple-600 border border-purple-600 px-3 py-1 rounded hover:bg-purple-600 hover:text-white transition"
      >
        <Monitor size={14} />
        Panel
      </button>
    </div>
  );
}
