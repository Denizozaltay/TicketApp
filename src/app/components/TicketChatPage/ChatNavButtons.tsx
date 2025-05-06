"use client";

import { LogIn, Monitor, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ChatNavButtons() {
  const router = useRouter();

  return (
    <Link
    href={"/my-tickets"}>
      <div className="flex gap-2">
        <button
          onClick={() => {}} // my ticketsa yonlendirecek
          className="cursor-pointer flex flex-row items-center gap-1 text-s text-blue-500 border border-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
        >
          <Monitor
          size={14}/>My Tickets
        </button>
      </div>
    </Link>
  );
}
