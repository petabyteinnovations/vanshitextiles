"use client";

import Link from "next/link";
import { ArrowUpRight, Newspaper, Wallpaper } from "lucide-react";

const HOME_SECTIONS = [
    {
        title: "Blog Hero Banner",
        description:
            "Manage blog page banner, heading, button and background image.",
        icon: Wallpaper,
        href: "/pages/admin/blog/blog-banner",
        color: "bg-blue-50 text-blue-600",

    },
    {
        title: "Blog Management",
        description:
            "Manage blog page content.",
        icon: Newspaper,
        href: "/pages/admin/blog/blogs",
        color: "bg-yellow-50 text-yellow-600",

    },

];

export default function Page() {
    return (
        <div className="space-y-6">
            {/* ================= HEADER ================= */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Dashboard</span>
                        <span>/</span>
                        <span>CMS</span>
                        <span>/</span>
                        <span className="font-medium text-[#0A2342]">Blog Page</span>
                    </div>

                    <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                        Blog Page CMS
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage all blogpage sections from one place.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Status */}
                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                        ● Website Live
                    </span>

                    {/* Preview */}
                    <Link
                        href="/"
                        target="_blank"
                        className="rounded-xl border border-[#0A2342] px-5 py-2.5 text-sm font-semibold text-[#0A2342] transition hover:bg-[#0A2342] hover:text-white"
                    >
                        Preview Website
                    </Link>
                </div>
            </div>

            {/* ================= SECTION GRID ================= */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {HOME_SECTIONS.map((section) => {
                    const Icon = section.icon;

                    return (
                        <div
                            key={section.title}
                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-xl"
                        >
                            {/* Top */}
                            <div className="flex items-start justify-between p-6">
                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${section.color}`}
                                >
                                    <Icon size={28} />
                                </div>

                            </div>

                            {/* Content */}
                            <div className="px-6">
                                <h3 className="text-xl font-bold text-[#0A2342]">
                                    {section.title}
                                </h3>

                                <p className="mt-3 min-h-17.5 text-sm leading-6 text-gray-500">
                                    {section.description}
                                </p>
                            </div>

                            {/* Bottom */}
                            <div className="mt-6 px-6 py-5">
                                <Link
                                    href={section.href}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0A2342] px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342]"
                                >
                                    Edit Section
                                    <ArrowUpRight
                                        size={18}
                                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}