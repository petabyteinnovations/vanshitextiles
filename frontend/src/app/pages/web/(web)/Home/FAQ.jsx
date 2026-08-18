"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";

/* ==========================================================
                    FAQ DATA
========================================================== */

/* ==========================================================
                COMPONENT
========================================================== */

export default function FAQ() {
  const [faqs, setfaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const viewdata = async () => {
    try {
      await apiurl
        .get("/web/view-faqs")
        .then((res) => {
          setfaqs(res.data.Data.viewimages);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    viewdata();
  }, []);
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Eyebrow + heading */}
        <div className="mb-10 max-w-xl sm:mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[3px] text-[#D4AF37] sm:text-xs">
            FAQ (Frequently Asked Questions)
          </span>
          <h2 className="mt-3 text-2xl font-medium text-[#0A2342] sm:mt-4 sm:text-3xl lg:text-4xl">
            Questions, answered.
          </h2>
        </div>

        {/* ==========================================================
              IMAGE (TOP ON MOBILE / LEFT ON DESKTOP)
              +  FAQ ACCORDION (BELOW ON MOBILE / RIGHT ON DESKTOP)
        ========================================================== */}
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* -------------------- IMAGE -------------------- */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <div className="overflow-hidden rounded-xl sm:rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80"
                alt="Rolls of textile fabric"
                width={900}
                height={1100}
                className="h-56 w-full object-cover sm:h-80 md:h-105 lg:h-140"
                priority
              />
            </div>
          </div>

          {/* -------------------- FAQ ACCORDION -------------------- */}
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {Array.isArray(faqs) &&
              faqs?.map((faq, index) => (
                <div key={index}>
                  {/* QUESTION */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left sm:gap-6 sm:py-6"
                  >
                    <h3 className="text-sm font-medium text-[#0A2342] sm:text-base lg:text-lg">
                      {faq.Faq_Question}
                    </h3>

                    <span className="shrink-0 text-[#0A2342]/50">
                      {activeIndex === index ? (
                        <Minus size={16} className="sm:h-4.5 sm:w-4.5" />
                      ) : (
                        <Plus size={16} className="sm:h-4.5 sm:w-4.5" />
                      )}
                    </span>
                  </button>

                  {/* ANSWER */}
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                      activeIndex === index
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-lg pb-4 text-sm leading-6 text-gray-500 sm:pb-6 sm:text-[15px] sm:leading-7">
                        {faq.Faq_Answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            {/* Simple contact line under the accordion */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-6 sm:py-8">
              <p className="text-sm text-gray-500">Still have a question?</p>
              <Link
                href="/pages/web/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A2342] hover:text-[#D4AF37]"
              >
                Get in touch
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
