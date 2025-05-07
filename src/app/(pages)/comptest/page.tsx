"use client";

import TicketModal from "../../components/AdminPage/TicketModal";
import MyTicketsButton from "../../components/CreateTicketPage/MyTicketsButton";
import TicketChat from  "../../components/TicketChatPage/TicketChat";
import { ticketDemoData, ticketmsgDemoData } from "./demodata";

export default function CompTest() {

  const tickets = ticketDemoData
  const ticketMessages = ticketmsgDemoData
  const userId = '1234'

  return (
    <>
       <MyTicketsButton></MyTicketsButton>
    </>
  );
}
