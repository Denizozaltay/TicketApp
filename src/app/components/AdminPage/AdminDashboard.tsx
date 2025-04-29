"use client";

import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import TicketsTable from "./TicketsTable";

export default function AdminDashboard() {
  const [isArchived, setIsArchived] = useState(false);

  return (
    <div className="flex h-screen">
      <AdminNavbar isArchived={isArchived} setIsArchived={setIsArchived} />
      <TicketsTable isArchived={isArchived} />
    </div>
  );
}
