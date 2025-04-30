"use client";

import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NavbarProps = {
  isArchived: boolean;
  setIsArchived: (val: boolean) => void;
};

export default function AdminNavbar({
  isArchived,
  setIsArchived,
}: NavbarProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  const activeClass = "bg-[#006fff14] rounded-[12px] [&_*]:text-blue-500 ";
  const inactiveClass =
    "hover:bg-gray-100 rounded-[12px] [&>span]:text-[#000000bf] [&>svg]:text-gray-500";

  return (
    <div className="header-column flex flex-col flex-[0_0_20%] bg-[#FDFDFD] shadow-lg h-[100vh] text-white gap-4 p-4 box-border">
      <div className="title flex flex-row items-center justify-between text-[16px] border-b-[3px] border-[#f6f6f6] m-0 pb-4">
        <div className="icon flex justify-start">
          <img className="w-[75%]" src="/logo.png" alt="" />
        </div>
        <div className="icontext mr-auto [&>*]:m-0">
          <p className="icontitle text-[0.9rem] font-bold text-[rgba(0,0,0,0.85)]">
            Ticket Manager
          </p>
          <p className="icontitle-desc text-[0.5rem] text-[rgba(0,0,0,0.25)]">
            by HardEnder technology
          </p>
        </div>
        <div className="arrowicon text-[rgba(0,0,0,0.15)]">
          <ChevronLeft size={32} />
        </div>
      </div>

      <div className="contentsAll flex flex-1 flex-col m-0 box-border">
        <div className="contentTitle m-0">
          <p className="text-[0.8rem] font-semibold text-[rgba(0,0,0,0.25)] m-0">
            OVERVIEW
          </p>
        </div>
        <div
          className="thecontents flex flex-1 flex-col text-[1.2em] gap-[0.25em] mt-4 h-[fit] box-border
            [&>div]:flex [&>div]:no-underline [&>div]:py-5 [&>div]:px-0 [&>div]:box-content [&>div]:text-[1rem] [&>div]:gap-[0.5rem] [&>div]:transition-all [&>div]:duration-300 [&>div]:ease-in-out [&>div]:cursor-pointer"
        >
          <div
            className={isArchived ? inactiveClass : activeClass}
            onClick={() => setIsArchived(false)}
          >
            <ChevronRight size={24} />
            <Home size={24} />
            <span className=" flex items-center font-medium">Open Tickets</span>
          </div>
          <div
            className={isArchived ? activeClass : inactiveClass}
            onClick={() => setIsArchived(true)}
          >
            <ChevronRight size={24} />
            <Archive size={24} />
            <span className="flex items-center font-medium">
              Archived Tickets
            </span>
          </div>
          <Link
            href={"/"}
            className="hover:bg-gray-100 rounded-[12px] [&>span]:text-[#000000bf] [&>svg]:text-gray-500
            flex no-underline py-5 dpx-0 box-content text-[1rem] gap-[0.5rem] transition-all duration-300 ease-in-out cursor-pointer
            "
          >
            <ChevronRight size={24} />
            <Plus size={24} />
            <span className="flex items-center font-medium">Create Ticket</span>
          </Link>
          <div
            className="hover:bg-gray-100 rounded-[12px] [&>span]:text-[#000000bf] [&>svg]:text-gray-500 mt-auto "
            onClick={handleLogout}
          >
            <ChevronRight size={24} />
            <LogOut size={24} />
            <span className="flex items-center font-medium">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
