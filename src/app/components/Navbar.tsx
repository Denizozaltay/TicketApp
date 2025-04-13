import { Archive, ChevronDownIcon, ChevronLeft, ChevronRight, HomeIcon, Plus } from "lucide-react";
import { Home } from "lucide-react";

export default function Navbar() {
  return (
      <div className="header-column flex flex-col flex-[0_0_20%] bg-[#FDFDFD] text-white gap-4 p-4 box-border h-full overflow-hidden">
        <div className="title flex flex-row items-center justify-between text-[16px] border-b-[3px] border-[#f6f6f6] m-0 pb-4">
          <div className="icon flex justify-start">
            <img className="w-[75%]" src="/logo.png" alt=""></img>
          </div>
          <div className="icontext mr-auto [&>*]:m-0">
            <p className="icontitle text [0.9rem] font-normal text-[rgba(0,0,0,0.85)]">
              Ticket Manager
            </p>
            <p className="icontitle-desc text-[0.7rem] text-[rgba(0,0,0,0.25)]">
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
          [&>div]:flex [&>div]:flex-1 [&>div]:no-underline [&>div]:py-5 [&>div]:px-0 [&>div]:box-content [&>div]:text-[1rem] [&>div]:gap-[0.5rem]
          [&>div>a]:no-underline [&>div>a]:text-[rgba(0,0,0,0.85)] [&>div>a]:text-[1rem] [&>div>a:hover]:text-[rgba(0,111,255,1)] 
          [&>div>svg]:text-[rgba(0,0,0,0.1)]">
            <div className="opentickets">
              <ChevronRight size={32} />
              <Home size={32}/>
              <a className="flex items-center" href="/admin/homepage.html">
                Home
              </a>
            </div>
            <div className="archivedtickets">
            <ChevronRight size={32} />
            <Archive size={32}/>
              <a className="flex items-center" href="/admin/archived.html">Archived Tickets</a>
            </div>
            <div className="createticket">
            <ChevronRight size={32} />
            <Plus size={32}/>
              <a className="flex items-center" href="/client/index.html">Create Ticket</a>
            </div>
          </div>
        </div>
      </div>
   
  );
}
