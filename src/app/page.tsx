import DataTable from "./components/DataTable";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <div className="container flex h-screen w-screen box-border bg-[#f6f6f6] max-w-screen ">
        <Navbar />
        <DataTable />
      </div>
    </>
  );
}
