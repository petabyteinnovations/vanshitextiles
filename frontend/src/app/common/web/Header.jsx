"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../Logo";

import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingBag,
  User,
  Phone,
  Mail,
  Home,
  Package,
  ChevronRight,
  Grid2X2,
  Info,
  Shield,
  Clipboard,
  NotebookPen,
} from "lucide-react";
import { FcPrivacy } from "react-icons/fc";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [open]);
  const navLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "Categories",
      href: "/categories",
    },
    {
      title: "About",
      href: "/pages/web/about",
    },
    {
      title: "Contact",
      href: "/pages/web/contact",
    },
  ];

  return (
    <>
      {/* ================= TOP BAR ================= */}

      <div className="bg-[#0A2342] text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="w-full md:w-auto flex justify-between items-center gap-6">
            <a
              href="tel:+79165910278"
              className="flex items-center gap-2 text-nowrap"
            >
              <Phone size={15} />
              <span>+7 916-591-02-78</span>
            </a>

            <a
              href="mailto:vanshi-tex@mail.ru"
              className="flex items-center gap-2  text-nowrap"
            >
              <Mail size={15} />
              <span>vanshi-tex@mail.ru</span>
            </a>
          </div>

          <div className="hidden lg:block tracking-wide text-xs uppercase">
            Premium Wholesale Textile Manufacturer
          </div>
        </div>
      </div>

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-24 flex items-center justify-between">
            {/* LOGO */}

            <div className="w-35">
              <Logo />
            </div>

            {/* DESKTOP MENU */}

            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="relative uppercase tracking-wider text-sm font-semibold text-[#0A2342] group"
                >
                  {item.title}

                  <span className="absolute left-0 -bottom-2 h-0.5 bg-(--sand) w-0 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* RIGHT SIDE */}

            <div className="hidden lg:flex items-center gap-6">
              <Link href="/search">
                <Search
                  className="text-[#0A2342] hover:text-(--sand) transition"
                  size={22}
                />
              </Link>

              <Link href="/wishlist">
                <Heart
                  className="text-[#0A2342] hover:text-(--sand) transition"
                  size={22}
                />
              </Link>

              <Link href="/cart">
                <ShoppingBag
                  className="text-[#0A2342] hover:text-(--sand) transition"
                  size={22}
                />
              </Link>

              <Link href="/profile">
                <User
                  className="text-[#0A2342] hover:text-(--sand) transition"
                  size={22}
                />
              </Link>
            </div>

            {/* MOBILE BUTTON */}

            <button onClick={() => setOpen(true)} className="lg:hidden">
              <Menu size={30} />
            </button>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={`fixed inset-0 z-100 transition-all duration-300 ${
          open ? "visible bg-black/40" : "invisible opacity-0"
        }`}
        onClick={() => setOpen(false)}
      >
        <aside
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-[#fafafa] transition-transform duration-300 overflow-y-auto ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}

          <div className="sticky top-0 bg-white border-b px-6 py-5 flex items-center justify-between">
            <Logo />

            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}

          <div className="px-5 py-6 space-y-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <Home size={22} className="text-[#0A2342]" />
                <span className="font-medium text-[#0A2342]">Home</span>
              </div>

              <ChevronRight size={18} className="text-gray-400" />
            </Link>

            <Link
              href="/products"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <Package size={22} className="text-[#0A2342]" />
                <span className="font-medium text-[#0A2342]">Products</span>
              </div>

              <ChevronRight size={18} className="text-gray-400" />
            </Link>

            <Link
              href="/categories"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <Grid2X2 size={22} className="text-[#0A2342]" />
                <span className="font-medium text-[#0A2342]">Categories</span>
              </div>

              <ChevronRight size={18} className="text-gray-400" />
            </Link>

            <Link
              href="/pages/web/about"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <Info size={22} className="text-[#0A2342]" />
                <span className="font-medium text-[#0A2342]">About Us</span>
              </div>

              <ChevronRight size={18} className="text-gray-400" />
            </Link>

            <Link
              href="/pages/web/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <Phone size={22} className="text-[#0A2342]" />
                <span className="font-medium text-[#0A2342]">Contact</span>
              </div>

              <ChevronRight size={18} className="text-gray-400" />
            </Link>
            <Link
              href="/pages/web/blogs"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <NotebookPen size={22} className="text-[#0A2342]" />
                <span className="font-medium text-[#0A2342]">Blogs</span>
              </div>

              <ChevronRight size={18} className="text-gray-400" />
            </Link>

            <Link
              href="/pages/web/privacy"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <Shield size={22} className="text-[#0A2342]" />
                <span className="font-medium text-[#0A2342]">Privacy</span>
              </div>

              <ChevronRight size={18} className="text-gray-400" />
            </Link>

            <Link
              href="/pages/web/terms"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <Clipboard size={22} className="text-[#0A2342]" />
                <span className="font-medium text-[#0A2342]">
                  Terms & Conditions
                </span>
              </div>

              <ChevronRight size={18} className="text-gray-400" />
            </Link>
          </div>

          {/* CTA */}

          <div className="px-5 mt-2 pb-25">
            <button className="w-full rounded-xl bg-[#0A2342] py-4 text-white font-medium hover:bg-[#D4AF37] transition">
              Get Quote
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
