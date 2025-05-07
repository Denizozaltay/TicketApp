"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { geistSans } from "@/src/lib/fonts";
import ChatNavButtons from "../../components/CreateTicketPage/MyTicketsButton";

export default function TicketChatPage({ params }: { params: { id: string } }) {
  /* ------- DEMO TICKET ------- */
  const ticket = {
    id: params.id,
    title: "Login page issue",
    description: "Giriş ekranı yenileniyor ve kullanıcıyı atıyor.",
    username: "denizozaltay",
    createdAt: "2025-05-06T15:49:00Z",
    status: "open" as const,
  };
  /* ------- DEMO TICKET ------- */

  /* ------- DEMO MESSAGES ------- */
  type ChatMsg = { id: number; me: boolean; text: string; time: string };
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: 1,
      me: false,
      text: "Merhaba! Sorununuzu detaylandırabilir misiniz?",
      time: "18:50",
    },
    {
      id: 2,
      me: true,
      text: "Giriş ekranı sürekli yenileniyor.",
      time: "18:51",
    },
  ]);
  /* ------- DEMO MESSAGES ------- */

  const [input, setInput] = useState("");
  const listRef = useRef<HTMLUListElement>(null);

  function sendMessage() {
    if (!input.trim()) return;
    const now = new Date();
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        me: false,
        text: input.trim(),
        time: now.toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
  }

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  const statusClasses =
    ticket.status === "open"
      ? "bg-green-50 text-green-700 ring-green-300"
      : "bg-red-50 text-red-700 ring-red-300";

  return (
    <main
      className={`${
        geistSans?.className ?? ""
      } flex flex-col items-center min-h-screen bg-gray-50 py-8 px-2`}
    >
      <div className="absolute flex flex-row gap-3 top-4 right-4 z-50">
        <ChatNavButtons />
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
            value={new Date(ticket.createdAt).toLocaleString("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
          <TicketDetail
            label="Status"
            value={
              <span
                className={`px-4 py-1 rounded-full text-xs font-medium ring-1 inline-block ${statusClasses}`}
              >
                {ticket.status}
              </span>
            }
          />

          <div>
            <p className="font-medium text-gray-700 mb-1">Description:</p>
            <p className="text-gray-600 text-sm whitespace-pre-line">
              {ticket.description}
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
            {messages.map((m) => (
              <li
                key={m.id}
                className={`flex ${m.me ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`break-words whitespace-pre-wrap min-w-50 max-w-xs px-4 py-2 rounded-lg shadow-sm text-sm ${
                    m.me
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-900 ring-1 ring-gray-200 rounded-bl-none"
                  }`}
                >
                  <div className="flex flex-row pb-1">
                    <p className={`opacity-50`}>{m.me ? "Siz" : "Yetkili"}</p>
                  </div>
                  <p>{m.text}</p>
                  <span className="block text-[10px] mt-1 opacity-70 text-right">
                    {m.time}
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
              placeholder="Send a message..."
              className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <button
              type="submit"
              className="cursor-pointer shrink-0 flex items-center gap-1 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors"
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
