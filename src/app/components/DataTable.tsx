"use client"

import { usePathname } from "next/navigation"


const testDataArray: ITicketData[] = [
  { id: 1, username: "alice", ticketcontent: "Hello world!", date: "24-05-2025" },
  { id: 2, username: "bob", ticketcontent: "Ticket content 2", date: "25-05-2025" },
  { id: 3, username: "charlie", ticketcontent: "Ticket content 3", date: "26-05-2025" }
];
interface ITicketData {
  id: number;
  username: string;
  ticketcontent: string;
  date: string;
}


const DataTableComponent = ({id, username, ticketcontent, date}: ITicketData) => {
  return (
     <tbody id="data-table-body" className="data-table-body">
       <tr>
        <td>{id}</td>
        <td>{username}</td>
        <td className="ticketContent" data-id={id}>{ticketcontent}</td>
        <td>{date}</td>
        <td className="buttons-container">
          <button className="delete-btn" data-id={id}>Delete</button>
          <button className="archive-btn" data-id={id}>Archive</button>
        </td>   
      </tr>
     </tbody>
  );
  }


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
                    {testDataArray.map(ticket => (
                        <DataTableComponent
                        key={ticket.id}
                        id={ticket.id}
                        username={ticket.username}
                        ticketcontent={ticket.ticketcontent}
                        date={ticket.date}
                        />
                    ))}
            </table>
        </div>
    </div>
    )
}