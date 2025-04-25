import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function Home() {
  return (
    <div
      className={`${roboto.className} flex flex-row-reverse w-[200vw] h-screen overflow-x-hidden transition-transform duration-1000 ease-in-out`}
    >
      {/* ✅ Success pane  --------------------------------------------------- */}
      <section className="flex flex-col items-center justify-center h-screen w-screen gap-5 md:gap-10">
        <p className="m-0 text-[64px] md:text-[128px] font-semibold bg-gradient-to-b from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent">
          All Done!
        </p>
        <p className="text-xl md:text-2xl text-black/50">
          We got your message.
        </p>
        <p className="text-xl md:text-2xl text-black/50">
          Our agents will reach you soon.
        </p>
      </section>

      {/* ✍️ Form pane  ----------------------------------------------------- */}
      <section className="flex flex-col items-center h-screen w-screen gap-16 md:gap-[60px] transition-transform duration-1000 ease-in-out">
        {/* title */}
        <div className="mt-12 px-4 text-center">
          <p className="m-0 text-4xl md:text-[84px] font-medium bg-gradient-to-b from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent">
            Share your thoughts with us!
          </p>
        </div>

        {/* form card */}
        <div className="flex justify-center flex-1 w-[90%] md:w-[45%]">
          <form className="flex flex-col w-full md:w-4/5 h-full p-8 md:p-9 gap-5 rounded-[22px] bg-white shadow-lg">
            <p className="mt-2 text-2xl font-light text-black">Personal Info</p>

            {/* name */}
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-light text-black"
              >
                Your full name
              </label>
              <textarea
                id="name"
                rows={1}
                placeholder="John Doe"
                className="w-4/5 text-sm p-2 rounded-md border border-gray-300 bg-gray-50 resize-none focus:outline-none focus:border-gray-400"
              />
            </div>

            {/* message */}
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-light text-black"
              >
                Your message
              </label>
              <textarea
                id="description"
                rows={8}
                placeholder="I want the feature about..."
                className="text-sm p-2 rounded-md border border-gray-300 bg-gray-50 resize-none focus:outline-none focus:border-gray-400"
              />
            </div>

            {/* send button */}
            <div className="flex justify-center pt-4">
              <button
                id="send"
                type="submit"
                className="w-28 h-10 text-sm font-medium rounded-md border border-[#008CFF] bg-[#008CFF] text-white transition-colors duration-300 hover:bg-white hover:text-black"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        <footer className="flex-1" />
      </section>
    </div>
  );
}
