'use client'
import React, { useState } from "react";
import { Upload, X, Sparkles } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { toFormData } from "axios";
import { ToastError, ToastSuccess } from "@/app/common/ToastNotifications";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
    const router = useRouter();
    const urldata = useSearchParams();
    const [preview, setPreview] = useState(null);
    const [inputfield, setInputfield] = useState({
        _id: urldata.get('_id'),
        Why_Choose_Card_Main_Heading: urldata.get('Why_Choose_Card_Main_Heading'),
        Why_Choose_Card_Description: urldata.get('Why_Choose_Card_Description'),
        Why_Choose_Card_Image: urldata.get('Image'),
        Why_Choose_Card_Status: urldata.get('Why_Choose_Card_Status'),
    });

    const updateField = (key, value) =>
        setInputfield((prev) => ({ ...prev, [key]: value }));

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        updateField("Why_Choose_Card_Image", file);
        setPreview(file);
    };

    const removeImage = () => {
        setPreview(null);
        updateField("Why_Choose_Card_Image", "");
    };

    const insertdata = (e) => {
        e.preventDefault();
        apiurl
            .put("/admin/update-why-choose-card", toFormData(inputfield), {
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
                    if (res.data.Redirect) router.push(res.data.Redirect);
                }
                if (res.data.Redirect) {
                    router.push(res.data.Redirect)
                }
            })
            .catch((error) => console.log(error));
    };

    return (
        <section className="w-full">
            {/* Header */}
            <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Dashboard</span>
                        <span>/</span>
                        <span>CMS</span>
                        <span>/</span>
                        <span>Why Choose CMS</span>
                        <span>/</span>
                        <span className="font-medium text-[#0A2342]">Why Choose Card</span>
                    </div>

                    <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                        Why Choose Card Management
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage why choose card section from one place.
                    </p>
                </div>

                <Link
                    href="/pages/admin/home/why-choose/why-choose-card/view-why-choose-cards"
                    className="rounded-xl bg-[#0A2342] px-4 py-3 font-medium text-white"
                >
                    View Cards
                </Link>
            </section>

            <section className="mt-6 flex items-start justify-between gap-4">
                {/* Form */}
                <section className="w-[50%] my-2 rounded-[10px] bg-white p-3 shadow">
                    <form className="space-y-5" onSubmit={insertdata}>
                        {/* Main Heading */}
                        <div>
                            <label htmlFor="main_heading" className="mb-2 block text-sm font-medium text-gray-700">
                                Main Heading
                            </label>
                            <input
                                id="main_heading"
                                type="text"
                                placeholder="Premium Fabric Quality"
                                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                defaultValue={inputfield.Why_Choose_Card_Main_Heading}
                                onChange={(e) => updateField("Why_Choose_Card_Main_Heading", e.target.value)}
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                placeholder="Carefully sourced raw materials and premium yarns ensure exceptional quality."
                                className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                defaultValue={inputfield.Why_Choose_Card_Description}
                                onChange={(e) => updateField("Why_Choose_Card_Description", e.target.value)}
                            />
                        </div>

                        {/* Card Icon Upload */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Card Icon Image
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
                                                <Upload className="h-5 w-5 text-[#0A2342]" strokeWidth={1.8} />
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-semibold text-[#0A2342]">Upload Card Icon</h3>
                                                <p className="mt-0.5 text-xs leading-5 text-gray-500">
                                                    Drag & drop, or click to browse ·{" "}
                                                    <span className="text-gray-400">
                                                        120×120px · PNG/SVG with transparent background recommended · Max 5MB
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
                                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={URL.createObjectURL(preview)}
                                            alt="Icon preview"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-[#0A2342]">{preview.name}</p>
                                        <p className="text-xs text-gray-500">{preview.size} bytes</p>
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
                            <label htmlFor="status" className="mb-2 block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                id="status"
                                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                defaultValue={inputfield.Why_Choose_Card_Status}
                                onChange={(e) => updateField("Why_Choose_Card_Status", e.target.value)}
                            >
                                <option>Choose Status</option>
                                <option value="true">Active</option>
                                <option value="false">De-Active</option>
                            </select>
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] hover:opacity-90"
                            >
                                Publish Card
                            </button>
                        </div>
                    </form>
                </section>

                {/* Live Preview — matches the actual "Why Choose Us" card layout */}
                <section className="w-[50%] my-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
                        <div>
                            <h2 className="text-2xl font-bold text-[#0A2342]">Live Card Preview</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                This is exactly how the card will appear on the homepage.
                            </p>
                        </div>

                        <span className="rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
                            Published
                        </span>
                    </div>

                    <div className="p-8">
                        <div className="group flex gap-5">
                            {/* Icon — always rendered in the theme's gold color,
                  regardless of the uploaded image's original colors.
                  We use the image as a CSS mask (not an <img>), so only
                  its shape/transparency matters — the fill color comes
                  from the span's background-color instead. */}
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 transition-all duration-300 group-hover:bg-[#D4AF37]">
                                {preview ? (
                                    <span
                                        className="h-7 w-7 bg-[#D4AF37] transition-colors duration-300 group-hover:bg-[#0A2342]"
                                        style={{
                                            WebkitMaskImage: `url(${URL.createObjectURL(preview)})`,
                                            maskImage: `url(${URL.createObjectURL(preview)})`,
                                            WebkitMaskSize: "contain",
                                            maskSize: "contain",
                                            WebkitMaskRepeat: "no-repeat",
                                            maskRepeat: "no-repeat",
                                            WebkitMaskPosition: "center",
                                            maskPosition: "center",
                                        }}
                                    />
                                ) : (
                                    <Image
                                        src={urldata.get('Image')}
                                        width={30}
                                        height={30}
                                        alt="Icon Image"

                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="mb-3 text-2xl font-semibold text-[#0A2342] transition-colors duration-300 group-hover:text-[#D4AF37]">
                                    {inputfield.Why_Choose_Card_Main_Heading || "Premium Fabric Quality"}
                                </h3>

                                <p className="max-w-xl leading-8 text-slate-600">
                                    {inputfield.Why_Choose_Card_Description ||
                                        "Carefully sourced raw materials and premium yarns ensure exceptional quality for every fabric collection."}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    );
}