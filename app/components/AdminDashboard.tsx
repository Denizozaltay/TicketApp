"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./AdminDashboard.module.css";
import { Poppins } from "next/font/google";
import { ChevronLeft, ChevronRight, Home, Archive, Plus } from "lucide-react";

function UserIpAdress() {
  const [ip, setIp] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch((err) => console.error("IP bulunamadı", err));
  }, []);
  return <>{`${ip}`}</>;
}

function PageTitle() {
  const pathname = usePathname();
  const title = pathname.includes("/admin/archived")
    ? "Archived Tickets"
    : "Open Tickets";
  return <>{title}</>;
}

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const sampleTickets = [
  {
    id: 1,
    username: "Denizozaltay",
    description: "Need help with login issue",
    date: "2025-04-11",
  },
  {
    id: 2,
    username: "JaneDoe",
    description: "Feature request for dashboard",
    date: "2025-04-09",
  },
  {
    id: 3,
    username: "MikeSmith",
    description: "Bug in reporting module",
    date: "2025-04-08",
  },
  {
    id: 4,
    username: "SarahJohnson",
    description: "Account access problem",
    date: "2025-04-07",
  },
];

const currentDate = new Date().toLocaleDateString();
function CurrentDate() {
  return <p>{currentDate}</p>;
}

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("home");
  const [tickets, setTickets] = useState(sampleTickets);

  const handleDelete = (id: number) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  const handleArchive = (id: number) => {
    console.log(`Archiving ticket ${id}`);
  };

  return (
    <div className={`${styles.container} ${poppins.className}`}>
      <div className={styles.headerColumn}>
        <div className={styles.title}>
          <div className={styles.logoContainer}>
            <Image
              src="/logo.png"
              alt="Ticket Manager Logo"
              width={38}
              height={38}
              className={styles.logo}
            />
            <p className={styles.icontitle}>Ticket Manager</p>
          </div>
          <div className={styles.arrowicon}>
            <ChevronLeft className={styles.chevronIcon} size={18} />
          </div>
        </div>
        <div className={styles.contentsAll}>
          <div className={styles.contentTitle}>
            <p>OVERVIEW</p>
          </div>
          <div className={styles.contents}>
            <div
              className={activePage === "home" ? styles.active : ""}
              data-active="home"
            >
              <ChevronRight className={styles.menuIcon} size={18} />
              <Home className={styles.menuIcon} size={18} />
              <Link href="/admin">Home</Link>
            </div>

            <div
              className={activePage === "archivedtickets" ? styles.active : ""}
              data-active="archivedtickets"
            >
              <ChevronRight className={styles.menuIcon} size={18} />
              <Archive className={styles.menuIcon} size={18} />
              <Link href="/admin/archived">Archived Tickets</Link>
            </div>

            <div
              className={`${styles.createticket} ${
                activePage === "createTicket" ? styles.active : ""
              }`}
              data-active="createTicket"
            >
              <ChevronRight className={styles.menuIcon} size={18} />
              <Plus className={styles.menuIcon} size={18} />
              <Link href="/">Create Ticket</Link>
            </div>
          </div>
        </div>
        <div className={styles.userInfo}>
          <p className={styles.userDetail}>
            <span className={styles.infoLabel}>User:</span>
            <span className={styles.infoValue}>
              <UserIpAdress />
            </span>
          </p>
          <p className={styles.userDetail}>
            <span className={styles.infoLabel}>Date:</span>
            <span className={styles.infoValue}>{currentDate}</span>
          </p>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.contentTitle}>
          <PageTitle />
        </div>
        <div className={styles.dataColumn}>
          <div className={styles.tableContainer}>
            <table className={styles.roundedTable}>
              <thead className={styles.tableHead}>
                <tr className={styles.tableRow}>
                  <th className={`${styles.tableHeader} ${styles.colId}`}>
                    ID
                  </th>
                  <th className={`${styles.tableHeader} ${styles.colUsername}`}>
                    Username
                  </th>
                  <th className={`${styles.tableHeader} ${styles.colDesc}`}>
                    Description
                  </th>
                  <th className={`${styles.tableHeader} ${styles.colDate}`}>
                    Date
                  </th>
                  <th className={`${styles.tableHeader} ${styles.colOptions}`}>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {tickets.map((ticket) => (
                  <tr className={styles.tableRow} key={ticket.id}>
                    <td className={`${styles.tableCell} ${styles.colId}`}>
                      {ticket.id}
                    </td>
                    <td className={`${styles.tableCell} ${styles.colUsername}`}>
                      {ticket.username}
                    </td>
                    <td className={`${styles.tableCell} ${styles.colDesc}`}>
                      {ticket.description}
                    </td>
                    <td className={`${styles.tableCell} ${styles.colDate}`}>
                      {ticket.date}
                    </td>
                    <td className={`${styles.tableCell} ${styles.colOptions}`}>
                      <div className={styles.buttonsContainer}>
                        <button
                          className={styles.deleteBtn}
                          onClick={() => handleDelete(ticket.id)}
                        >
                          Delete
                        </button>
                        <button
                          className={styles.archiveBtn}
                          onClick={() => handleArchive(ticket.id)}
                        >
                          Archive
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
