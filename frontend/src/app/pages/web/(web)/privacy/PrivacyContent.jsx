import React from "react";
import { useEffect, useRef, useState } from "react";


const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: [
      "We collect information you give us directly — your name, company, email address, phone number, and shipping details — when you request a quote, place an order, or contact our team.",
      "We also collect limited technical information automatically, such as browser type, pages visited, and general location, to keep our site secure and understand how it's used.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How We Use Your Information",
    body: [
      "We use your information to prepare quotations, process orders, coordinate shipping and logistics, and respond to inquiries.",
      "We may also use it to send order updates, respond to support requests, and — only if you've opted in — share news about new collections or export opportunities.",
    ],
  },
  {
    id: "sharing",
    title: "How We Share Information",
    body: [
      "We share information with shipping and logistics partners solely to fulfill and deliver your order.",
      "We do not sell your personal information. We disclose it only when required by law, to protect our rights, or with your explicit consent.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    body: [
      "Our website uses essential cookies to keep the site functional, and optional analytics cookies to understand how visitors use our pages.",
      "You can control or disable cookies through your browser settings at any time; doing so may limit some site features.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    body: [
      "We use industry-standard safeguards — encrypted connections, access controls, and regular audits — to protect the information you share with us.",
      "No method of transmission or storage is completely secure, so while we work to protect your data, we can't guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: [
      "You can request access to, correction of, or deletion of your personal information at any time by contacting us.",
      "Depending on where you're located, you may also have the right to restrict or object to certain uses of your data.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: [
      "We may update this policy as our practices evolve. Material changes will be reflected by an updated date at the top of this page.",
      "We encourage you to review this page periodically to stay informed about how we protect your information.",
    ],
  },
];

export default function PrivacyContent() {
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
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    Object.values(sectionRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-white py-20 text-[#0A2342] sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* Table of contents */}
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
                      href={`#${section.id}`}
                      className={`-ml-px border-l-2 py-2 pl-5 text-sm transition-all duration-300 ${
                        isActive
                          ? "border-[#D4AF37] font-semibold text-[#0A2342]"
                          : "border-transparent text-[#0A2342]/50 hover:text-[#0A2342]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}. {section.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Policy sections */}
          <div className="max-w-3xl">
            <p className="text-lg leading-8 text-[#0A2342]/70">
              This policy explains what information we collect when you visit
              our site or work with us, how we use it, and the choices you have.
              If anything here is unclear, our team is happy to walk you through
              it.
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
