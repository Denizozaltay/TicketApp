"use client"
import { Ticket } from "@/src/types/ticket";
import TicketModal from "../../components/AdminPage/TicketModal";




// TEST DATA FOR TICKETMODAL
const handleClose = () => {};
const handleDelete = () => {};
const handleArchiveToggle = () => {};
const isArchived = true

const ticket: Ticket = {
  id: "ticket123", 
  createdAt: new Date(), 
  isArchived: false ,
  username: "asd",
  title: "asd",
  content: "aasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsadaasdsad",
  userId: "asd"
};
// TEST DATA FOR TICKET TICKETMODAL



export default function CompTest() {
  return (
    <>
     <TicketModal
      ticket={ticket}
      onClose={handleClose}
      onDelete={handleDelete}
      onArchiveToggle={handleArchiveToggle}
      isArchived={isArchived}
    />
    </>
  );
}
