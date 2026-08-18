"use client";

import React, { useEffect, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { ToastError, ToastSuccess } from "@/app/common/ToastNotifications";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
    const router = useRouter();
    const urldata = useSearchParams();

    const [preview, setPreview] = useState(null);

    const [inputfield, setInputfield] = useState({
        _id: urldata.get("_id"),
        Blog_Banner_Heading: "",
        Blog_Banner_Description: "",
        Blog_Banner_Image: ""
    });

    // ==========================================================
    // UPDATE FIELD
    // ==========================================================

    // ==========================================================
    // FETCH BLOG BANNER
    // ==========================================================

    const getdata = async () => {
        try {
            apiurl
                .get("/admin/view-blogs-banner", {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        csrftoken: sessionStorage.getItem("csrfToken")
                    }
                })
                .then((res) => {
                    if (res.data.Status === 1) {
                        const banner = res.data.Data.viewimages[0];
                        const imageurl = res.data.Data.imageurl;

                        setInputfield({
                            _id: banner?._id || "",
                            Blog_Banner_Heading:
                                banner?.Blog_Banner_Heading || "",
                            Blog_Banner_Description:
                                banner?.Blog_Banner_Description || "",
                            Blog_Banner_Image:
                                banner?.Blog_Banner_Image || ""
                        });

                        if (banner?.Blog_Banner_Image) {
                            setPreview(
                                `${imageurl.replace(/\/$/, "")}/${banner.Blog_Banner_Image.replace(/^\//, "")}`
                            );
                        } else {
                            setPreview(null);
                        }
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

    // ==========================================================
    // USE EFFECT
    // ==========================================================

    useEffect(() => {
        if (urldata.get("_id")) {
            getdata();
        }
    }, []);

    // ==========================================================
    // IMAGE CHANGE
    // ==========================================================

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;
        setInputfield({
            ...inputfield,
            Blog_Banner_Image: file
        });

        setPreview(URL.createObjectURL(file));
    };

    // ==========================================================
    // REMOVE IMAGE
    // ==========================================================

    const removeImage = () => {
        setPreview(null);

        setInputfield({
            ...inputfield,
            Blog_Banner_Image: ""
        });
    };

    // ==========================================================
    // UPDATE BLOG BANNER
    // ==========================================================

    const updatedata = async (e) => {
        try {
            e.preventDefault();

            console.log(inputfield);

            const formData = new FormData();

            formData.append("_id", inputfield._id);

            formData.append(
                "Blog_Banner_Heading",
                inputfield.Blog_Banner_Heading
            );

            formData.append(
                "Blog_Banner_Description",
                inputfield.Blog_Banner_Description
            );

            if (inputfield.Blog_Banner_Image instanceof File) {
                formData.append(
                    "Blog_Banner_Image",
                    inputfield.Blog_Banner_Image
                );
            }

            apiurl
                .put(
                    "/admin/update-blogs-banner",
                    formData,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                            csrftoken: sessionStorage.getItem("csrfToken")
                        }
                    }
                )
                .then((res) => {
                    if (res.data.Status === 1) {
                        ToastSuccess(res.data.Message);
                    } else {
                        ToastError(res.data.Message);
                    }

                    if (res.data.Redirect) {
                        router.push(res.data.Redirect);
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

    return (
        <>
            <section className="w-full">

                {/* ========================================================
                                      HEADER
                ======================================================== */}

                <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">

                            <span>Dashboard</span>

                            <span>/</span>

                            <span>CMS</span>

                            <span>/</span>

                            <span>Blog Banner</span>

                            <span>/</span>

                            <span className="font-medium text-[#0A2342]">
                                Update Blog Banner
                            </span>

                        </div>

                        <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                            Blog Banner Management
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Manage the blog page banner from one place.
                        </p>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        <Link
                            href="/pages/admin/blog-banner/view-blog-banner"
                            className="rounded-xl bg-[#0A2342] px-4 py-3 font-medium text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
                        >
                            View Blog Banner
                        </Link>

                    </div>

                </section>

                {/* ========================================================
                                      MAIN LAYOUT
                ======================================================== */}

                <section className="mt-6 flex flex-col items-start justify-between gap-4 lg:flex-row">

                    {/* ======================================================
                                            FORM
                    ====================================================== */}

                    <section className="my-2 w-full rounded-[10px] bg-white p-3 shadow lg:w-[50%]">

                        <form
                            className="space-y-5"
                            onSubmit={updatedata}
                        >

                            {/* ==================================================
                                      BANNER HEADING
                            ================================================== */}

                            <div>

                                <label
                                    htmlFor="banner_heading"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Banner Heading
                                </label>

                                <input
                                    id="banner_heading"
                                    type="text"
                                    placeholder="Enter banner heading..."
                                    className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                                    value={
                                        inputfield.Blog_Banner_Heading
                                    }
                                    onChange={(e) =>
                                        setInputfield({
                                            ...inputfield,
                                            Blog_Banner_Heading:
                                                e.target.value
                                        })
                                    }
                                />

                            </div>

                            {/* ==================================================
                                  BANNER DESCRIPTION
                            ================================================== */}

                            <div>

                                <label
                                    htmlFor="banner_description"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Banner Description
                                </label>

                                <textarea
                                    id="banner_description"
                                    rows={6}
                                    placeholder="Enter banner description..."
                                    className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                                    value={
                                        inputfield.Blog_Banner_Description
                                    }
                                    onChange={(e) =>
                                        setInputfield({
                                            ...inputfield,
                                            Blog_Banner_Description:
                                                e.target.value
                                        })
                                    }
                                />

                            </div>

                            {/* ==================================================
                                      BANNER IMAGE
                            ================================================== */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Banner Image
                                </label>

                                {!preview ? (

                                    <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#FFF9EC]">

                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                            onChange={
                                                handleImageChange
                                            }
                                        />

                                        <div className="flex flex-col items-center justify-center gap-3 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left">

                                            <div className="flex items-center gap-3">

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A2342]/10">

                                                    <Upload
                                                        className="h-5 w-5 text-[#0A2342]"
                                                        strokeWidth={1.8}
                                                    />

                                                </div>

                                                <div>

                                                    <h3 className="text-sm font-semibold text-[#0A2342]">
                                                        Upload Blog Banner Image
                                                    </h3>

                                                    <p className="mt-0.5 text-xs leading-5 text-gray-500">
                                                        Drag &amp; drop, or click to browse ·{" "}
                                                        <span className="text-gray-400">
                                                            PNG/JPG/JPEG/WEBP · Max 5MB
                                                        </span>
                                                    </p>

                                                </div>

                                            </div>

                                            <button
                                                type="button"
                                                className="shrink-0 rounded-xl bg-[#0A2342] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342] sm:text-sm"
                                            >
                                                Choose Image
                                            </button>

                                        </div>

                                    </div>

                                ) : (

                                    <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3">

                                        <div className="flex items-center gap-4">

                                            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">

                                                <Image
                                                    src={preview}
                                                    alt="Blog Banner Preview"
                                                    width={200}
                                                    height={200}
                                                    unoptimized
                                                    className="block h-full w-full object-cover"
                                                />

                                            </div>

                                            <div className="min-w-0 flex-1">

                                                <p className="truncate text-sm font-medium text-[#0A2342]">
                                                    Blog Banner Image
                                                </p>

                                                <p className="text-xs text-gray-500">
                                                    Image preview
                                                </p>

                                            </div>

                                            <button
                                                type="button"
                                                aria-label="Remove image"
                                                onClick={
                                                    removeImage
                                                }
                                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-[#0A2342]"
                                            >
                                                <X size={16} />
                                            </button>

                                        </div>

                                    </div>

                                )}

                            </div>

                            {/* ==================================================
                                      UPDATE BUTTON
                            ================================================== */}

                            <div className="flex justify-end pt-4">

                                <button
                                    type="submit"
                                    className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] transition hover:opacity-90"
                                >
                                    Update Blog Banner
                                </button>

                            </div>

                        </form>

                    </section>

                    {/* ======================================================
                                      LIVE PREVIEW
                    ====================================================== */}

                    <section className="my-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg lg:w-[50%]">

                        <div className="flex flex-col justify-between gap-3 border-b border-gray-200 px-6 py-5 sm:flex-row sm:items-center">

                            <div>

                                <h2 className="text-2xl font-bold text-[#0A2342]">
                                    Live Banner Preview
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    This is how the blog banner will appear on the website.
                                </p>

                            </div>

                        </div>

                        {/* ====================================================
                                      PREVIEW
                        ==================================================== */}

                        <div className="">

                            <div className="relative w-full overflow-hidden bg-[#ffffff]">
                                {/* ==================================================
                                      GRADIENT OVERLAY
                                ================================================== */}

                                {preview ? (

                                    <Image
                                        src={preview}
                                        width={1200}
                                        height={700}
                                        alt={
                                            inputfield.Blog_Banner_Heading ||
                                            "Blog Banner"
                                        }
                                        unoptimized
                                        className=" inset-0 block h-full w-full object-cover"
                                    />

                                ) : (

                                    <div className="py-20 inset-0 flex items-center justify-center">

                                        <ImageIcon
                                            size={60}
                                            className="text-[#D4AF37]"
                                            strokeWidth={1.5}
                                        />

                                    </div>

                                )}



                                {/* ==================================================
                                      DECORATIVE GLOW
                                ================================================== */}

                                <div className="pointer-events-none absolute inset-0">

                                    <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[100px]" />

                                </div>

                                {/* ==================================================
                                      PREVIEW CONTENT
                                ================================================== */}

                                <div className=" inset-x-0 bottom-0 z-10 p-6 sm:p-8">

                                    {/* Breadcrumb */}

                                    <div className="mb-5 flex items-center gap-2 text-xs">

                                        <span>
                                            Home
                                        </span>

                                        <span>
                                            /
                                        </span>

                                        <span className="text-[#D4AF37]">
                                            Blogs
                                        </span>

                                    </div>

                                    {/* Heading */}

                                    <h3 className="text-2xl font-light leading-tight sm:text-3xl">

                                        {inputfield.Blog_Banner_Heading ||
                                            "Stay Ahead With Textile Industry Knowledge"}

                                    </h3>

                                    {/* Description */}

                                    <p className="mt-4 text-sm leading-7 whitespace-pre-line sm:text-base">

                                        {inputfield.Blog_Banner_Description ||
                                            "Discover expert insights on textile manufacturing, fabric innovation, export markets, sustainability, OEM production, and industry best practices to help your business stay competitive in the global market."}

                                    </p>

                                </div>

                            </div>

                        </div>

                    </section>

                </section>

            </section>
        </>
    );
}