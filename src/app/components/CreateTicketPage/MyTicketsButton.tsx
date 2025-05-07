"use client";

import { ChevronLeft, Monitor } from "lucide-react";
import Link from "next/link";

export default function MyTicketsButton() {
  return (
      <Link href={"/my-tickets"}>
        <div className="flex gap-2">
          <button className="cursor-pointer flex flex-row items-center gap-1 text-s text-blue-500 border border-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition">
            <Monitor size={14} />
            My Tickets
          </button>
        </div>
      </Link>
  );
}
