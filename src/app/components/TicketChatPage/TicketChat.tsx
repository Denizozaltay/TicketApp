"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { geistSans } from "@/src/lib/fonts";
import { TicketMessage } from "@/src/types/ticketMessage";
import { Ticket } from "@/src/types/ticket";
import MyTicketsButton from "../CreateTicketPage/MyTicketsButton";

type Props = {
  ticket: Ticket;
  ticketMessages: TicketMessage[];
  userId: string;
};

export default function TicketChat({ ticket, ticketMessages, userId }: Props) {
  const [messages, setMessages] = useState<TicketMessage[]>(ticketMessages);

  const [input, setInput] = useState("");
  const listRef = useRef<HTMLUListElement>(null);

  async function sendMessage() {
    if (!input.trim()) return;

    const newMessage = {
      content: input.trim(),
    };

    try {
      const response = await fetch(`/api/tickets/${ticket.id}/messages`, {
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
        <MyTicketsButton/>
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
            {messages.map((m) => (
              <li
                key={m.id}
                className={`flex ${
                  userId === m.userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`break-words whitespace-pre-wrap min-w-50 max-w-xs px-4 py-2 rounded-lg shadow-sm text-sm ${
                    userId === m.userId
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-900 ring-1 ring-gray-200 rounded-bl-none"
                  }`}
                >
                  <div className="flex flex-row pb-1">
                    <p className={`opacity-50`}>
                      {userId === m.userId ? "Siz" : "Yetkili"}
                    </p>
                  </div>
                  <p>{m.content}</p>
                  <span className="block text-[10px] mt-1 opacity-70 text-right">
                    <span className="hidden">
                      {new Date(m.createdAt).toLocaleDateString("tr-TR")}
                    </span>{" "}
                    {new Date(m.createdAt).toLocaleTimeString("tr-TR", {
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
