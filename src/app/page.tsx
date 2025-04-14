import NavBar from "./components/NavBar";
import TicketForm from "./components/TicketForm";

export default function Home() {
  return (
    <>
      <div className="container flex h-screen w-screen box-border bg-[#f6f6f6] max-w-screen ">
        <NavBar/>
      </div>
    </>
  );
}
