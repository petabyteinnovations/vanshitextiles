"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PrivacyHero() {
  const LAST_UPDATED = "July 1, 2026";

  return (
    <section className="relative flex h-[70vh] min-h-125 items-center overflow-hidden sm:h-[75vh]">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=2000&q=80"
        alt="Privacy Policy"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#081C34]/95 via-[#081C34]/75 to-[#081C34]/45" />

      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_60%)]" />

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[150px]" />

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-center gap-2 text-sm text-white/60">
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-[#D4AF37]"
          >
            Home
          </Link>

          <ChevronRight size={14} />

          <span className="text-[#D4AF37]">Privacy Policy</span>
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl">
          Your Privacy,
          <span className="mt-2 block font-bold text-[#D4AF37]">
            Our Priority
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
          We value your trust and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use,
          safeguard, and manage your data while ensuring complete transparency
          and compliance with applicable privacy standards.
        </p>

        {/* Last Updated */}
        <div className="mt-10 inline-flex items-center rounded-full px-6 py-3 backdrop-blur-md">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-white/70">
            Last Updated • {LAST_UPDATED}
          </p>
        </div>
      </div>
    </section>
  );
}
