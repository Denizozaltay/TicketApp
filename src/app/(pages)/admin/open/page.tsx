import DataTable from "@/src/app/components/DataTable";
import AdminDashboard from "../../../components/AdminDashboard";
import Navbar from "@/src/app/components/Navbar";

export default function OpenTickets() {
  return (
    <>
      <div className="container flex h-screen w-screen box-border bg-[#f6f6f6] max-w-screen ">
        <Navbar />
        <DataTable/>
      </div>
    </>
  );
}
