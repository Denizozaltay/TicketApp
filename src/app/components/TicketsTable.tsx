"use client";

import { usePathname } from "next/navigation";
import { Ticket } from "@/src/types/ticket";
import { useEffect, useState } from "react";

export default function TicketsTable() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  function PageTitle() {
    const pathname = usePathname();
    const title = pathname.includes("/admin/archived")
      ? "Archived Tickets"
      : "Open Tickets";
    return <>{title}</>;
  }

  function DataTableComponent({ id, username, title, createdAt }: Ticket) {
    return (
      <tbody id="data-table-body" className="data-table-body">
        <tr>
          <td>{id}</td>
          <td>{username}</td>
          <td className="ticketContent" data-id={id}>
            {title}
          </td>
          <td>
            {new Date(createdAt).toLocaleDateString("tr-TR")}{" "}
            {new Date(createdAt).toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </td>

          <td className="buttons-container">
            <button
              className="delete-btn"
              data-id={id}
              onClick={() => deleteTicket(id)}
            >
              Delete
            </button>
            <button className="archive-btn" data-id={id}>
              Archive
            </button>
          </td>
        </tr>
      </tbody>
    );
  }

  async function fetchTickets() {
    try {
      const response = await fetch("/api/tickets");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  }

  function deleteTicket(id: string): void {
    fetch(`/api/tickets/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Ticket deleted:", data);
        fetchTickets();
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
      });
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="right-column flex-[1_1_80%] box-border overflow-auto p-[25px]">
      <h1 className="content-title text-[4rem] text-center font-medium bg-gradient-to-t from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent">
        Tickets
      </h1>
      <div className="data-column flex-[1_1] p-[50px] box-border overflow-auto">
        <table className="rounded-table border-separate border-spacing-0 w-full">
          <thead className="">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Description</th>
              <th>Date</th>
              <th>Options</th>
            </tr>
          </thead>
          {tickets.map((ticket) => (
            <DataTableComponent
              key={ticket.id}
              id={ticket.id}
              username={ticket.username}
              title={ticket.title}
              createdAt={ticket.createdAt}
            />
          ))}
        </table>
      </div>
    </div>
  );
}
