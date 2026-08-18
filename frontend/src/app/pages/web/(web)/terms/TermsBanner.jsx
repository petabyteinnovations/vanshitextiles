"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function TermsBanner() {
  return (
    <section className="relative flex h-115 min-h-110 items-center overflow-hidden sm:h-130">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=2000&q=80"
        alt="Terms and Conditions"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-[#081C34]/90 via-[#081C34]/70 to-[#081C34]/40" />

      {/* Gold Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_60%)]" />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center sm:px-6">
        <div className="mb-6 flex items-center justify-center gap-2 text-sm text-white/60">
          <Link href="/" className="transition hover:text-[#D4AF37]">
            Home
          </Link>

          <ChevronRight size={14} />

          <span className="text-[#D4AF37]">Terms & Conditions</span>
        </div>

        <h1 className="font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
          Terms That Keep
          <span className="mt-2 block font-bold text-[#D4AF37]">
            Things Fair
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
          The terms and conditions that govern your use of our site and
          services.
        </p>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[3px] text-white/40">
          Last Updated · July 1, 2026
        </p>
      </div>
    </section>
  );
}