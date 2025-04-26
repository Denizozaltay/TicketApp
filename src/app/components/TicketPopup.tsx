import { X } from "lucide-react"
import { Geist, Geist_Mono } from "next/font/google";
import { Ticket } from "@/src/types/ticket";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });
  
  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });


  
function DataBlock({ title, data }: { title: string; data: string }) {
    return (
        <div className="datablockpopup flex flex-1 flex-col ">
            <h1 className="font-semibold text-[24px] antialiased">{title}</h1>
            <p className="font-light text-[18px] antialiased">{data}</p>
        </div>
    )
}



export default function TicketPopUp() {
    return(
        <>
        <div className="flex justify-center items-center bg-black/35 w-screen h-screen">
            <div className="popup flex flex-col w-[840px] h-[592px] bg-white rounded-[24px] shadow-lg ">
                <div className="flex-[1.5] flex flex-row m-[15px] box-border w-auto">
                    <div>
                        <X/>
                    </div>
                    <div className="flex flex-1 flex-row justify-center items-center ">
                        <h1 className="text-[3rem] text-center font-medium bg-gradient-to-t from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent">
                            Ticket xxxxxxx
                        </h1>
                    </div>
                </div>
                <div className="flex flex-[8.5] flex-row p-6 pt-0 gap-8 overflow-hidden">
                    <div className="flex-[2] box-border flex flex-col">
                        <DataBlock
                          title="ID"
                          data="34932845"
                        />
                        <DataBlock
                          title="Username"
                          data="denizozaltay"
                        />
                        <DataBlock
                          title="Date"
                          data="24.05.2025"
                        />
                        <div>
                            {/* <DataTableButton 
                            name="Delete"
                            data-id={id}
                            onClick={() => deleteTicket(id)} 
                            className="delete-btn"
                            />
                            <DataTableButton 
                            name={isArchived ? "Unarchive" : "Archive"}
                            data-id={id}
                            onClick={() => (isArchived ? unArchiveTicket(id) : archiveTicket(id))}
                            className="archive-btn"
                            /> */}
                        </div>
                    </div>
                    <div className="flex flex-col flex-[8] min-w-0 overflow-scroll">
                        <p className="font-semibold text-[24px] antialiased">Description</p>
                        <p className="flex-1 font-light text-[16px] antialiased">I would like to request a feature enhancement for the mobile version of our ticket management system. We’ve received some feedback from users who are experiencing issues with the page layout, specifically when there are off-screen elements that can be accidentally revealed by horizontal scrolling. This is particularly problematic on smaller devices like smartphones. Users have reported that while interacting with the page, they sometimes scroll to the left, which exposes parts of the layout that should remain hidden and disrupts the overall user experience.
To address this, I’d like to implement a solution that disables horizontal scrolling altogether while maintaining a smooth vertical scroll. The goal is to prevent the layout from shifting unexpectedly, ensuring that all the elements remain within the intended viewport and the user isn’t able to move beyond it.
The mobile view should be optimized to keep the content centered and fully visible without the ability to scroll sideways. If possible, I’d like to explore CSS options to lock horizontal scrolling, or alternatively, JavaScript solutions that could dynamically adjust the behavior based on screen width.
Additionally, I would like to make sure that any pop-up modals or dropdown menus remain functional and do not inadvertently trigger horizontal scrolling. The fix should be applied across different pages of the application to ensure a consistent experience.
Let me know if this would require significant changes to the existing layout, or if there are other ways we could streamline the mobile experience. Thank you!</p>
                    </div>
                    
                </div>
            </div>
        </div>
        </>
    )
}