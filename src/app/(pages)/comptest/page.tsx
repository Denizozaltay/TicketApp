"use client"
import { Ticket } from "@/src/types/ticket";
import TicketModal from "../../components/AdminPage/TicketModal";
import TicketsTable from "../../components/AdminPage/TicketsTable";




// TEST DATA FOR TICKETTABLE
const isArchived = false

export const ticketData: Ticket[] = [
  {
    id: "ticket1",
    createdAt: new Date(),
    isArchived: false,
    username: "john_doe",
    title: "Issue 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userId: "user1"
  },
  {
    id: "ticket2",
    createdAt: new Date(),
    isArchived: true,
    username: "jane_smith",
    title: "Bug Report",
    content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    userId: "user2"
  },
  {
    id: "ticket3",
    createdAt: new Date(),
    isArchived: false,
    username: "alex_brown",
    title: "Feature Request",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    userId: "user3"
  },
  {
    id: "ticket4",
    createdAt: new Date(),
    isArchived: false,
    username: "mike_white",
    title: "System Error",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    userId: "user4"
  },
  {
    id: "ticket5",
    createdAt: new Date(),
    isArchived: true,
    username: "lisa_black",
    title: "UI Glitch",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    userId: "user5"
  },
  {
    id: "ticket6",
    createdAt: new Date(),
    isArchived: false,
    username: "john_doe",
    title: "Bug Report",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    userId: "user6"
  },
  {
    id: "ticket7",
    createdAt: new Date(),
    isArchived: false,
    username: "jane_smith",
    title: "Feature Request",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    userId: "user7"
  },
  {
    id: "ticket8",
    createdAt: new Date(),
    isArchived: false,
    username: "alex_brown",
    title: "System Error",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    userId: "user8"
  },
  {
    id: "ticket9",
    createdAt: new Date(),
    isArchived: true,
    username: "mike_white",
    title: "UI Glitch",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    userId: "user9"
  },
  {
    id: "ticket10",
    createdAt: new Date(),
    isArchived: false,
    username: "lisa_black",
    title: "Bug Report",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userId: "user10"
  },
  {
    id: "ticket11",
    createdAt: new Date(),
    isArchived: true,
    username: "john_doe",
    title: "Issue 1",
    content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    userId: "user11"
  },
  {
    id: "ticket12",
    createdAt: new Date(),
    isArchived: false,
    username: "jane_smith",
    title: "Feature Request",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    userId: "user12"
  },
  {
    id: "ticket13",
    createdAt: new Date(),
    isArchived: true,
    username: "alex_brown",
    title: "System Error",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    userId: "user13"
  },
  {
    id: "ticket14",
    createdAt: new Date(),
    isArchived: false,
    username: "mike_white",
    title: "UI Glitch",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    userId: "user14"
  },
  {
    id: "ticket15",
    createdAt: new Date(),
    isArchived: false,
    username: "lisa_black",
    title: "Bug Report",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userId: "user15"
  },
  {
    id: "ticket16",
    createdAt: new Date(),
    isArchived: false,
    username: "john_doe",
    title: "Feature Request",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    userId: "user16"
  },
  {
    id: "ticket17",
    createdAt: new Date(),
    isArchived: true,
    username: "jane_smith",
    title: "System Error",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    userId: "user17"
  },
  {
    id: "ticket18",
    createdAt: new Date(),
    isArchived: false,
    username: "alex_brown",
    title: "UI Glitch",
    content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    userId: "user18"
  },
  {
    id: "ticket19",
    createdAt: new Date(),
    isArchived: true,
    username: "mike_white",
    title: "Bug Report",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    userId: "user19"
  },
  {
    id: "ticket20",
    createdAt: new Date(),
    isArchived: false,
    username: "lisa_black",
    title: "Feature Request",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    userId: "user20"
  }
];

// TEST DATA FOR TICKETTABLE



export default function CompTest() {
  return (
    <>

    </>
  );
}
