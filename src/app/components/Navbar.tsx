"use client"
import { Archive, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




function CurrentTab() {
  const pathname = usePathname();
  const IsActiveArchived = pathname.includes("/admin/archived")
  const IsActiveOpen = pathname.includes("/admin/open")

  const activeClass = "bg-[#006fff14] rounded-[12px] [&_*]:text-blue-500 ";

  return (
    <>
      <div className={`opentickets ${IsActiveOpen ? `${activeClass}` : "hover:bg-gray-100 rounded-[12px] [&>a]:text-[#000000bf] [&>svg]:text-grey-500"}`}>
        <ChevronRight size={24} />
        <Home size={24} />
        <a className="flex items-center font-medium" href="/admin/open">Open Tickets</a>
      </div>
      <div className={`archivedtickets ${IsActiveArchived ? `${activeClass}` : "hover:bg-gray-100  rounded-[12px] [&>a]:text-[#000000bf] [&>svg]:text-grey-500"}`}>
        <ChevronRight size={24} />
        <Archive size={24} />
        <a className="flex items-center font-medium" href="/admin/archived">Archived Tickets</a>
      </div>
      <div className="createticket hover:bg-gray-100 rounded-[12px]  [&>svg]:text-grey-500 [&>a]:text-[#000000bf]">
        <ChevronRight size={24} />
        <Plus size={24} />
        <a className="flex items-center font-medium" href="/forms/ticketform">Create Ticket</a>
      </div>

    </>
  )
}

function ArchiveTicketTab() {
  const pathname = usePathname();
  const IsOpenOrArchive = pathname.includes("/admin/archived")
    ? "Archived Tickets"
    : "Open Tickets";
  return <></>;
}

export default function NavBar() {
  return (
    <div className="header-column flex flex-col flex-[0_0_20%] bg-[#FDFDFD] shadow-lg  text-white gap-4 p-4 box-border h-full overflow-hidden">
      <div className="title flex flex-row items-center justify-between text-[16px] border-b-[3px] border-[#f6f6f6] m-0 pb-4">
        <div className="icon flex justify-start">
          <img className="w-[75%]" src="/logo.png" alt=""></img>
        </div>
        <div className="icontext mr-auto [&>*]:m-0">
          <p className="icontitle text [0.9rem] font-bold text-[rgba(0,0,0,0.85)]">
            Ticket Manager
          </p>
          <p className="icontitle-desc text-[0.5rem] text-[rgba(0,0,0,0.25)]">
            by Bluebrush technology
          </p>
        </div>
        <div className="arrowicon text-[rgba(0,0,0,0.15)]">
          <ChevronLeft size={32} />
        </div>
      </div>
      <div className="contentsAll m-0">
        <div className="contentTitle m-0">
          <p className="text-[0.8rem] font-semibold text-[rgba(0,0,0,0.25)] m-0">
            OVERVIEW
          </p>
        </div>
        <div className="contents flex flex-col text-[1.2em] gap-[0.25em] mt-4 
          [&>div]:flex [&>div]:flex-1 [&>div]:no-underline [&>div]:py-5 [&>div]:px-0 [&>div]:box-content [&>div]:text-[1rem] [&>div]:gap-[0.5rem] [&>div]:transition-all [&>div]:duration-200 [&>div]:ease-in-out [&>div]:cursor-default
          [&>div>a]:no-underline [&>div>a]:text-[1rem] [&>div>a:hover]:text-[rgba(0,111,255,1)] [&>div>a]:transition-all [&>div>a]:duration-200 [&>div>a]:ease-in-out
          [&>div>svg]:text-[rgba(0,0,0,0.1)] ">
          <CurrentTab />
        </div>
      </div>
    </div>

  );
}
