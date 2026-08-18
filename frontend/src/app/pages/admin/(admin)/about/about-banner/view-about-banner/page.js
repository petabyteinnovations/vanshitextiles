"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit3, ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { apiurl } from "@/app/common/apiurl";
import { useRouter } from "next/navigation";

export default function page() {
    let router = useRouter();

    const [banner, setBanner] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    // ==========================================================
    // FETCH ABOUT BANNER
    // ==========================================================

    const viewdata = () => {
        setLoading(true);

        try {
            apiurl
                .get("/admin/view-about-banner", {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        csrftoken: sessionStorage.getItem("csrfToken"),
                    },
                })
                .then((res) => {
                    if (res.data.Status === 1) {
                        setBanner(res.data.Data?.viewimages[0]);
                        setImageUrl(res.data.Data?.imageurl);
                    }

                    if (res.data.Redirect) {
                        router.push(res.data.Redirect);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        viewdata();
    }, []);

    // ==========================================================
    // LOADING
    // ==========================================================

    if (loading) {
        return (
            <section className="min-h-screen bg-[#F7F7F7] p-6">
                <div className="mx-auto max-w-7xl">

                    <div className="mb-8">
                        <div className="h-8 w-56 animate-pulse rounded-lg bg-gray-200" />
                        <div className="mt-3 h-4 w-80 animate-pulse rounded-lg bg-gray-200" />
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                        <div className="h-80 animate-pulse bg-gray-200" />

                        <div className="space-y-4 p-6">
                            <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
                            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                            <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
                        </div>
                    </div>

                </div>
            </section>
        );
    }

    // ==========================================================
    // NO BANNER
    // ==========================================================

    if (!banner) {
        return (
            <section className="min-h-screen bg-[#F7F7F7]">
                <div className="mx-auto max-w-7xl">

                    <div className="mb-10">

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Dashboard</span>
                            <span>/</span>
                            <span>CMS</span>
                            <span>/</span>

                            <span className="font-medium text-[#0A2342]">
                                About Banner
                            </span>
                        </div>

                        <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                            View About Banner
                        </h1>

                        <p className="mt-1 text-gray-500">
                            View and manage your about banner section.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/10">
                            <ImageIcon
                                size={28}
                                className="text-[#D4AF37]"
                            />
                        </div>

                        <h2 className="mt-5 text-lg font-semibold text-[#0A2342]">
                            No About Banner Found
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                            No about banner has been configured yet.
                        </p>

                    </div>

                </div>
            </section>
        );
    }

    // ==========================================================
    // MAIN CONTENT
    // ==========================================================

    return (
        <section className="min-h-screen bg-[#F7F7F7]">
            <div className="mx-auto max-w-7xl">

                {/* ==========================================================
                    PAGE HEADER
                ========================================================== */}

                <section className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Dashboard</span>
                            <span>/</span>
                            <span>CMS</span>
                            <span>/</span>

                            <span className="font-medium text-[#0A2342]">
                                About Banner
                            </span>
                        </div>

                        <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                            View About Banner
                        </h1>

                        <p className="mt-1 text-gray-500">
                            View and manage your about banner section.
                        </p>

                    </div>

                </section>

                {/* ==========================================================
                    BANNER CARD
                ========================================================== */}

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* ========================================================
                        IMAGE
                    ======================================================== */}

                    <div className="relative h-72 w-full overflow-hidden sm:h-96 lg:h-105">

                        {banner.About_Banner_Image ? (
                            <Image
                                src={`${imageUrl}/${banner.About_Banner_Image}`}
                                alt={
                                    banner.About_Banner_Heading ||
                                    "About Banner"
                                }
                                fill
                                unoptimized
                                sizes="100vw"
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#0A2342]/5">

                                <div className="text-center">

                                    <ImageIcon
                                        size={42}
                                        className="mx-auto text-[#D4AF37]"
                                    />

                                    <p className="mt-3 text-sm text-gray-500">
                                        No banner image
                                    </p>

                                </div>

                            </div>
                        )}

                        {/* Overlay */}

                        <div className="absolute inset-0 bg-linear-to-t from-[#081C34]/90 via-[#081C34]/30 to-transparent" />

                    </div>

                    {/* ========================================================
                        CONTENT
                    ======================================================== */}

                    <div className="p-6 sm:p-8">

                        <div className="grid gap-8 lg:grid-cols-[1fr_auto]">

                            {/* Content */}

                            <div>

                                {/* Heading */}

                                <div>

                                    <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#D4AF37]">
                                        Banner Heading
                                    </p>

                                    <h3 className="mt-2 text-xl font-semibold text-[#0A2342]">
                                        {banner.About_Banner_Heading}
                                    </h3>

                                </div>

                                {/* Description */}

                                <div className="mt-6">

                                    <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#D4AF37]">
                                        Banner Description
                                    </p>

                                    <p className="mt-2 max-w-4xl whitespace-pre-line text-sm leading-7 text-gray-600">
                                        {banner.About_Banner_Description}
                                    </p>

                                </div>

                            </div>

                            {/* ========================================================
                                UPDATE BUTTON
                            ======================================================== */}

                            <div className="flex items-start">

                                <Link
                                    href={`/pages/admin/about/about-banner/update-about-banner?_id=${banner._id}`}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342] sm:w-auto"
                                >
                                    <Edit3 size={17} />
                                    Update Banner
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}