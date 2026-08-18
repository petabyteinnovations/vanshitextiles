"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "Founder & CEO",
    bio: "Visionary leader with over 20 years in textile manufacturing, driving global expansion, innovation, and strategic partnerships worldwide.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Head of Operations",
    bio: "Expert in supply chain management and quality assurance, ensuring every shipment meets international benchmarks.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "Chief Design Officer",
    bio: "Creative force behind our product lines, blending traditional Indian textile heritage with modern design trends.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Sunita Joshi",
    role: "Export Manager",
    bio: "Managing international trade relations across 50+ countries and fostering long-term global client partnerships.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Vikram Verma",
    role: "Quality Assurance Lead",
    bio: "Overseeing strict multi-stage quality inspections to guarantee fabric strength, color fastness, and premium texture.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
  },
];

export default function TeamMembers() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] py-20 sm:py-24 lg:py-32">
      {/* Background Decorative Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-[#D4AF37]/8 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#0A2342]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        
        {/* Header Row with Title & Custom Nav Buttons */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/8 px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[11px] font-bold uppercase tracking-[3px] text-[#D4AF37]">
                Our Team
              </span>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-[#0A2342] sm:text-4xl lg:text-5xl">
              The Leadership Driving Our Success
            </h2>

            <p className="mt-4 text-base leading-7 text-[#4A5B6E] sm:text-lg sm:leading-8">
              Meet the passionate experts who drive innovation, precision quality, and global growth at Vanshi Tex.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              ref={prevRef}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-[#0A2342] transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A2342] active:scale-95 sm:h-12 sm:w-12"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              ref={nextRef}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-[#0A2342] transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A2342] active:scale-95 sm:h-12 sm:w-12"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="mt-10 sm:mt-16">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
            }}
            className="pb-16! pt-2!"
          >
            {TEAM_MEMBERS.map((member) => (
              <SwiperSlide key={member.id} className="h-auto">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-gray-200 bg-white transition-all duration-500 hover:border-[#D4AF37]">
                  
                  {/* 1. Card Image 100% Width */}
                  <div className="relative w-full aspect-3/4 overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Floating Role Pill Tag */}
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#0A2342]/90 px-3.5 py-1.5 backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                      <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#D4AF37]">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* 2. Content below Image */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      {/* Name */}
                      <h3 className="text-xl font-bold text-[#0A2342] transition-colors duration-300 group-hover:text-[#D4AF37]">
                        {member.name}
                      </h3>

                      {/* Bio Description */}
                      <p className="mt-3 text-[13.5px] leading-6 text-[#4A5B6E]">
                        {member.bio}
                      </p>
                    </div>

                    {/* Bottom Accent Indicator */}
                    <div className="mt-6 h-0.5 w-8 rounded-full bg-[#D4AF37]/40 transition-all duration-500 group-hover:w-full group-hover:bg-[#D4AF37]" />
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
