"use client"
import { usePathname } from "next/navigation"


function PageTitle() {
  const pathname = usePathname();
  const title = pathname.includes("/admin/archived")
    ? "Archived Tickets"
    : "Open Tickets";
  return <>{title}</>;
}

export default function DataTable() {
    return (
        <div className="right-column flex-[1_1_80%] box-border overflow-auto p-[25px]">
        <div className="content-title text-[4rem] text-center font-medium bg-gradient-to-t from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent"><PageTitle/></div>
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
                <tbody id="data-table-body" className="data-table-body">
                    <tr>
                    <td>id</td>
                    <td>username</td>
                    <td className="ticketContent" data-id="${ticket.id}">ticketcontent</td>
                    <td>date</td>
                    <td className="buttons-container">
                        <button className="delete-btn" data-id="${ticket.id}">Delete</button>
                        <button className="archive-btn" data-id="${ticket.id}" data-archived="${ticket.isArchived}">Archive </button>
                    </td>   
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    )
}