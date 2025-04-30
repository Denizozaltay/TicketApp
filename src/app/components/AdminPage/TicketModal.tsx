"use client";

import { Ticket } from "@/src/types/ticket";
import { X } from "lucide-react";
import DataTableButton from "./TicketTableButton";

function DataBlock({ title, data }: { title: string; data: string }) {
  return (
    <div className="datablockpopup flex flex-1 flex-col">
      <h1 className="font-medium text-[22px] antialiased">{title}</h1>
      <p className="font-light text-[16px] antialiased break-words">{data}</p>
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
        {/* Header */}
        <div className="flex-[1.5] flex flex-row m-[15px] box-border w-auto mb-6">
          <button className="flex cursor-pointer" onClick={onClose}>
            <X />
          </button>
          <div className="flex flex-1 justify-center items-center">
            <h1 className="text-[3rem] text-center font-medium bg-gradient-to-t from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent">
              Ticket{" "}
              <span className="text-[1.5rem] break-all">#{ticket.id}</span>
            </h1>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-[8.5] flex-row p-6 pt-0 gap-8 overflow-hidden">
          {/* Left Side */}
          <div className="flex-[2] flex flex-col gap-4 overflow-hidden">
            <DataBlock title="ID" data={ticket.id} />
            <DataBlock title="Username" data={ticket.username} />
            <DataBlock
              title="Date"
              data={
                new Date(ticket.createdAt).toLocaleDateString("tr-TR") +
                " " +
                new Date(ticket.createdAt).toLocaleTimeString("tr-TR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />
            <div className="flex flex-col gap-2 mt-4">
              <DataTableButton
                name="Delete"
                onClick={() => {
                  onDelete(ticket.id);
                  onClose();
                }}
                className="delete-btn"
              />
              <DataTableButton
                name={isArchived ? "Unarchive" : "Archive"}
                onClick={() => {
                  onArchiveToggle(ticket.id, isArchived);
                  onClose();
                }}
                className="archive-btn"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col flex-[8] overflow-scroll overflow-x-hidden">
            <p className="font-semibold text-[24px] antialiased mb-2">
              Description
            </p>
            <p className="flex-1 font-light text-[16px] align text-justify antialiased break-words whitespace-pre-wrap">
              {ticket.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
