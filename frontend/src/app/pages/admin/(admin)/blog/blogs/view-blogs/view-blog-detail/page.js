"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

import { apiurl } from "@/app/common/apiurl";
import { ToastError } from "@/app/common/ToastNotifications";
import Image from "next/image";

export default function Page() {
    const urldata = useSearchParams();

    const [blog, setBlog] = useState({});
    const [imgurl, setimgurl] = useState('');

    const getdata = async () => {

        try {
            let data = {
                _id: urldata.get("_id"),
            }
            apiurl
                .post("/admin/view-blog-detail", data, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        csrftoken: sessionStorage.getItem("csrfToken"),
                    },
                })
                .then((res) => {
                    if (res.data.Status === 1) {
                        setBlog(res.data.Data?.viewimages);
                        setimgurl(res.data.Data?.imageurl)
                    } else {
                        ToastError(res.data.Message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    ToastError("Something went wrong");
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    return (
        <section className="w-full">

            {/* ================= HEADER ================= */}

            <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">

                        <span>Dashboard</span>

                        <span>/</span>

                        <span>CMS</span>

                        <span>/</span>

                        <span>Blog</span>

                        <span>/</span>

                        <span>View Blogs</span>

                        <span>/</span>

                        <span className="font-medium text-[#0A2342]">
                            Blog Detail
                        </span>

                    </div>

                    <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                        Blog Detail
                    </h1>

                    <p className="mt-1 text-gray-500">
                        View complete blog details from here.
                    </p>

                </div>

                <Link
                    href="/pages/admin/blog/view-blogs"
                    className="flex items-center gap-2 rounded-xl bg-[#0A2342] px-5 py-3 font-medium text-white"
                >
                    <ArrowLeft size={18} />
                    View Blogs
                </Link>

            </section>

            {/* ================= BLOG DETAIL ================= */}

            <section className="mt-6 w-full">

                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

                    {/* ================= IMAGE ================= */}

                    <div className="relative  w-full overflow-hidden bg-gray-100">

                        {blog.Blog_Image ? (

                            <Image
                                src={`${imgurl}/${blog?.Blog_Image}`}
                                alt={blog?.Blog_Main_Heading || "Blog Image"}
                                width={500}
                                height={500}
                                className="h-full w-full object-fit"
                            />

                        ) : (

                            <div className="flex h-full w-full items-center justify-center">

                                <FileText
                                    size={70}
                                    className="text-[#D4AF37]"
                                    strokeWidth={1.5}
                                />

                            </div>

                        )}

                    </div>

                    {/* ================= CONTENT ================= */}

                    <div className="p-6 md:p-8">

                        {/* Top */}

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <span className="w-fit rounded-full bg-[#D4AF37]/10 px-4 py-2 text-sm font-semibold text-[#D4AF37]">
                                Blog
                            </span>

                            <span
                                className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${blog?.Blog_Status === true ||
                                    blog?.Blog_Status === "true"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {blog?.Blog_Status === true ||
                                    blog?.Blog_Status === "true"
                                    ? "Active"
                                    : "De-Active"}
                            </span>

                        </div>

                        {/* Heading */}

                        <h2 className="mt-6 text-3xl font-bold leading-tight text-[#0A2342] md:text-4xl">

                            {blog?.Blog_Main_Heading ||
                                "Blog Main Heading"}

                        </h2>

                        {/* Description */}

                        <div className="mt-6 border-t border-gray-100 pt-6">

                            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#D4AF37]">
                                Description
                            </h3>

                            <p className="mt-3 whitespace-pre-line text-base leading-8 text-gray-600">

                                {blog?.Blog_Description ||
                                    "Blog description will appear here."}

                            </p>

                        </div>

                        {/* ================= INFORMATION ================= */}

                        <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-100 pt-6 md:grid-cols-2">

                            {/* Blog ID */}

                            <div className="rounded-xl bg-gray-50 p-4">

                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Blog ID
                                </p>

                                <p className="mt-2 break-all text-sm font-medium text-[#0A2342]">
                                    {blog?._id || "-"}
                                </p>

                            </div>

                            {/* Status */}

                            <div className="rounded-xl bg-gray-50 p-4">

                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                    Status
                                </p>

                                <p className="mt-2 text-sm font-medium text-[#0A2342]">

                                    {blog?.Blog_Status === true ||
                                        blog?.Blog_Status === "true"
                                        ? "Active"
                                        : "De-Active"}

                                </p>

                            </div>

                        </div>

                    </div>

                </section>

            </section>

        </section>
    );
}