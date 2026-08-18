"use client";

import Link from "next/link";
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock3,
  Send,
  MessageCircle,
  User,
  Building2,
} from "lucide-react";

/* ==========================================================
                    CONTACT INFO
========================================================== */

const contactInfo = [
  {
    id: 1,
    icon: PhoneCall,
    title: "Call Us",
    value: "+7 916-591-02-78",
    href: "tel:+79165910278",
  },
  {
    id: 2,
    icon: Mail,
    title: "Email Us",
    value: "vanshi-tex@mail.ru",
    href: "mailto:vanshi-tex@mail.ru",
  },
  {
    id: 3,
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat With Us",
    href: "https://wa.me/79165910278",
  },
];

const teamContacts = [
  {
    name: "Anton",
    phone: "+7 985-225-60-30",
    tel: "tel:+79852256030",
    whatsapp: "https://wa.me/79852256030",
  },
  {
    name: "Vikesh",
    phone: "+7 916-591-02-78",
    tel: "tel:+79165910278",
    whatsapp: "https://wa.me/79165910278",
  },
  {
    name: "Hitesh",
    phone: "+7 916-723-66-26",
    tel: "tel:+79167236626",
    whatsapp: "https://wa.me/79167236626",
  },
];

/* ==========================================================
                    COMPONENT
========================================================== */

export default function Contact() {
  return (
    <section
      id="contact-form"
      className="relative overflow-hidden bg-[#ffffff] py-14 sm:py-20 lg:py-28"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* ==========================================================
                    HEADING
        ========================================================== */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20">
          <span className="inline-flex rounded-full  px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[3px] text-[#D4AF37] sm:px-5 sm:py-2 sm:text-xs sm:tracking-[4px]">
            Contact Us
          </span>

          <h2 className="mt-5 text-3xl font-light leading-tight text-[#0A2342] sm:mt-8 sm:text-4xl lg:text-6xl">
            Let's Start Your
            <span className="mt-2 block font-bold">Next Project</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:mt-8 sm:text-lg sm:leading-9">
            Whether you're looking for bulk textile manufacturing, customized
            products, private labeling, or international export services, our
            experts are ready to assist you.
          </p>
        </div>

        {/* ==========================================================
                    CONTACT GRID
        ========================================================== */}
        <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* ==========================================================
                    LEFT — UNIFIED NAVY PANEL
          ========================================================== */}
          <div className="relative overflow-hidden rounded-2xl bg-[#0A2342] p-6 text-white sm:rounded-4xl sm:p-8 lg:p-10">
            {/* Woven-texture signature pattern — a quiet nod to the fabric
                the business is built on, kept subtle enough to read as
                texture rather than decoration. */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 1px, transparent 1px, transparent 14px), repeating-linear-gradient(-45deg, #D4AF37 0px, #D4AF37 1px, transparent 1px, transparent 14px)",
              }}
            />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#D4AF37]/10 blur-[80px]" />

            <div className="relative">
              <span className="inline-flex rounded-full py-1 text-[10px] font-semibold uppercase tracking-[3px] text-[#D4AF37] sm:text-[11px]">
                Reach Us Directly
              </span>

              {/* Contact list */}
              <div className="mt-6 divide-y divide-white/10">
                {contactInfo.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group flex items-center gap-4 py-3.5 first:pt-0 last:pb-0 sm:gap-5 sm:py-4"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/30 transition-all duration-300 group-hover:bg-[#D4AF37] sm:h-12 sm:w-12">
                        <Icon
                          size={19}
                          className="text-[#D4AF37] transition-all duration-300 group-hover:text-[#0A2342] sm:h-5 sm:w-5"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] uppercase tracking-[1.5px] text-white/50 sm:text-xs">
                          {item.title}
                        </p>
                        <h3 className="mt-0.5 truncate text-base font-semibold text-white transition-colors duration-300 group-hover:text-[#D4AF37] sm:text-lg">
                          {item.value}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Team contacts */}
              <div className="mt-7 border-t border-white/10 pt-7 sm:mt-8 sm:pt-8">
                <h4 className="text-sm font-semibold uppercase tracking-[2px] text-[#D4AF37]">
                  Our Team
                </h4>
                <div className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
                  {teamContacts.map((person) => (
                    <div
                      key={person.name}
                      className="flex items-center justify-between gap-3 rounded-xl bg-white  px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#0A2342]">
                          {person.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[#0A2342]/60 sm:text-sm">
                          {person.phone}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <Link
                          href={person.whatsapp}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342]"
                          aria-label={`WhatsApp ${person.name}`}
                        >
                          <MessageCircle size={15} />
                        </Link>
                        <Link
                          href={person.tel}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342]"
                          aria-label={`Call ${person.name}`}
                        >
                          <PhoneCall size={15} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office + Hours */}
              <div className="mt-7 grid gap-4 border-t border-white/10 pt-7 sm:mt-8 sm:gap-5 sm:pt-8 md:grid-cols-2">
                <div className="flex items-start gap-3.5">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-[#D4AF37]"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Corporate Office
                    </h4>
                    <p className="mt-1.5 text-sm leading-6 text-white/60">
                      Russia, 129226, Moscow, m. VDNKH, str.
                      Selskokhozaistveennaya, 4, building 7, shop no.- C6
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock3
                    size={18}
                    className="mt-0.5 shrink-0 text-[#D4AF37]"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      Working Hours
                    </h4>
                    <p className="mt-1.5 text-sm leading-6 text-white/60">
                      Monday – Saturday
                      <br />
                      9:00 AM – 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================================
                    RIGHT — CONTACT FORM
          ========================================================== */}
          <div className="relative overflow-hidden rounded-2xl border border-white bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,.08)] sm:rounded-4xl sm:p-8 lg:p-11">
            {/* Gold hairline accent along the top edge */}

            <div className="mb-8 flex flex-wrap items-start justify-between gap-4 sm:mb-10">
              <div>
                <span className="inline-flex rounded-full text-[10px] font-semibold uppercase tracking-[3px] text-[#D4AF37] sm:text-xs sm:tracking-[4px]">
                  Request A Quote
                </span>

                <h3 className="mt-2 text-2xl font-bold text-[#0A2342] sm:mt-2 sm:text-3xl lg:text-4xl">
                  Send Us An Inquiry
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base sm:leading-8">
                  Fill out the form and our team will respond within 24 hours
                  with the best manufacturing solution for your business.
                </p>
              </div>

              <div className="hidden shrink-0 flex-col items-center justify-center rounded-2xl bg-[#0A2342] px-5 py-4 text-center text-white sm:flex">
                <span className="text-2xl font-bold text-[#D4AF37]">24h</span>
                <span className="mt-0.5 text-[10px] uppercase tracking-[1.5px] text-white/60">
                  Avg. Response
                </span>
              </div>
            </div>

            <form className="space-y-5 sm:space-y-6">
              {/* Row 1 */}
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1px] text-[#0A2342]/70 sm:mb-2.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="John Anderson"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-[#F8F9FB] pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 sm:h-14 sm:rounded-2xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1px] text-[#0A2342]/70 sm:mb-2.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="ABC Textiles"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-[#F8F9FB] pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 sm:h-14 sm:rounded-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1px] text-[#0A2342]/70 sm:mb-2.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-[#F8F9FB] pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 sm:h-14 sm:rounded-2xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1px] text-[#0A2342]/70 sm:mb-2.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <PhoneCall
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="h-12 w-full rounded-xl border border-gray-200 bg-[#F8F9FB] pl-11 pr-4 text-sm outline-none transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 sm:h-14 sm:rounded-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1px] text-[#0A2342]/70 sm:mb-2.5">
                    Product Category
                  </label>
                  <select className="h-12 w-full rounded-xl border border-gray-200 bg-[#F8F9FB] px-4 text-sm outline-none transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 sm:h-14 sm:rounded-2xl">
                    <option>Select Category</option>
                    <option>Home Textile</option>
                    <option>Garments</option>
                    <option>Uniform</option>
                    <option>Hotel Linen</option>
                    <option>Hospital Textile</option>
                    <option>Industrial Fabric</option>
                    <option>Custom Manufacturing</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1px] text-[#0A2342]/70 sm:mb-2.5">
                    Order Quantity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5000 Pieces"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-[#F8F9FB] px-4 text-sm outline-none transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 sm:h-14 sm:rounded-2xl"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[1px] text-[#0A2342]/70 sm:mb-2.5">
                  Your Requirement
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your product requirements, customization, quantity, delivery timeline, etc."
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FB] p-4 text-sm leading-6 outline-none transition-all duration-300 focus:border-[#D4AF37] focus:bg-white focus:ring-4 focus:ring-[#D4AF37]/10 sm:rounded-2xl sm:p-5"
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-5 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <p className="max-w-sm text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7">
                  By submitting this form, you agree to our privacy policy. Our
                  team typically responds within one business day.
                </p>

                <button
                  type="submit"
                  className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#0A2342] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0A2342]/20 transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342] hover:shadow-[#D4AF37]/30 sm:px-10 sm:py-4 sm:text-base"
                >
                  Send Inquiry
                  <Send
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 sm:h-4.5 sm:w-4.5"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
