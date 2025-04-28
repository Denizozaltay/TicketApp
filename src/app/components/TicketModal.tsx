"use client";

import { Ticket } from "@/src/types/ticket";
import { X } from "lucide-react";
import { Geist, Geist_Mono } from "next/font/google";
import DataTableButton from "./TicketTableButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function DataBlock({ title, data }: { title: string; data: string }) {
  return (
    <div className="datablockpopup flex flex-1 flex-col">
      <h1 className="font-semibold text-[24px] antialiased">{title}</h1>
      <p className="font-light text-[18px] antialiased break-words">{data}</p>
    </div>
  );
}

type TicketModalProps = {
  ticket: Ticket;
  onClose: () => void;
  onDelete: (id: string) => void;
  onArchiveToggle: (id: string, isArchived: boolean) => void;
  isArchived: boolean;
};

export default function TicketModal({
  ticket,
  onClose,
  onDelete,
  onArchiveToggle,
  isArchived,
}: TicketModalProps) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/35 flex justify-center items-center z-50">
      <div className="popup flex flex-col w-[840px] h-[592px] bg-white rounded-[24px] shadow-lg">
        {/* Üst başlık ve kapatma */}
        <div className="flex-[1.5] flex flex-row m-[15px] box-border w-auto">
          <div>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
          <div className="flex flex-1 flex-row justify-center items-center">
            <h1 className="text-[3rem] text-center font-medium bg-gradient-to-t from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent">
              Ticket {ticket.id}
            </h1>
          </div>
        </div>

        {/* İçerik bölümü */}
        <div className="flex flex-[8.5] flex-row p-6 pt-0 gap-8 overflow-hidden">
          {/* Sol taraf: bilgiler ve butonlar */}
          <div className="flex-[2] box-border flex flex-col gap-4">
            <DataBlock title="ID" data={ticket.id} />
            <DataBlock title="Username" data={ticket.username} />
            <DataBlock
              title="Date"
              data={new Date(ticket.createdAt).toLocaleDateString("tr-TR")}
            />

            <div className="flex flex-col gap-4 mt-6">
              <DataTableButton
                name="Delete"
                onClick={() => onDelete(ticket.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
              />
              <DataTableButton
                name={isArchived ? "Unarchive" : "Archive"}
                onClick={() => onArchiveToggle(ticket.id, isArchived)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              />
            </div>
          </div>

          {/* Sağ taraf: description */}
          <div className="flex flex-col flex-[8] min-w-0 overflow-scroll">
            <p className="font-semibold text-[24px] antialiased">Description</p>
            <p className="flex-1 font-light text-[16px] antialiased break-words whitespace-pre-wrap">
              {ticket.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
