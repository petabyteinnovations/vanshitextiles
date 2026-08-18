"use client";

import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowUpRight,
    CalendarDays,
    BookOpen,
} from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const urldata = useSearchParams();

    const [blog, setBlog] = useState(null);
    const [imgurl, setImgurl] = useState("");
    const [loading, setLoading] = useState(true);

    // Get ID from URL
    const id = urldata.get("_id");

    const viewdata = async () => {
        try {
            if (!id) {
                setBlog(null);
                setLoading(false);
                return;
            }

            const res = await apiurl.get("/web/view-blogs", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    csrftoken: sessionStorage.getItem("csrfToken"),
                },
            });

            if (res.data.Status === 1) {
                const blogs = res.data.Data?.viewimages || [];

                /*
                 * Find the blog having the SAME _id
                 * as the _id received from the URL.
                 */
                const selectedBlog = blogs.find(
                    (item) => String(item?._id) === String(id)
                );

                if (selectedBlog) {
                    setBlog(selectedBlog);
                } else {
                    setBlog(null);
                }

                setImgurl(res.data.Data?.imageurl || "");
            } else {
                setBlog(null);
                setImgurl("");
            }
        } catch (error) {
            console.log("View Blog Error:", error);
            setBlog(null);
            setImgurl("");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        viewdata();
    }, [id]);

    /* ==========================================================
                            LOADING
    ========================================================== */

    if (loading) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center bg-[#fafafa]">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#0A2342]/10 border-t-[#D4AF37]" />

                    <p className="mt-5 text-sm text-gray-500">
                        Loading article...
                    </p>
                </div>
            </section>
        );
    }

    /* ==========================================================
                        BLOG NOT FOUND
    ========================================================== */

    if (!blog) {
        return (
            <section className="flex min-h-[70vh] items-center justify-center bg-[#fafafa] px-5">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D4AF37]/10">
                        <BookOpen
                            size={28}
                            className="text-[#D4AF37]"
                        />
                    </div>

                    <h2 className="mt-6 font-serif text-3xl text-[#0A2342]">
                        Blog Not Found
                    </h2>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                        The blog you are looking for could not be found.
                    </p>

                    <Link
                        href="/pages/web/blogs"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342]"
                    >
                        <ArrowLeft size={16} />
                        Back to Blogs
                    </Link>
                </div>
            </section>
        );
    }

    /* ==========================================================
                            IMAGE URL
    ========================================================== */

    const imageUrl =
        blog?.Blog_Image && imgurl
            ? `${imgurl}/${blog.Blog_Image}`
            : null;

    /* ==========================================================
                            MAIN UI
    ========================================================== */

    return (
        <section className="relative overflow-hidden bg-[#fafafa] text-[#0A2342]">

            {/* ==========================================================
                            BACKGROUND DECORATION
            ========================================================== */}

            <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-[120px]" />

            <div className="pointer-events-none absolute right-0 top-125 h-96 w-96 rounded-full bg-[#0A2342]/5 blur-[120px]" />

            <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:py-20">

                {/* ==========================================================
                                BACK BUTTON
                ========================================================== */}

                <div className="mb-8 sm:mb-10">
                    <Link
                        href="/pages/web/blogs"
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-[#0A2342] transition-colors duration-300 hover:text-[#D4AF37]"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white transition-all duration-300 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10">
                            <ArrowLeft
                                size={16}
                                className="transition-transform duration-300 group-hover:-translate-x-1"
                            />
                        </span>

                        Back to Blogs
                    </Link>
                </div>

                {/* ==========================================================
                                HERO IMAGE
                ========================================================== */}

                {imageUrl && (
                    <div className="group relative overflow-hidden rounded-[28px] border border-gray-200 bg-gray-100 shadow-[0_20px_70px_rgba(10,35,66,0.08)] sm:rounded-[36px]">

                        <div className="relative w-full">
                            <Image
                                src={imageUrl}
                                alt={
                                    blog?.Blog_Main_Heading ||
                                    "Blog Article"
                                }
                                width={1200}
                                height={700}
                                priority
                                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1200px"
                                className="h-auto min-h-70 w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />

                            {/* Overlay */}

                            <div className="absolute inset-0 bg-linear-to-t from-[#081C34]/80 via-[#081C34]/20 to-transparent" />

                            {/* Dynamic Image Label */}

                            <div className="absolute bottom-5 left-5 sm:bottom-8 sm:left-8">
                                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0A2342]/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-white backdrop-blur-md sm:text-xs">
                                    <BookOpen size={13} />

                                    {blog?.Blog_Category ||
                                        blog?.Blog_Type ||
                                        "Blog Article"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==========================================================
                            ARTICLE HEADER
                ========================================================== */}

                <article className="mx-auto mt-10 max-w-5xl sm:mt-14">

                    {/* Dynamic Meta */}

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium uppercase tracking-[1.5px] text-gray-500">

                        <span className="inline-flex items-center gap-2 text-[#D4AF37]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />

                            {blog?.Blog_Category ||
                                blog?.Blog_Type ||
                                "Industry Insights"}
                        </span>

                        {(blog?.Blog_Date || blog?.createdAt) && (
                            <>
                                <span className="hidden h-4 w-px bg-gray-300 sm:block" />

                                <span className="inline-flex items-center gap-2">
                                    <CalendarDays size={14} />

                                    {blog?.Blog_Date ||
                                        new Date(
                                            blog.createdAt
                                        ).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                </span>
                            </>
                        )}
                    </div>

                    {/* ==========================================================
                                DYNAMIC HEADING
                    ========================================================== */}

                    <h1 className="mt-6 max-w-4xl font-serif text-3xl font-medium leading-[1.12] tracking-[-0.02em] text-[#0A2342] sm:text-4xl md:text-5xl lg:text-6xl">
                        {blog?.Blog_Main_Heading}
                    </h1>

                    {/* Gold Divider */}

                    <div className="mt-7 flex items-center gap-3">
                        <div className="h-0.5 w-16 bg-[#D4AF37]" />

                        <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />

                        <div className="h-px w-20 bg-[#0A2342]/10" />
                    </div>

                    {/* ==========================================================
                            ARTICLE CONTENT
                    ========================================================== */}

                    <div className="mt-10 grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-16">

                        {/* Side Information */}

                        <aside className="hidden lg:block">
                            <div className="sticky top-28 border-l-2 border-[#D4AF37]/30 pl-5">

                                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#D4AF37]">
                                    Article
                                </p>

                                <p className="mt-2 text-sm font-semibold text-[#0A2342]">
                                    Blog
                                </p>

                            </div>
                        </aside>

                        {/* Dynamic Content */}

                        <div className="max-w-3xl">

                            <div className="whitespace-pre-line text-lg leading-8 text-[#0A2342]/80 sm:leading-9">
                                {blog?.Blog_Description}
                            </div>

                            {/* Dynamic Quote */}

                            {blog?.Blog_Quote && (
                                <div className="relative mt-10 overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#FBF7ED] p-6 sm:p-8">

                                    <div className="absolute left-0 top-0 h-full w-1 bg-[#D4AF37]" />

                                    <p className="font-serif text-lg leading-8 text-[#0A2342]/80 sm:text-xl">
                                        {blog.Blog_Quote}
                                    </p>

                                </div>
                            )}

                        </div>
                    </div>

                </article>

                {/* ==========================================================
                                BOTTOM CTA
                ========================================================== */}

                <div className="mx-auto mt-16 max-w-5xl border-t border-gray-200 pt-8 sm:mt-20 sm:pt-10">

                    <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">

                        <div className="max-w-lg">

                            <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#D4AF37]">
                                Continue Reading
                            </span>

                            <h3 className="mt-2 font-serif text-xl text-[#0A2342] sm:text-2xl">
                                Explore More Articles
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Discover more insights and articles from our
                                blog.
                            </p>

                        </div>

                        <Link
                            href="/pages/web/blogs"
                            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342]"
                        >
                            View All Blogs

                            <ArrowUpRight
                                size={17}
                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>

                    </div>
                </div>

            </div>
        </section>
    );
}