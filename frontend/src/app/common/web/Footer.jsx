"use client";
import {
  ArrowUpRight,
  ChevronRight,
  Mail,
  MapPin,
  PhoneCall,
} from "lucide-react";
import Link from "next/link";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
/* ==========================================================
                    QUICK LINKS
========================================================== */

const quickLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/pages/web/about" },
  { title: "Products", href: "/products" },
  { title: "Categories", href: "/categories" },
  { title: "Blogs", href: "/pages/web/blogs" },
  { title: "Contact", href: "/pages/web/contact" },
  { title: "Privacy", href: "/pages/web/privacy" },
  { title: "Terms & Conditions", href: "/pages/web/terms" },
];

/* ==========================================================
                  PRODUCT LINKS
========================================================== */

const productLinks = [
  "Cotton Fabrics",
  "Hotel Linen",
  "Hospital Textile",
  "Uniform Fabrics",
  "Home Furnishing",
  "Industrial Fabric",
  "Custom Manufacturing",
];

/* ==========================================================
                INDUSTRIES
========================================================== */

const industries = [
  "Hotels",
  "Hospitals",
  "Corporate",
  "Retail",
  "Fashion",
  "Education",
  "Government",
];

/* ==========================================================
                SOCIAL LINKS
========================================================== */

const socials = [
  { icon: FaFacebook, href: "#" },
  { icon: BsInstagram, href: "#" },
  { icon: LiaLinkedin, href: "#" },
  { icon: BsYoutube, href: "#" },
];

/* ==========================================================
                COMPONENT
========================================================== */

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#081C34] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[100px] sm:h-112.5 sm:w-112.5 sm:blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-white/5 blur-[110px] sm:h-112.5 sm:w-112.5 sm:blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* ==========================================================
                    MAIN FOOTER
        ========================================================== */}
        <section className="grid grid-cols-1 gap-10 border-t border-white/10 py-14 sm:grid-cols-2 sm:gap-12 sm:py-20 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* ------------------------------------------------------
                      COMPANY INFO
          ------------------------------------------------------ */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-serif"
            >
              <div>
                <h3 className="text-xl font-bold sm:text-2xl">Vanshi Tex</h3>

                <p className="text-[10px] uppercase tracking-[2px] text-[#D4AF37] sm:text-sm sm:tracking-[3px]">
                  Premium Textile Manufacturer
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-6 text-gray-300 sm:mt-8 sm:text-base sm:leading-8">
              Delivering premium-quality textile manufacturing solutions with
              cutting-edge technology, sustainable production and global export
              capabilities.
            </p>

            {/* Contact */}
            <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 sm:h-11 sm:w-11">
                  <PhoneCall size={17} className="sm:h-4.5 sm:w-4.5" />
                </div>
                <span className="text-sm sm:text-base">+7 916-591-02-78</span>
              </div>

              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 sm:h-11 sm:w-11">
                  <Mail size={17} className="sm:h-4.5 sm:w-4.5" />
                </div>
                <span className="text-sm sm:text-base">vanshi-tex@mail.ru</span>
              </div>

              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 sm:mt-1 sm:h-11 sm:w-11">
                  <MapPin size={17} className="sm:h-4.5 sm:w-4.5" />
                </div>
                <span className="max-w-xs text-sm leading-6 sm:text-base sm:leading-7">
                  Russia, 129226, Moscow, m. VDNKH, str. Selskokhozaistveennaya,
                  4, building 7, shop no.- C6
                </span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8 flex gap-3.5 sm:mt-10 sm:gap-4">
              {socials.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342] sm:h-12 sm:w-12"
                  >
                    <Icon size={17} className="sm:h-4.5 sm:w-4.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------
                    QUICK LINKS
          ------------------------------------------------------ */}
          <div>
            <h3 className="text-lg font-semibold sm:text-2xl">Quick Links</h3>

            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {quickLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-3 text-sm text-gray-300 transition-all duration-300 hover:text-[#D4AF37] sm:text-base"
                >
                  <ChevronRight
                    size={15}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
                  />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------
                  PRODUCT CATEGORIES
          ------------------------------------------------------ */}
          <div>
            <h3 className="text-lg font-semibold sm:text-2xl">
              Product Categories
            </h3>

            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {productLinks.map((item) => (
                <Link
                  href="#"
                  key={item}
                  className="group flex items-center gap-3 text-sm text-gray-300 transition-all duration-300 hover:text-[#D4AF37] sm:text-base"
                >
                  <ChevronRight
                    size={15}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
                  />
                  <span>{item}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------------
                INDUSTRIES WE SERVE
          ------------------------------------------------------ */}
          <div>
            <h3 className="text-lg font-semibold sm:text-2xl">Industries</h3>

            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {industries.map((item) => (
                <Link
                  href="#"
                  key={item}
                  className="group flex items-center gap-3 text-sm text-gray-300 transition-all duration-300 hover:text-[#D4AF37] sm:text-base"
                >
                  <ChevronRight
                    size={15}
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
                  />
                  <span>{item}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================================
                  FOOTER BOTTOM
        ========================================================== */}
        <section className="border-t border-white/10 py-6 sm:py-8 pb-30">
          <div className="flex flex-col items-center justify-center gap-5 sm:gap-6 lg:flex-row">
            {/* Left */}
            <p className="text-center text-xs leading-6 text-gray-4 00 sm:text-sm sm:leading-7 lg:text-left">
              <a href="https://petabyteinnovations.in">
                {" "}
                © {new Date().getFullYear()} Vanshi Tex. All Rights Reserved.
                <span className=" text-[#D4AF37]">•</span>
                Designed &amp; Developed with ❤️ By Petabyte Innovations.
              </a>
            </p>

            {/* Right */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={
                "fixed bottom-5 right-5 bg-[#0A2342] group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A2342] sm:h-12 sm:w-12"
              }
              aria-label="Back to top"
            >
              <ArrowUpRight
                size={19}
                className="-rotate-45 transition-transform duration-300 group-hover:-translate-y-1 sm:h-5 sm:w-5"
              />
            </button>
          </div>
        </section>
      </div>
    </footer>
  );
}
