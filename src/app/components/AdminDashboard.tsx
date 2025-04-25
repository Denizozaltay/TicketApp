"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import TicketsTable from "./TicketsTable";

export default function AdminDashboard() {
  const [isArchived, setIsArchived] = useState(false);

  return (
    <div className="flex h-screen">
      <Navbar isArchived={isArchived} setIsArchived={setIsArchived} />
      <TicketsTable isArchived={isArchived} />
    </div>
  );
}
