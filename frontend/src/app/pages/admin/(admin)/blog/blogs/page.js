"use client";

import React, { useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { toFormData } from "axios";
import {
    ToastError,
    ToastSuccess,
} from "@/app/common/ToastNotifications";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const router = useRouter();

    const [preview, setPreview] = useState(null);

    const [inputfield, setInputfield] = useState({
        Blog_Main_Heading: "",
        Blog_Description: "",
        Blog_Image: "",
        Blog_Status: "",
    });

    const updateField = (key, value) =>
        setInputfield((prev) => ({
            ...prev,
            [key]: value,
        }));

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        updateField("Blog_Image", file);
        setPreview(file);
    };

    const removeImage = () => {
        setPreview(null);
        updateField("Blog_Image", "");
    };

    const insertdata = (e) => {
        e.preventDefault();

        apiurl
            .post("/admin/add-blogs", toFormData(inputfield), {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    csrftoken: sessionStorage.getItem("csrfToken"),
                },
            })
            .then((res) => {
                if (res.data.Status === 1) {
                    ToastSuccess(res.data.Message);
                } else {
                    ToastError(res.data.Message);

                    if (res.data.Redirect) {
                        router.push(res.data.Redirect);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                ToastError("Something went wrong");
            });
    };

    return (
        <section className="w-full">

            {/* Header */}

            <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">

                        <span>Dashboard</span>

                        <span>/</span>

                        <span className="font-medium text-[#0A2342]">
                            Blog
                        </span>

                    </div>

                    <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                        Blog Management
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage blog section from one place.
                    </p>

                </div>

                <Link
                    href="/pages/admin/blog/blogs/view-blogs"
                    className="rounded-xl bg-[#0A2342] px-4 py-3 font-medium text-white"
                >
                    View Blogs
                </Link>

            </section>

            {/* Main Layout */}

            <section className="mt-6 flex items-start justify-between gap-4">

                {/* Form */}

                <section className="my-2 w-[50%] rounded-[10px] bg-white p-3 shadow">

                    <form
                        className="space-y-5"
                        onSubmit={insertdata}
                    >

                        {/* Blog Title */}

                        <div>

                            <label
                                htmlFor="Blog_Main_Heading"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Blog Title
                            </label>

                            <input
                                id="Blog_Main_Heading"
                                type="text"
                                placeholder="Enter blog title..."
                                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                onChange={(e) =>
                                    updateField(
                                        "Blog_Main_Heading",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        {/* Blog Description */}

                        <div>

                            <label
                                htmlFor="blog_description"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Blog Description
                            </label>

                            <textarea
                                id="blog_description"
                                rows={6}
                                placeholder="Enter blog description..."
                                className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                onChange={(e) =>
                                    updateField(
                                        "Blog_Description",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        {/* Blog Image Upload */}

                        <div>

                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Blog Image
                            </label>

                            {!preview ? (

                                <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#FFF9EC]">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                        onChange={handleImageChange}
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
                                                    Upload Blog Image
                                                </h3>

                                                <p className="mt-0.5 text-xs leading-5 text-gray-500">

                                                    Drag & drop, or click to browse ·{" "}

                                                    <span className="text-gray-400">
                                                        1200×800px · JPG/PNG/WEBP · Max 5MB
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

                                <div className="mt-3 flex items-center gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3">

                                    <div className="relative flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">

                                        <img
                                            src={URL.createObjectURL(preview)}
                                            alt="Blog preview"
                                            className="h-full w-full object-cover"
                                        />

                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <p className="truncate text-sm font-medium text-[#0A2342]">
                                            {preview.name}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {preview.size} bytes
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        aria-label="Remove image"
                                        onClick={removeImage}
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-[#0A2342]"
                                    >
                                        <X size={16} />
                                    </button>

                                </div>

                            )}

                        </div>

                        {/* Status */}

                        <div>

                            <label
                                htmlFor="status"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>

                            <select
                                id="status"
                                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                onChange={(e) =>
                                    updateField(
                                        "Blog_Status",
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Choose Status
                                </option>

                                <option value="true">
                                    Active
                                </option>

                                <option value="false">
                                    De-Active
                                </option>

                            </select>

                        </div>

                        {/* Submit */}

                        <div className="flex justify-end pt-4">

                            <button
                                type="submit"
                                className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] hover:opacity-90"
                            >
                                Publish Blog
                            </button>

                        </div>

                    </form>

                </section>

                {/* Live Preview */}

                <section className="my-2 w-[50%] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

                    {/* Preview Header */}

                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                        <div>

                            <h2 className="text-2xl font-bold text-[#0A2342]">
                                Live Blog Preview
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                This is how the blog will appear on the website.
                            </p>

                        </div>

                        <span
                            className={`rounded-full px-5 py-2 text-sm font-semibold ${inputfield.Blog_Status === "false"
                                ? "bg-gray-100 text-gray-600"
                                : "bg-green-100 text-green-700"
                                }`}
                        >
                            {inputfield.Blog_Status === "false"
                                ? "De-Active"
                                : "Active"}
                        </span>

                    </div>

                    {/* Preview Content */}

                    <div className="">

                        <div className="overflow-hidden border border-gray-100 bg-white shadow-sm">

                            {/* Blog Image */}

                            <div className="relative h-64 w-full overflow-hidden bg-gray-100">

                                {preview ? (

                                    <img
                                        src={URL.createObjectURL(preview)}
                                        alt="Blog preview"
                                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                    />

                                ) : (

                                    <div className="flex h-full w-full items-center justify-center">

                                        <FileText
                                            size={55}
                                            className="text-[#D4AF37]"
                                            strokeWidth={1.5}
                                        />

                                    </div>

                                )}

                            </div>

                            {/* Blog Content */}

                            <div className="p-6">

                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                                    Blog
                                </p>

                                <h3 className="text-2xl font-bold leading-tight text-[#0A2342]">
                                    {inputfield.Blog_Title ||
                                        "Your Blog Title"}
                                </h3>

                                <p className="mt-4 leading-7 text-gray-500">
                                    {inputfield.Blog_Description ||
                                        "Your blog description will appear here. Add a meaningful description to preview the blog content."}
                                </p>
                            </div>

                        </div>

                    </div>

                </section>

            </section>

        </section>
    );
}