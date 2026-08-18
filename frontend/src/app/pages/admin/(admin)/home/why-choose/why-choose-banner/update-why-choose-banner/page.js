'use client'
import React, { useState } from "react";
import { Upload, X, Monitor } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { toFormData } from "axios";
import { ToastError, ToastSuccess } from "@/app/common/ToastNotifications";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function page() {
    let router = useRouter();
    let urlvalues = useSearchParams();
    let [preview, setpreview] = useState(null)

    let [inputfield, setinputfield] = useState({
        _id: urlvalues.get('_id'),
        Why_Banner_Tag: urlvalues.get('Why_Banner_Tag'),
        Why_Banner_Main_Heading: urlvalues.get('Why_Banner_Main_Heading'),
        Why_Banner_Primary_Btn_Text: urlvalues.get('Why_Banner_Primary_Btn_Text'),
        Why_Banner_Primary_Btn_Link: urlvalues.get('Why_Banner_Primary_Btn_Link'),
        Why_Banner_Image: urlvalues.get('Why_Banner_Image'),
    })


    let insertdata = (e) => {
        try {
            e.preventDefault();
            apiurl.put("/admin/update-why-choose-banner", toFormData(inputfield), {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    csrftoken: sessionStorage.getItem("csrfToken")
                }
            })
                .then((res) => {
                    if (res.data.Status === 1) {
                        ToastSuccess(res.data.Message)
                        if (res.data.Redirect !== null) {
                            router.push(res.data.Redirect)
                        }
                    }
                    else {
                        ToastError(res.data.Message)
                        if (res.data.Redirect !== null) return router.push(res.data.Redirect);
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <section className="w-full">
                <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Dashboard</span>


                            <span>/</span>

                            <span className="font-semibold text-[#0A2342]">
                                Hero Banner
                            </span>
                        </div>

                        <h1 className="mt-3 text-3xl font-bold text-[#0A2342]">
                            Hero Banner Management
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Add and manage the homepage hero banner from here.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link href={"/pages/admin/home/hero/view-hero-banner"} className="bg-[#0A2342] p-3 px-4 rounded-xl text-white font-medium">
                            View Banner
                        </Link>
                    </div>
                </section>

                <section className="w-full mt-6 flex items-start justify-between gap-4">
                    <section className="w-[50%] my-2 p-3 bg-white shadow rounded-[10px]">
                        <form className="space-y-5" onSubmit={insertdata}>
                            {/* Banner Tag */}
                            <section>
                                <label htmlFor="Why_banner_tag" className="mb-2 block text-sm font-medium text-gray-700">
                                    Banner Tag
                                </label>
                                <input
                                    id="Why_banner_tag"
                                    type="text"
                                    defaultValue={urlvalues.get('Why_Banner_Tag')}
                                    placeholder="MANUFACTURING EXCELLENCE"
                                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                    onChange={(e) => setinputfield({ ...inputfield, Why_Banner_Tag: e.target.value })}
                                />
                            </section>

                            {/* Main Heading */}
                            <section>
                                <label htmlFor="main_heading" className="mb-2 block text-sm font-medium text-gray-700">
                                    Main Heading
                                </label>
                                <input
                                    id="main_heading"
                                    type="text"
                                    defaultValue={urlvalues.get('Why_Banner_Main_Heading')}
                                    placeholder="Trusted Wholesale Partner"
                                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                    onChange={(e) => setinputfield({ ...inputfield, Why_Banner_Main_Heading: e.target.value })}
                                />
                            </section>


                            {/* Primary Button */}
                            <section className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="Why_banner_primary_btn_text" className="mb-2 block text-sm font-medium text-gray-700">
                                        Primary Button Text
                                    </label>
                                    <input
                                        id="Why_banner_primary_btn_text"
                                        type="text"
                                        defaultValue={urlvalues.get('Why_Banner_Primary_Btn_Text')}
                                        placeholder="Explore Collection"
                                        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                        onChange={(e) => setinputfield({ ...inputfield, Why_Banner_Primary_Btn_Text: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="Why_banner_primary_btn_link" className="mb-2 block text-sm font-medium text-gray-700">
                                        Primary Button Link
                                    </label>
                                    <input
                                        id="Why_banner_primary_btn_link"
                                        type="text"
                                        defaultValue={urlvalues.get('Why_Banner_Primary_Btn_Link')}
                                        placeholder="https://vanshitextiles.com/products"
                                        className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                        onChange={(e) => setinputfield({ ...inputfield, Why_Banner_Primary_Btn_Link: e.target.value })}
                                    />
                                </div>
                            </section>


                            {/* Banner Image — upload dropzone */}
                            <section>
                                <label htmlFor="Why_banner_image" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Banner Image
                                </label>

                                {
                                    !inputfield.Why_Banner_Image ?
                                        <div className="relative  overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#FFF9EC]">
                                            <input
                                                id="Why_banner_image"
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                                defaultValue={inputfield.Why_Banner_Image}
                                                onChange={(e) => setinputfield({ ...inputfield, Why_Banner_Image: e.target.files[0] }, setpreview(e.target.files[0]))}
                                            />

                                            <div className="flex flex-col items-center justify-center gap-3 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A2342]/10">
                                                        <Upload className="h-5 w-5 text-[#0A2342]" strokeWidth={1.8} />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-sm font-semibold text-[#0A2342]">
                                                            Upload Hero Banner
                                                        </h3>
                                                        <p className="mt-0.5 text-xs leading-5 text-gray-500">
                                                            Drag & drop, or click to browse ·{" "}
                                                            <span className="text-gray-400">
                                                                1920×900px · JPG, PNG, WEBP · Max 5MB
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
                                        </div> :
                                        <div className="mt-3 flex items-center gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3">
                                            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                <img
                                                    src={preview === null ? inputfield.Why_Banner_Image : URL.createObjectURL(preview)}
                                                    alt="Banner preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-[#0A2342]">
                                                    {preview === null ? "Banner.jpg" : preview.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {preview === null ? "Banner.jpg" : preview.size}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-[#0A2342]"
                                                aria-label="Remove image"
                                                onClick={() => { setpreview(null), setinputfield({ ...inputfield, Why_Banner_Image: "" }) }}
                                            >
                                                <X size={16} />
                                            </button>

                                            <input type="file" accept="image/*" className="hidden" />
                                        </div>
                                }

                                {/* Selected-file row (shown once an image is picked) */}

                            </section>


                            {/* Submit Buttons */}
                            <section className="flex justify-end gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] hover:opacity-90"
                                >
                                    Update Banner
                                </button>
                            </section>
                        </form>
                    </section>
                    {/* Live Preview */}

                    <section className="w-[50%] my-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

                        {/* Preview Header */}

                        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

                            <div>

                                <h2 className="text-2xl font-bold text-[#0A2342]">
                                    Live Banner Preview
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    This is exactly how the hero banner will appear.
                                </p>

                            </div>

                            <span
                                className={`rounded-full px-5 py-2 text-sm font-semibold ${inputfield.Banner_Status === true ||
                                    inputfield.Banner_Status === "true"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {inputfield.Banner_Status === true ||
                                    inputfield.Banner_Status === "true"
                                    ? "Published"
                                    : "Inactive"}
                            </span>

                        </div>


                        {/* Preview Area */}

                        <div>

                            <div className="overflow-hidden rounded-b-2xl bg-white shadow-xl">

                                {/* Fake Browser Chrome */}

                                <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-5 py-3">

                                    <span className="h-3 w-3 rounded-full bg-red-400" />

                                    <span className="h-3 w-3 rounded-full bg-yellow-400" />

                                    <span className="h-3 w-3 rounded-full bg-green-400" />

                                    <div className="ml-4 flex items-center gap-2 rounded-md bg-white px-4 py-1.5 text-xs text-gray-400 shadow-sm">

                                        <Monitor size={13} />

                                        vanshitextiles.com

                                    </div>

                                </div>


                                {/* Hero Banner */}

                                <section
                                    className="relative h-175 w-full bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            `url(${preview === null ? urlvalues.get('Why_Banner_Image') : URL.createObjectURL(preview)
                                            })`,
                                    }}
                                >

                                    {/* Overlay */}

                                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30" />


                                    {/* Banner Content */}

                                    <div className="relative z-10 flex h-full max-w-3xl flex-col justify-end px-10 pb-16 text-white lg:px-16">

                                        {/* Banner Tag */}

                                        <p className="text-sm font-semibold uppercase tracking-[8px] text-[#D4AF37]">

                                            {inputfield.Banner_Tag ||
                                                "MANUFACTURING EXCELLENCE"}

                                        </p>


                                        {/* Main Heading */}

                                        <h1 className="mt-6 text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">

                                            {inputfield.Banner_Main_Heading ||
                                                "Trusted Wholesale Partner"}

                                        </h1>


                                        {/* Description */}

                                        <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base">

                                            {inputfield.Banner_Description ||
                                                "Delivering superior textile products with modern manufacturing and exceptional quality."}

                                        </p>


                                        {/* Buttons */}

                                        <div className="mt-8 flex flex-wrap gap-4">

                                            <span className="rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-semibold text-[#0A2342] shadow-lg">

                                                {inputfield.Banner_Primary_Btn_Text ||
                                                    "Explore Collection"}

                                            </span>


                                            <span className="rounded-full border border-white px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm">

                                                {inputfield.Banner_Secondary_Btn_Text ||
                                                    "Contact Us"}

                                            </span>

                                        </div>

                                    </div>

                                </section>

                            </div>

                        </div>

                    </section>
                </section>
            </section>
        </>
    )
}
