"use client";

import { Heart, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileOptions() {
  const pathname = usePathname();

  const menus = [
    {
      title: "Search",
      href: "/search",
      icon: Search,
    },
    {
      title: "Wishlist",
      href: "/wishlist",
      icon: Heart,
    },
    {
      title: "Cart",
      href: "/cart",
      icon: ShoppingBag,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <section className="md:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-9999 w-[92%] max-w-sm">
      <div className="flex items-center justify-around h-16 rounded-full bg-white/95 backdrop-blur-xl border border-gray-200 shadow-xl px-2">
        {menus.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 flex-1"
            >
              <div
                className={`transition-all duration-300 ${
                  active ? "text-[#D4AF37] scale-110" : "text-[#0A2342]"
                }`}
              >
                <Icon size={20} strokeWidth={2} />
              </div>

              <span
                className={`text-[10px] font-medium ${
                  active ? "text-[#D4AF37]" : "text-[#0A2342]"
                }`}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
