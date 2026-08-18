"use client";

import { useEffect, useRef, useState } from "react";
import { Factory, Globe2, Award, Trophy } from "lucide-react";

/* ==========================================================================
   1. STATS DATA ARRAY
   Contains all the key statistics displayed in the counter section cards.
========================================================================== */
const STATS = [
  {
    id: 1,
    value: "15", // The number value to count up to (with suffix)
    label: "Years Experience", // Card subtitle/description
    icon: Factory, // Lucide icon component
    numberIndex: "01", // Watermark background number
  },
  {
    id: 2,
    value: "50",
    label: "Export Countries",
    icon: Globe2,
    numberIndex: "02",
  },
  {
    id: 3,
    value: "500",
    label: "Happy Clients",
    icon: Award,
    numberIndex: "03",
  },
  {
    id: 4,
    value: "2M",
    label: "Products Delivered",
    icon: Trophy,
    numberIndex: "04",
  },
];

/* ==========================================================================
   2. COUNTER NUMBER ANIMATION COMPONENT
   Extracts the target number (e.g. 15 from "15+") and animates it from 0 to 15
   smoothly when the user scrolls down to this component.
========================================================================== */
function CounterNumber({ value }) {
  // State to store the current animated number (starts at 0)
  const [count, setCount] = useState(0);

  // State to track if animation has already run (prevents re-triggering)
  const [hasAnimated, setHasAnimated] = useState(false);

  // Ref attached to the <span> element for scroll visibility check
  const elementRef = useRef(null);

  // Parse target number (e.g., "15+" -> number: 15, suffix: "+")
  const numericTarget = parseFloat(value) || 0;
  const suffix = value.replace(/[\d.]/g, ""); // Extract non-numeric characters like "+", "M+"

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Function to run the 0 -> target number animation
    const animateCount = () => {
      if (hasAnimated) return;
      setHasAnimated(true);

      const duration = 1800; // Animation duration in milliseconds (1.8s)
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Smooth ease-out formula: slows down as it reaches target
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.round(easeOutProgress * numericTarget);

        setCount(currentCount);

        // Continue animation frames until 100% complete
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(numericTarget);
        }
      };

      requestAnimationFrame(step);
    };

    // Use IntersectionObserver to trigger animation when user scrolls into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCount();
          observer.disconnect(); // Stop observing after animation starts
        }
      },
      { threshold: 0.2 } // Triggers when 20% of the element is visible
    );

    observer.observe(element);

    // Fallback: If element is already on screen when page loads, trigger immediately
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      animateCount();
    }

    return () => observer.disconnect();
  }, [numericTarget, hasAnimated]);

  return (
    <span ref={elementRef}>
      {/* Display current animated count (or 0 before animation) */}
      {hasAnimated ? count : 0}

      {/* Styled gold suffix (+) */}
      <span className="text-[#D4AF37]">{suffix}</span>
    </span>
  );
}

/* ==========================================================================
   3. MAIN COUNTER SECTION COMPONENT
   Renders section background, header title, and 4 clean stat cards.
========================================================================== */
export default function CounterSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] py-20 sm:py-24 lg:py-32">
      {/* Soft Gold Background Blur Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[450px] w-[450px] rounded-full bg-[#D4AF37]/8 blur-[130px]" />
        <div className="absolute -right-32 bottom-0 h-[450px] w-[450px] rounded-full bg-[#0A2342]/5 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">

        {/* ------------------------------------------------------------------
            SECTION HEADER: Badge tag, Main title & Description
        ------------------------------------------------------------------ */}
        <div className="mx-auto mb-16 max-w-4xl text-center sm:mb-20">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/8 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[11px] font-bold uppercase tracking-[3px] text-[#D4AF37]">
              Achievements
            </span>
          </div>

          {/* Main Section Heading */}
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#0A2342] sm:text-5xl lg:text-6xl">
            Our Journey of Growth &amp; Excellence
          </h2>

          {/* Description Paragraph */}
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#4A5B6E]">
            Through innovation, precision manufacturing, and an uncompromising commitment to quality, we have built lasting partnerships with businesses across the globe.
          </p>
        </div>

        {/* ------------------------------------------------------------------
            STATISTICS CARDS GRID (4 Columns on Desktop, 2 on Tablet, 1 on Mobile)
        ------------------------------------------------------------------ */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-gray-200 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37]"
              >

                <div>
                  {/* Card Top Row: Icon Badge + Watermark Index */}
                  <div className="flex items-center justify-between">
                    {/* Icon Container */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4AF37]/10 transition-colors duration-500 group-hover:bg-[#D4AF37]">
                      <Icon className="h-7 w-7 text-[#D4AF37] transition-colors duration-500 group-hover:text-[#0A2342]" />
                    </div>

                    {/* Watermark Index Number (01, 02, 03, 04) */}
                    <span className="font-serif text-5xl font-bold text-[#0A2342]/10 transition-colors duration-500 group-hover:text-[#D4AF37]/30 select-none">
                      {stat.numberIndex}
                    </span>
                  </div>

                  {/* Card Main Number & Label */}
                  <div className="mt-8">
                    {/* Animated Number in Gold */}
                    <div className="text-5xl font-black tracking-tight text-[#D4AF37] lg:text-6xl">
                      <CounterNumber value={stat.value} />+
                    </div>

                    {/* Stat Label */}
                    <p className="mt-4 text-xs font-bold uppercase tracking-[2px] text-[#4A5B6E] transition-colors duration-300 group-hover:text-[#0A2342]">
                      {stat.label}
                    </p>
                  </div>
                </div>

                {/* Bottom Accent Line (Expands on Hover) */}
                <div className="mt-8 h-0.5 w-10 rounded-full bg-[#D4AF37]/40 transition-all duration-500 group-hover:w-full group-hover:bg-[#D4AF37]" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
