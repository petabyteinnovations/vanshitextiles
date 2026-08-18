"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  {
    id: "terms-acceptance",
    title: "Acceptance of Terms",
    body: [
      "By accessing or using our website and services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our site or services.",
      "We may update these terms from time to time; continued use of our services after changes are posted constitutes acceptance of the revised terms.",
    ],
  },
  {
    id: "terms-quotes-orders",
    title: "Quotes & Orders",
    body: [
      "Quotations provided through our site or by our team are estimates and subject to confirmation based on availability, specifications, and current pricing.",
      "An order is only considered accepted once we've confirmed it in writing. We reserve the right to decline or cancel any order at our discretion.",
    ],
  },
  {
    id: "terms-pricing-payment",
    title: "Pricing & Payment",
    body: [
      "All prices are listed in the currency specified at checkout or in your quote and are subject to change without prior notice until an order is confirmed.",
      "Payment terms will be outlined in your order confirmation or invoice. Late or failed payments may result in delayed processing or cancellation of your order.",
    ],
  },
  {
    id: "terms-shipping-delivery",
    title: "Shipping & Delivery",
    body: [
      "Delivery timelines are estimates only and may vary due to customs, logistics partners, or circumstances beyond our control.",
      "Risk of loss or damage transfers to you upon handoff to the shipping carrier, unless otherwise agreed in writing.",
    ],
  },
  {
    id: "terms-returns-cancellations",
    title: "Returns & Cancellations",
    body: [
      "Requests to cancel or modify an order must be made as soon as possible; we cannot guarantee changes once production or shipping has begun.",
      "Returns, exchanges, or refunds are handled on a case-by-case basis and may be subject to restocking or shipping fees.",
    ],
  },
  {
    id: "terms-intellectual-property",
    title: "Intellectual Property",
    body: [
      "All content on this site, including text, images, logos, and designs, is our property or used with permission, and may not be reproduced without consent.",
      "Any feedback, suggestions, or ideas you share with us may be used by us without obligation or compensation to you.",
    ],
  },
  {
    id: "terms-limitation-of-liability",
    title: "Limitation of Liability",
    body: [
      "We are not liable for indirect, incidental, or consequential damages arising from your use of our site or services, to the fullest extent permitted by law.",
      "Our total liability for any claim related to an order will not exceed the amount you paid for that order.",
    ],
  },
  {
    id: "terms-governing-law",
    title: "Governing Law",
    body: [
      "These terms are governed by the laws of the jurisdiction in which our company is registered, without regard to conflict-of-law principles.",
      "Any disputes arising from these terms will be resolved through the courts or arbitration bodies with jurisdiction over that location.",
    ],
  },
];

export default function TermsContent() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    const currentRefs = sectionRefs.current;

    Object.values(currentRefs).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-white py-20 text-[#0A2342] sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#D4AF37]">
                On This Page
              </p>
              <nav className="mt-6 flex flex-col gap-1 border-l border-[#0A2342]/10">
                {SECTIONS.map((section, index) => {
                  const isActive = activeId === section.id;
                  return (
                    <a
                      key={section.id}
                      href={"#" + section.id}
                      className={
                        "-ml-px border-l-2 py-2 pl-5 text-sm transition-all duration-300 " +
                        (isActive
                          ? "border-[#D4AF37] font-semibold text-[#0A2342]"
                          : "border-transparent text-[#0A2342]/50 hover:text-[#0A2342]")
                      }
                    >
                      {String(index + 1).padStart(2, "0")}. {section.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="max-w-3xl">
            <p className="text-lg leading-8 text-[#0A2342]/70">
              Please read these terms carefully before using our site or
              placing an order. They govern our relationship with you and
              outline the rights and responsibilities on both sides.
            </p>

            <div className="mt-16 space-y-16">
              {SECTIONS.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id}
                  ref={(node) => {
                    sectionRefs.current[section.id] = node;
                  }}
                  className="scroll-mt-28"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-2xl text-[#D4AF37]/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-serif text-2xl leading-tight text-[#0A2342] sm:text-3xl">
                      {section.title}
                    </h2>
                  </div>

                  <div className="mt-5 space-y-4 border-l border-[#0A2342]/10 pl-6">
                    {section.body.map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-base leading-7 text-[#0A2342]/70"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}