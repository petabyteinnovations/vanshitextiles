"use client";

import { useMemo } from "react";
import {
  ShieldCheck,
  Gem,
  Lightbulb,
  Users,
  Leaf,
  Award,
  ArrowRight,
} from "lucide-react";

const DEFAULT_DATA = {
  subtitle: "Our Core Values",

  title: "The Principles That Drive Everything We Do",

  description:
    "Our values define who we are as a company. They guide every decision, every product we manufacture, and every relationship we build with our customers across the globe.",

  values: [
    {
      icon: "integrity",
      title: "Integrity",
      description:
        "We conduct business with honesty, transparency, and strong ethical standards in every partnership.",
    },
    {
      icon: "quality",
      title: "Quality",
      description:
        "Every product is manufactured with precision and passes strict quality inspections before delivery.",
    },
    {
      icon: "innovation",
      title: "Innovation",
      description:
        "We continuously improve our technology, processes, and product development to stay ahead.",
    },
    {
      icon: "customer",
      title: "Customer First",
      description:
        "Long-term customer relationships are at the heart of everything we do.",
    },
    {
      icon: "sustainability",
      title: "Sustainability",
      description:
        "Responsible manufacturing practices help us create a better future for generations.",
    },
    {
      icon: "excellence",
      title: "Excellence",
      description:
        "We strive for perfection in every order, every shipment, and every customer experience.",
    },
  ],

  cta: {
    badge: "Our Promise",
    title: "Values That Build Trust,",
    titleAccent: "Partnerships That Last.",
    description:
      "Every order we manufacture reflects our commitment to integrity, innovation, quality, and customer satisfaction. These values inspire us to deliver premium textile solutions trusted by businesses around the world.",
    buttonText: "Partner With Us",
    buttonLink: "#",
    note: "Trusted by businesses across India & global markets.",
  },
};

const ICONS = {
  integrity: ShieldCheck,
  quality: Gem,
  innovation: Lightbulb,
  customer: Users,
  sustainability: Leaf,
  excellence: Award,
};

export default function CoreValues({ data }) {
  const content = useMemo(
    () => ({
      ...DEFAULT_DATA,
      ...data,
      values: data?.values?.length ? data.values : DEFAULT_DATA.values,
      cta: { ...DEFAULT_DATA.cta, ...(data?.cta || {}) },
    }),
    [data],
  );

  const { subtitle, title, description, values, cta } = content;

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-52 top-0 h-105 w-105 rounded-full bg-[#D4AF37]/10 blur-[140px]" />
        <div className="absolute -right-52 bottom-0 h-105 w-105 rounded-full bg-[#0A2342]/5 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5">
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          {subtitle && (
            <span className="text-xs font-bold uppercase tracking-[3px] text-[#D4AF37]">
              {subtitle}
            </span>
          )}

          {title && (
            <h2 className="mt-4 text-3xl font-light leading-tight text-[#0A2342] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          )}

          {description && (
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg sm:leading-9">
              {description}
            </p>
          )}
        </div>

        {/* Values Grid */}

        <div className="mt-10 grid gap-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
          {values.map((item, index) => {
            const Icon = ICONS[item.icon] || ShieldCheck;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]/30 hover:shadow-[0_25px_60px_rgba(15,23,42,.12)] sm:p-8"
              >
                {/* Background Glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#D4AF37]/5 blur-2xl transition duration-500 group-hover:scale-150" />

                {/* Index watermark */}
                <span className="pointer-events-none absolute right-6 top-5 text-6xl font-black text-[#0A2342]/4 select-none sm:right-8">
                  0{index + 1}
                </span>

                {/* Badge tag */}
                <div className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/8 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="text-[10px] font-bold uppercase tracking-[3px] text-[#D4AF37]">
                    Core Value
                  </span>
                </div>

                {/* Icon */}
                <div className="relative z-10 mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] sm:h-16 sm:w-16">
                  <Icon
                    size={26}
                    className="text-[#D4AF37] transition-colors duration-300 group-hover:text-[#0A2342]"
                  />
                </div>

                {/* Heading */}
                <h3 className="relative z-10 mt-5 text-2xl font-bold text-[#0A2342] sm:text-[1.6rem]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 mt-3 text-[15px] leading-7 text-gray-500 sm:mt-4 sm:leading-8">
                  {item.description}
                </p>

                {/* Bottom accent line */}
                <div className="relative z-10 mt-6 h-0.5 w-10 rounded-full bg-[#D4AF37]/40 transition-all duration-500 group-hover:w-full group-hover:bg-[#D4AF37]/60" />
              </div>
            );
          })}
        </div>

        {/* ==============================
                Bottom CTA Section
        =============================== */}

        {(cta?.title || cta?.description || cta?.buttonText) && (
          <div className="relative mt-16 overflow-hidden rounded-4xl bg-[#0A2342] px-6 py-10 shadow-[0_35px_90px_rgba(15,23,42,.18)] sm:mt-20 sm:rounded-[40px] sm:px-8 sm:py-12 lg:px-16 lg:py-16">
            {/* Background Decoration */}

            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

            <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left">
              {/* Left Content */}

              <div className="max-w-3xl">
                {cta?.badge && (
                  <span className="text-xs font-bold uppercase tracking-[3px] text-[#D4AF37]">
                    {cta.badge}
                  </span>
                )}

                {(cta?.title || cta?.titleAccent) && (
                  <h3 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                    {cta.title}
                    {cta?.titleAccent && (
                      <span className="block text-[#D4AF37]">
                        {cta.titleAccent}
                      </span>
                    )}
                  </h3>
                )}

                {cta?.description && (
                  <p className="mt-5 max-w-2xl text-[15px] leading-7 text-white/75 sm:text-lg sm:leading-8">
                    {cta.description}
                  </p>
                )}
              </div>

              {/* CTA Button */}

              <div className="flex w-full flex-col items-center gap-4 lg:w-auto lg:items-end">
                {cta?.buttonText && (
                  <a
                    href={cta?.buttonLink || "#"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-semibold text-[#0A2342] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white sm:w-fit"
                  >
                    {cta.buttonText}
                    <ArrowRight size={16} />
                  </a>
                )}

                {cta?.note && (
                  <p className="text-xs text-white/60 sm:text-sm">{cta.note}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
