"use client";

export default function Achievements() {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F1] py-24 text-[#1C2B3A] lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/8 blur-35" />
        <div className="absolute right-0 bottom-0 h-105 w-105 rounded-full bg-[#0A2342]/5 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Recognized By */}
        <div className="mx-auto  max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 text-[#D4AF37]">
              <span className="text-sm font-bold uppercase tracking-[4px]">
                Recognized By
              </span>
            </div>

            <h3 className="mt-5 font-serif text-3xl leading-tight text-[#0A2342] sm:text-6xl">
              Certified for Quality, Recognized for Growth
            </h3>

            <p className="mt-5 text-base leading-7 text-[#4A5B6E]">
              Our quality is backed by independent bodies like ISO and IAF, and our growth has been supported by the startup programs and institutions listed alongside them.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-[30px] border border-[#0A2342]/8 bg-white p-10 shadow-[0_4px_24px_rgba(10,35,66,0.05)] sm:p-14">
            <div className="grid grid-cols-2 place-items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              
              <div className="flex h-16 w-full items-center justify-center opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0" title="ISO 9001:2015">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/iso.png" alt="ISO 9001:2015" className="max-h-14 w-auto max-w-35 object-contain" />
              </div>

              <div className="flex h-16 w-full items-center justify-center opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0" title="EGAC Accredited">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/egac.png" alt="EGAC Accredited" className="max-h-14 w-auto max-w-35 object-contain" />
              </div>

              <div className="flex h-16 w-full items-center justify-center opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0" title="MSME">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/msme.png" alt="MSME" className="max-h-14 w-auto max-w-35 object-contain" />
              </div>

              <div className="flex h-16 w-full items-center justify-center opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0" title="IAF Accreditation Forum">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/iaf.png" alt="IAF Accreditation Forum" className="max-h-14 w-auto max-w-35 object-contain" />
              </div>

              <div className="flex h-16 w-full items-center justify-center opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0" title="PedalStart">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/pedalstart.png" alt="PedalStart" className="max-h-14 w-auto max-w-35 object-contain" />
              </div>

              <div className="flex h-16 w-full items-center justify-center opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0" title="JIET Universe">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/jiet.png" alt="JIET Universe" className="max-h-14 w-auto max-w-35 object-contain" />
              </div>

              <div className="flex h-16 w-full items-center justify-center opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0" title="Startup India">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/startupindia.png" alt="Startup India" className="max-h-14 w-auto max-w-35 object-contain" />
              </div>

              <div className="flex h-16 w-full items-center justify-center opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0" title="iSTART Rajasthan">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logos/istart.png" alt="iSTART Rajasthan" className="max-h-14 w-auto max-w-35 object-contain" />
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}