import Navbar from "./components/Navbar";
import TicketForm from "./components/TicketForm";

export default function Home() {
  return (
    <>
      <div className="container flex h-screen w-screen box-border bg-[#f6f6f6] max-w-screen ">
        <Navbar/>
      </div>
    </>
  );
}
