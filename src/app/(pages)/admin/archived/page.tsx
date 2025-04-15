import AdminDashboard from "@/src/app/components/AdminDashboard";
import DataTable from "@/src/app/components/DataTable";
import Navbar from "@/src/app/components/Navbar";

export default function ArchivedTickets() {
  return (
    <>
      <div className="container flex h-screen w-screen box-border bg-[#f6f6f6] max-w-screen ">
        <Navbar />
        <DataTable />
      </div>
    </>
  );
}
