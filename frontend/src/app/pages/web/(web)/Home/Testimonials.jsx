"use client";

import Image from "next/image";
import Link from "next/link";

import Marquee from "react-fast-marquee";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import { Star, Quote, ArrowUpRight } from "lucide-react";

/* ==========================================
                TESTIMONIALS
========================================== */

const testimonials = [
  {
    id: 2,
    name: "Sarah Williams",
    designation: "Founder",
    company: "Luxury Home Decor",
    country: "United Kingdom",

    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900",

    rating: 5,

    review:
      "Outstanding craftsmanship and premium fabrics. Every shipment arrives exactly as promised.",
  },

  {
    id: 3,
    name: "Ahmed Khan",
    designation: "Managing Director",
    company: "Dubai Fashion Group",
    country: "UAE",

    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900",

    rating: 5,

    review:
      "Excellent export quality and packaging. Highly recommended for wholesale textile sourcing.",
  },

  {
    id: 4,
    name: "Rajesh Mehta",
    designation: "CEO",
    company: "Elite Uniform Solutions",
    country: "India",

    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=900",

    rating: 5,

    review:
      "Reliable manufacturing partner with timely delivery and consistent premium quality.",
  },

  {
    id: 5,
    name: "Daniel Smith",
    designation: "Supply Chain Head",
    company: "Premium Apparel",

    country: "Canada",

    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=900",

    rating: 5,

    review:
      "Our trusted textile manufacturing partner for more than six years.",
  },
];

/* ==========================================
          FABRIC / TRUST STRIP ITEMS
========================================== */

const fabricStrip = [
  "VISCOSE FABRIC",
  "EXPORT QUALITY",
  "BELGIAN LINEN",
  "MERINO WOOL",
  "JAPANESE DENIM",
  "SILK COLLECTION",
  "EGYPTIAN COTTON",
  "OEKO-TEX CERTIFIED",
  "ORGANIC COTTON",
  "CASHMERE BLEND",
];

/* ==========================================
                COMPONENT
========================================== */

export default function Testimonials() {
  return (
    // `overflow-hidden` stays off the whole section — it was clipping the
    // card hover shadows/glow on the left & right edges. Only the
    // fabric-strip bar (below) needs its own overflow-hidden for the
    // full-bleed marquee trick, so it's scoped there instead.
    <section className="relative bg-[#fafafa] pt-14 sm:pt-20 lg:pt-32">
      <div className="relative z-10 mx-auto max-w-7xl px-5">
        {/* ==========================================================
                    SECTION HEADING
========================================================== */}

        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <span className="inline-flex rounded-full  px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[3px] text-[#D4AF37] sm:px-5 sm:py-2 sm:text-xs sm:tracking-[4px]">
            Client Testimonials
          </span>

          <h2 className="mt-5 text-3xl font-light leading-tight text-[#0A2342] sm:mt-8 sm:text-4xl lg:text-6xl">
            Trusted By
            <span className="mt-2 block font-bold">Businesses Worldwide</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-9">
            Every partnership is built on trust, premium quality, transparent
            communication and consistent manufacturing. Here's what our global
            clients say about working with us.
          </p>
        </div>

        {/* ==========================================================
                TESTIMONIAL SLIDER
========================================================== */}

        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          // Tighter gap on mobile so a single slide isn't fighting for
          // space with peeking neighbours; more room to breathe once
          // there's space for 2-3 slides per view.
          spaceBetween={20}
          loop
          speed={900}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              spaceBetween: 28,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 36,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 48,
            },
          }}
          // Swiper's own base CSS sets `overflow: hidden` on the
          // `.swiper` root, which clips the card's hover lift
          // (-translate-y-3) and growing shadow at the top and bottom.
          // `!overflow-x-hidden` keeps the horizontal clipping we need
          // (so looping/peeking slides don't create a page scrollbar),
          // while `!overflow-y-visible` lets vertical hover effects
          // show fully. Side padding shrinks on mobile so cards aren't
          // squeezed on narrow screens.
          className="mt-10 overflow-x-hidden! overflow-y-visible! px-1! py-6! sm:px-6! sm:mt-16 testimonialSwiper bg-[#F8F9FB] mb-12 sm:mb-20"
        >
          {testimonials.map((item) => (
            // Slides stretch to match the tallest one in each row
            // (Swiper's default align-items: stretch) since there's no
            // h-auto override here.
            <SwiperSlide key={item.id}>
              <div className="group relative flex h-full min-h-105 flex-col overflow-hidden rounded-3xl border border-white/80 bg-white p-6 transition-all duration-500 hover:-translate-y-3 hover:border-[#D4AF37]/40 sm:min-h-105 sm:rounded-4xl sm:p-8">
                {/* Background Glow */}

                <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#D4AF37]/10 opacity-0 blur-[100px] transition-all duration-500 group-hover:opacity-100" />

                {/* Quote */}

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 transition-all duration-300 group-hover:bg-[#D4AF37] sm:h-14 sm:w-14">
                    <Quote
                      size={22}
                      className="text-[#D4AF37] transition-all duration-300 group-hover:text-white sm:h-6.5 sm:w-6.5"
                    />
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[1.5px] text-green-700 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[2px]">
                    Verified
                  </span>
                </div>

                {/* Stars */}

                <div className="relative z-10 mt-6 flex gap-1 sm:mt-8">
                  {[...Array(item.rating)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className="fill-[#D4AF37] text-[#D4AF37] sm:h-4.5 sm:w-4.5"
                    />
                  ))}
                </div>

                {/* Review */}

                <p className="relative z-10 mt-5 flex-1 text-[15px] leading-7 text-gray-600 sm:mt-6 sm:text-[16px] sm:leading-8">
                  "{item.review}"
                </p>

                {/* Divider */}

                <div className="relative z-10 my-6 h-px w-full bg-gray-200 sm:my-8" />

                {/* Client */}

                <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-4 ring-[#D4AF37]/10 sm:h-16 sm:w-16">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-base font-bold text-[#0A2342] sm:text-lg">
                      {item.name}
                    </h4>

                    <p className="truncate text-xs text-gray-500 sm:text-sm">
                      {item.designation}
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-[#D4AF37] sm:text-base">
                      {item.company}
                    </p>
                  </div>
                </div>

                {/* Footer */}

                <div className="relative z-10 mt-6 flex items-center justify-between sm:mt-8">
                  <span className="rounded-full bg-[#0A2342]/5 px-3 py-1.5 text-xs font-medium text-[#0A2342] sm:px-4 sm:py-2 sm:text-sm">
                    {item.country}
                  </span>

                  <ArrowUpRight
                    size={20}
                    className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-5.5 sm:w-5.5"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ==========================================================
              FABRIC / TRUST STRIP — full-bleed navy marquee bar
      ========================================================== */}
      {/* This is the only part of the section that still needs its own
          overflow-hidden wrapper — it's what makes the negative-margin
          full-bleed trick work without creating a horizontal page
          scrollbar. Scoping it here (instead of on the whole section)
          means it no longer clips the testimonial cards above. */}

      <div className="relative z-10 overflow-hidden">
        <div className="relative left-1/2 right-1/2 mx-[-50vw] w-screen bg-[#0A2342] py-4 shadow-[0_10px_40px_rgba(10,35,66,.25)] sm:py-6">
          <Marquee speed={40} gradient={false} pauseOnHover>
            {fabricStrip.map((item, index) => (
              <div key={index} className="flex items-center">
                <Star
                  size={14}
                  className="mx-5 shrink-0 fill-[#D4AF37] text-[#D4AF37] sm:mx-8 sm:h-4 sm:w-4"
                />
                <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[2px] text-white sm:text-sm sm:tracking-[3px]">
                  {item}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}