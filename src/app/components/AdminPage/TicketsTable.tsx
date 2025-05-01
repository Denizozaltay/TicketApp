"use client";

import { Ticket } from "@/src/types/ticket";
import { useEffect, useState } from "react";
import DataTableButton from "./TicketTableButton";
import TicketModal from "./TicketModal";
import { ArrowBigLeft, ArrowBigRight, LoaderCircle } from "lucide-react";
import { ticketData } from "../../(pages)/comptest/page";

type TicketsTableProps = {
  isArchived: boolean;
};

export default function TicketsTable({ isArchived }: TicketsTableProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  function nextPage() {
    setPage((prev) => prev + 1)
  }

  function previousPage() {
    setPage((prev) => prev + -1)
  }

  const [isLoading, setIsLoading] = useState(false);

  function openModal(ticket: Ticket) {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  }

  function closeModal() {
    setSelectedTicket(null);
    setIsModalOpen(false);
  }

  async function fetchTickets() {
    const endpointBase = isArchived ? "/api/tickets/archived" : "/api/tickets/open";
    const endpoint = `${endpointBase}?page=${page}&limit=${limit}`

    try {
      setIsLoading(true)
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTickets();
  }, [isArchived, page]);



  function DataPageButtons() {
    return (
      <>
        <div className="flex flex-row gap-2 ml-auto pr-[50px] pt-2">
          <button 
            onClick={previousPage} 
            disabled={page === 1}
            className="w-32 cursor-pointer flex flex-row justify-center items-center gap-1 text-s text-blue-500 border border-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition">
              <ArrowBigLeft/> Previous
          </button>
          <button 
            onClick={nextPage} 
            disabled={tickets.length < limit }
            className="w-32 cursor-pointer flex flex-row justify-center items-center gap-1 text-s text-blue-500 border border-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition">
              Next <ArrowBigRight/>
          </button>
        </div>
      </>
    )
  }

  function DataTableComponent({ ticket }: { ticket: Ticket }) {
    return (
      <tbody id="data-table-body" className="data-table-body">
        <tr
          className="cursor-pointer hover:bg-gray-100 rounded-4xl transition duration-200"
          onClick={() => openModal(ticket)}
        >
          <td>{ticket.id}</td>
          <td>{ticket.username}</td>
          <td className="ticketContent" data-id={ticket.id}>
            {ticket.title}
          </td>
          <td>
            {new Date(ticket.createdAt).toLocaleDateString("tr-TR")}{" "}
            {new Date(ticket.createdAt).toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </td>
          <td className="buttons-container">
            <DataTableButton
              name="Delete"
              data-id={ticket.id}
              onClick={(e) => {
                e.stopPropagation();
                deleteTicket(ticket.id);
              }}
              className="delete-btn"
            />
            <DataTableButton
              name={isArchived ? "Unarchive" : "Archive"}
              data-id={ticket.id}
              onClick={(e) => {
                e.stopPropagation();
                isArchived
                  ? unArchiveTicket(ticket.id)
                  : archiveTicket(ticket.id);
              }}
              className="archive-btn"
            />
          </td>
        </tr>
      </tbody>
    );
  }

  function deleteTicket(id: string): void {
    fetch(`/api/tickets/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(() => {
        fetchTickets();
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
      });
  }

  function archiveTicket(id: string): void {
    fetch(`/api/tickets/${id}/archive`, { method: "PATCH" })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(() => {
        fetchTickets();
      })
      .catch((error) => {
        console.error("Error archiving ticket:", error);
      });
  }

  function unArchiveTicket(id: string): void {
    fetch(`/api/tickets/${id}/unarchive`, { method: "PATCH" })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(() => {
        fetchTickets();
      })
      .catch((error) => {
        console.error("Error unarchiving ticket:", error);
      });
  }

  return (
    <div className="flex flex-col right-column flex-[1_1_80%] box-border overflow-auto p-[25px]">
      <h1 className="content-title text-[4rem] text-center font-medium bg-gradient-to-t from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent">
        Tickets
      </h1>
      <div className="data-column flex-[1_1] p-[50px] box-border overflow-auto">
        <table className="rounded-table border-separate border-spacing-0 w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Description</th>
              <th>Date</th>
              <th>Options</th>
            </tr>
          </thead>
          {/* load tickets from database */}
          {!isLoading && tickets.map((ticket) => (
            <DataTableComponent key={ticket.id} ticket={ticket} /> 
          ))}
          {/* {ticketData.slice(0,50).map((ticket) => (
            <DataTableComponent key={ticket.id} ticket={ticket} /> 
          ))} */}
        </table>
        {isLoading ? (
            <div className="flex pt-5"><LoaderCircle size={32} className=" ml-auto mr-auto animate-spin opacity-65"/></div>
        ) : (
        ``)}
        {isModalOpen && selectedTicket && (
          <TicketModal
            ticket={selectedTicket}
            onClose={closeModal}
            onDelete={deleteTicket}
            onArchiveToggle={(id, isArchived) => {
              if (isArchived) {
                unArchiveTicket(id);
              } else {
                archiveTicket(id);
              }
            }}
            isArchived={isArchived}
          />
        )}

      </div>
      <DataPageButtons/>
    </div>
  );
}
