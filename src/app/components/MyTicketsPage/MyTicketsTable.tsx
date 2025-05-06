"use client";

import Link from "next/link";
import { roboto } from "@/src/lib/fonts";
import { Ticket } from "@/src/types/ticket";
import { useEffect, useState } from "react";

export default function MyTicketsTable() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserTickets();
  }, []);

  async function fetchUserTickets() {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/tickets/user");

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setTickets(data);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch tickets.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      className={`${
        roboto?.className ?? ""
      } flex flex-col items-center min-h-screen bg-gray-50 py-14 px-4`}
    >
      <h1 className="text-[4rem] font-bold text-center bg-gradient-to-b from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent drop-shadow-sm mb-12">
        Your Tickets
      </h1>

      <div className="w-full max-w-6xl bg-white rounded-[22px] shadow-lg ring-1 ring-gray-200 overflow-hidden">
        <div className="grid grid-cols-4 gap-4 bg-sky-50 px-8 py-4 text-gray-700 font-semibold text-sm">
          <span>ID</span>
          <span>Description</span>
          <span>Date</span>
          <span className="text-center">Status</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500"></div>
            <span className="ml-3 text-gray-600">Biletler yükleniyor...</span>
          </div>
        ) : error ? (
          <div className="py-12 px-8 text-center">
            <div className="text-red-500 mb-2">⚠️ Hata</div>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => fetchUserTickets()}
              className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
            >
              Yeniden Dene
            </button>
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-12 px-8 text-center text-gray-500">
            <p>Henüz bilet bulunmamaktadır.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {tickets.map((ticket) => (
              <li key={ticket.id}>
                <Link
                  href={`/tickets/${ticket.id}`}
                  className="grid grid-cols-4 gap-4 items-center px-8 py-4 hover:bg-gray-100 transition-colors"
                >
                  <span className="truncate font-medium text-gray-800">
                    {ticket.id}
                  </span>
                  <span className="text-gray-600">{ticket.title}</span>
                  <span className="text-gray-500">
                    {new Date(ticket.createdAt).toLocaleDateString("tr-TR")}{" "}
                    {new Date(ticket.createdAt).toLocaleTimeString("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <span className="mx-auto">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-medium ring-1 ${
                        ticket.isArchived === false
                          ? "bg-green-50 text-green-700 ring-green-300"
                          : "bg-red-50 text-red-700 ring-red-300"
                      }`}
                    >
                      {ticket.isArchived === false ? "open" : "closed"}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
