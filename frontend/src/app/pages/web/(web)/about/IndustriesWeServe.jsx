"use client";

import { useMemo } from "react";
import {
  Hotel,
  HeartPulse,
  Shirt,
  Home,
  ShoppingBag,
  Building2,
  Gift,
  Globe2,
} from "lucide-react";

const DEFAULT_DATA = {
  subtitle: "Industries We Serve",
  title: "Textile Solutions Tailored for Every Industry",
  description:
    "From hospitality and healthcare to retail and global exports, we manufacture premium textile products for businesses worldwide.",
  industries: [
    { title: "Hospitality", icon: "hotel" },
    { title: "Healthcare", icon: "health" },
    { title: "Fashion", icon: "fashion" },
    { title: "Home Furnishing", icon: "home" },
    { title: "Retail", icon: "retail" },
    { title: "Corporate", icon: "corporate" },
    { title: "Promotional", icon: "gift" },
    { title: "Global Export", icon: "global" },
  ],
};

const ICONS = {
  hotel: Hotel,
  health: HeartPulse,
  fashion: Shirt,
  home: Home,
  retail: ShoppingBag,
  corporate: Building2,
  gift: Gift,
  global: Globe2,
};

function IndustryPill({ item }) {
  const Icon = ICONS[item.icon] ?? Hotel;

  return (
    <div className="flex shrink-0 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-4 transition-colors duration-300 hover:border-[#D4AF37]/40">
      <Icon size={20} className="text-[#D4AF37]" />
      <span className="whitespace-nowrap text-lg font-medium text-white/90">
        {item.title}
      </span>
    </div>
  );
}

export default function IndustriesWeServe({ data }) {
  const content = useMemo(() => ({ ...DEFAULT_DATA, ...data }), [data]);

  return (
    <section className="relative overflow-hidden bg-[#0A2342] py-24 text-white">
      {/* Background Texture — matches the glow pattern used across the site */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-52 top-0 h-105 w-105 rounded-full bg-[#D4AF37]/10 blur-[140px]" />
        <div className="absolute -right-52 bottom-0 h-105 w-105 rounded-full bg-white/5 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[3px] text-[#D4AF37]">
            {content.subtitle}
          </span>
          <h2 className="mt-6 text-4xl font-light leading-tight sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-white/70">{content.description}</p>
        </div>
      </div>

      {/* ==========================================================
                        MARQUEE
      ========================================================== */}
      <div className="group/marquee relative z-10 w-full">
        {/* Edge fades so pills don't hard-clip against the section edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-[#0A2342] to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-[#0A2342] to-transparent sm:w-40" />

        <div className="flex w-max animate-marquee gap-5 group-hover/marquee:[animation-play-state:paused]">
          {content.industries.map((item) => (
            <IndustryPill key={`a-${item.title}`} item={item} />
          ))}
          {/* Duplicate track for a seamless loop */}
          {content.industries.map((item) => (
            <IndustryPill key={`b-${item.title}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
