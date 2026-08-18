"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  BarChart3,
  Settings,
  Gavel,
  FileText,
  Image as ImageIcon,
  Newspaper,
  MessageSquareQuote,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  Home,
} from "lucide-react";
import Logo from "../Logo";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/pages/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    label: "Home",
    href: "/pages/admin/home",
    icon: Home,
  },

  {
    label: "About Us",
    href: "/pages/admin/about",
    icon: FileText,
  },

  {
    label: "Contact Us",
    href: "/pages/admin/contact",
    icon: PhoneCall,
  },

  {
    label: "Blog",
    icon: Newspaper,
    href: "/pages/admin/blog",
  },

  {
    label: "Faq",
    href: "/pages/admin/faqs",
    icon: HelpCircle,
  },
  {
    label: "Services",
    href: "/pages/admin/pages/services",
    icon: Package,
  },

  {
    label: "Gallery",
    href: "/pages/admin/pages/gallery",
    icon: ImageIcon,
  },

  {
    label: "Privacy Policy",
    href: "/pages/admin/pages/privacy-policy",
    icon: ShieldCheck,
  },

  {
    label: "Terms & Conditions",
    href: "/pages/admin/pages/terms",
    icon: FileText,
  },

  {
    label: "Products",
    icon: Package,
    children: [
      {
        label: "All Products",
        href: "/pages/admin/products",
      },
      {
        label: "Add Product",
        href: "/pages/admin/products/add",
      },
    ],
  },

  {
    label: "Categories",
    href: "/pages/admin/categories",
    icon: Tags,
  },

  {
    label: "Orders",
    icon: ShoppingCart,
    children: [
      {
        label: "All Orders",
        href: "/pages/admin/orders",
      },
      {
        label: "Pending",
        href: "/pages/admin/orders/pending",
      },
      {
        label: "Returns / Refunds",
        href: "/pages/admin/orders/returns",
      },
    ],
  },

  {
    label: "Auctions",
    href: "/pages/admin/auctions",
    icon: Gavel,
  },

  {
    label: "Testimonials",
    href: "/pages/admin/testimonials",
    icon: MessageSquareQuote,
  },

  {
    label: "Customers",
    href: "/pages/admin/customers",
    icon: Users,
  },

  {
    label: "Invoices / Quotations",
    href: "/pages/admin/invoices",
    icon: FileText,
  },

  {
    label: "Reports",
    href: "/pages/admin/reports",
    icon: BarChart3,
  },

  {
    label: "Users & Roles",
    href: "/pages/admin/users",
    icon: ShieldCheck,
  },

  {
    label: "Settings",
    icon: Settings,
    children: [
      {
        label: "General",
        href: "/pages/admin/settings/general",
      },
      {
        label: "SEO",
        href: "/pages/admin/settings/seo",
      },
      {
        label: "Theme",
        href: "/pages/admin/settings/theme",
      },
    ],
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(null);

  function isChildActive(children) {
    return children?.some(
      (child) =>
        pathname === child.href || pathname?.startsWith(child.href + "/"),
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col
          ${
            sidebarOpen
              ? "w-72 translate-x-0"
              : "w-72 -translate-x-full lg:w-20 lg:translate-x-0"
          }
        `}
      >
        {/* Logo Area */}
        <div className="flex h-20 items-center justify-center border-b border-gray-200 px-4 shrink-0">
          <Link
            href="/pages/admin/dashboard"
            className="flex items-center gap-3"
          >
            <Logo />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            /* -------------------------------------------------------------- */
            /*                         Dropdown Item                          */
            /* -------------------------------------------------------------- */

            if (item.children) {
              const active = isChildActive(item.children);
              const isOpen = openMenu === item.label;

              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className={`w-full group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition
                      ${
                        active
                          ? "bg-[#0A2342]/10 text-[#0A2342]"
                          : "text-gray-600 hover:bg-[#0A2342] hover:text-white"
                      }
                      ${!sidebarOpen ? "lg:justify-center" : ""}
                    `}
                  >
                    <Icon
                      size={20}
                      className={`shrink-0 ${
                        active
                          ? "text-[#0A2342]"
                          : "text-gray-500 group-hover:text-white"
                      }`}
                    />

                    <span
                      className={`flex-1 text-left ${
                        !sidebarOpen ? "lg:hidden" : ""
                      }`}
                    >
                      {item.label}
                    </span>

                    <ChevronRight
                      size={16}
                      className={`transition-transform ${
                        isOpen ? "rotate-90" : ""
                      } ${!sidebarOpen ? "lg:hidden" : ""}`}
                    />
                  </button>

                  {/* Children */}
                  {isOpen && (
                    <div
                      className={`mt-1 ml-4 space-y-1 border-l border-gray-200 pl-4 ${
                        !sidebarOpen ? "lg:hidden" : ""
                      }`}
                    >
                      {item.children.map((child) => {
                        const childActive =
                          pathname === child.href ||
                          pathname?.startsWith(child.href + "/");

                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => {
                              if (window.innerWidth < 1024) {
                                setSidebarOpen(false);
                              }
                            }}
                            className={`block rounded-lg px-3 py-2 text-sm transition
                              ${
                                childActive
                                  ? "bg-[#D4AF37] text-[#0A2342] font-medium"
                                  : "text-gray-500 hover:bg-[#0A2342] hover:text-white"
                              }
                            `}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            /* -------------------------------------------------------------- */
            /*                         Simple Link                              */
            /* -------------------------------------------------------------- */

            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-[#D4AF37] text-[#0A2342]"
                      : "text-gray-600 hover:bg-[#0A2342] hover:text-white"
                  }
                  ${!sidebarOpen ? "lg:justify-center" : ""}
                `}
              >
                <Icon
                  size={20}
                  className={`shrink-0 ${
                    isActive
                      ? "text-[#0A2342]"
                      : "text-gray-500 group-hover:text-white"
                  }`}
                />

                <span className={!sidebarOpen ? "lg:hidden" : ""}>
                  {item.label}
                </span>

                {isActive && sidebarOpen && (
                  <ChevronRight size={16} className="ml-auto text-[#0A2342]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 shrink-0">
          <div
            className={`text-xs text-gray-400 ${
              !sidebarOpen ? "lg:hidden" : ""
            }`}
          >
            © {new Date().getFullYear()} Vanshi Textile
          </div>
        </div>
      </aside>
    </>
  );
}
