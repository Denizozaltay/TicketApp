export default function SuccessPane() {
  return (
    <section className="flex flex-col items-center justify-center h-screen w-screen gap-5 md:gap-10">
      <p className="m-0 text-[64px] md:text-[128px] font-semibold bg-gradient-to-b from-[#006EFF] via-[#00BCFF] to-[#00D9FF] bg-clip-text text-transparent">
        All Done!
      </p>
      <p className="text-xl md:text-2xl text-black/50">We got your message.</p>
      <p className="text-xl md:text-2xl text-black/50">
        Our agents will reach you soon.
      </p>
    </section>
  );
}
