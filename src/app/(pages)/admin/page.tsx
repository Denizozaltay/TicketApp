import Navbar from "@/src/app/components/Navbar";
import TicketsTable from "@/src/app/components/TicketsTable";

export default function Home() {
  return (
    <>
      <div className="container flex h-screen w-screen box-border bg-[#f6f6f6] max-w-screen ">
        <Navbar />
        <TicketsTable />
      </div>
    </>
  );
}
