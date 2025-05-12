"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { geistSans } from "@/src/lib/fonts";
import { TicketMessage } from "@/src/types/ticketMessage";
import { Ticket } from "@/src/types/ticket";
import MyTicketsButton from "../CreateTicketPage/MyTicketsButton";

type Props = {
  ticketId: string;
  userId: string;
  role: "user" | "admin";
};

export default function TicketChat({ ticketId, userId, role }: Props) {
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLUListElement>(null);

  // Ticket ve mesaj verilerini client tarafında çek
  useEffect(() => {
    async function fetchTicketData() {
      try {
        setLoading(true);
        // Ticket verilerini çek
        const ticketResponse = await fetch(`/api/tickets/${ticketId}`);
        if (!ticketResponse.ok) throw new Error("Failed to fetch ticket");
        const ticketData = await ticketResponse.json();

        // Mesaj verilerini çek
        const messagesResponse = await fetch(
          `/api/tickets/${ticketId}/messages`
        );
        if (!messagesResponse.ok) throw new Error("Failed to fetch messages");
        const messagesData = await messagesResponse.json();

        setTicket(ticketData);
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTicketData();
  }, [ticketId]);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessage = {
      content: input.trim(),
    };

    try {
      const response = await fetch(`/api/tickets/${ticketId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      if (response.ok) {
        const createdMessage = await response.json();

        setMessages((prevMessages) => [...prevMessages, createdMessage]);
        setInput("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  // Veri yüklenene kadar yükleniyor göster
  if (loading || !ticket) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  const statusClasses = ticket.isArchived
    ? "bg-red-50 text-red-700 ring-red-300"
    : "bg-green-50 text-green-700 ring-green-300";

  return (
    <main
      className={`${
        geistSans?.className ?? ""
      } flex flex-col items-center min-h-screen bg-gray-50 py-8 px-2`}
    >
      <div className="absolute flex flex-row gap-3 top-4 right-4 z-50">
        <MyTicketsButton />
      </div>

      <h1 className="text-[3rem] text-center font-bold bg-gradient-to-t from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent">
        Ticket #{ticket.id}
      </h1>

      <div className="flex w-[90vw] max-w-7xl h-[70vh] bg-white rounded-[22px] shadow-lg ring-1 ring-gray-200 overflow-hidden">
        {/* -------- SOL PANEL -------- */}
        <aside className="w-1/4 min-w-[15rem] border-r border-gray-100 p-8 flex flex-col gap-6 bg-sky-50/30 overflow-y-auto">
          <h2 className="text-xl font-semibold text-gray-800">
            Ticket Details
          </h2>

          <TicketDetail label="Title" value={ticket.title} />
          <TicketDetail label="Username" value={ticket.username} />
          <TicketDetail
            label="Date"
            value={new Date(ticket.createdAt).toLocaleTimeString("tr-TR", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
          />
          <TicketDetail
            label="Status"
            value={
              <span
                className={`px-4 py-1 rounded-full text-xs font-medium ring-1 inline-block ${statusClasses}`}
              >
                {ticket.isArchived ? "Closed" : "Open"}
              </span>
            }
          />

          <div>
            <p className="font-medium text-gray-700 mb-1">Description:</p>
            <p className="break-words whitespace-pre-wrap text-justify text-gray-600 text-sm">
              {ticket.content}
            </p>
          </div>
        </aside>

        {/* -------- SAĞ: CHAT -------- */}
        <section className="flex-1 flex flex-col">
          {/* Mesaj listesi */}
          <ul
            ref={listRef}
            className="flex-1 overflow-y-auto h-full px-6 py-6 space-y-4 bg-gray-50"
          >
            {messages.map((message) => (
              <li
                key={message.id}
                className={`flex ${
                  userId === message.userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`break-words whitespace-pre-wrap min-w-50 max-w-xs px-4 py-2 rounded-lg shadow-sm text-sm ${
                    userId === message.userId
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-900 ring-1 ring-gray-200 rounded-bl-none"
                  }`}
                >
                  <div className="flex flex-row pb-1">
                    <p className={`opacity-50`}>
                      {userId === message.userId
                        ? "Siz"
                        : role === "admin"
                        ? "Kullanıcı"
                        : "Yetkili"}
                    </p>
                  </div>
                  <p>{message.content}</p>
                  <span className="block text-[10px] mt-1 opacity-70 text-right">
                    <span className="hidden">
                      {new Date(message.createdAt).toLocaleDateString("tr-TR")}
                    </span>{" "}
                    {new Date(message.createdAt).toLocaleTimeString("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Mesaj yazma alanı */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="border-t border-gray-200 bg-white px-4 py-3 flex gap-3"
          >
            <textarea
              maxLength={512}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                ticket.isArchived
                  ? "Bu ticket kapatılmıştır"
                  : "Send a message..."
              }
              className={`flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 ${
                ticket.isArchived ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
              disabled={ticket.isArchived}
            />
            <button
              type="submit"
              disabled={ticket.isArchived}
              className={`cursor-pointer shrink-0 flex items-center gap-1 px-4 py-2 ${
                ticket.isArchived
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-600"
              } text-white font-medium rounded-lg transition-colors`}
            >
              <Send size={16} />
              Send
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

/* --- Küçük detay satırı --- */
function TicketDetail({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <p className="text-sm">
      <span className="font-medium text-gray-700">{label}: </span>
      <span className="text-gray-600 break-words">{value}</span>
    </p>
  );
}
