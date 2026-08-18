"use client";

import React, { useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import {
    ToastError,
    ToastSuccess,
} from "@/app/common/ToastNotifications";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


export default function Page() {

    const router = useRouter();


    /* ==========================================================
                          STATES
    ========================================================== */


    const [preview, setPreview] = useState(null);


    const [inputfield, setInputfield] = useState({

        Counter_Title: "",
        Counter_Value: "",
        Counter_Icon: "",

    });



    /* ==========================================================
                      UPDATE INPUT FIELD
    ========================================================== */


    const updateField = (key, value) =>
        setInputfield((prev) => ({
            ...prev,
            [key]: value,
        }));





    /* ==========================================================
                      IMAGE CHANGE
    ========================================================== */


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        updateField(
            "Counter_Icon",
            file
        );
        setPreview(file);
    };





    /* ==========================================================
                      REMOVE IMAGE
    ========================================================== */


    const removeImage = () => {
        setPreview(null);
        updateField(
            "Counter_Icon",
            ""
        );
    };


    /* ==========================================================
                      SUBMIT DATA
    ========================================================== */


    const insertdata = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(inputfield).forEach((key) => {
            formData.append(
                key,
                inputfield[key]
            );
        });
        apiurl
            .post(
                "/admin/add-counter",
                formData,
                {
                    headers: {
                        Authorization:
                            localStorage.getItem("token"),
                        csrftoken:
                            sessionStorage.getItem("csrfToken"),
                    },
                }
            )

            .then((res) => {


                if (res.data.Status === 1) {

                    ToastSuccess(
                        res.data.Message
                    );


                } else {


                    ToastError(
                        res.data.Message
                    );


                    if (res.data.Redirect) {

                        router.push(
                            res.data.Redirect
                        );

                    }

                }


            })

            .catch((error) => {

                console.log(error);

                ToastError(
                    "Something went wrong"
                );

            });


    };





    return (

        <section className="w-full">


            {/* ==========================================================
                              HEADER
      ========================================================== */}


            <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">


                <div>


                    <div className="flex items-center gap-2 text-sm text-gray-500">

                        <span>
                            Dashboard
                        </span>


                        <span>
                            /
                        </span>


                        <span>
                            CMS
                        </span>


                        <span>
                            /
                        </span>


                        <span className="font-medium text-[#0A2342]">

                            Counter

                        </span>


                    </div>



                    <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">

                        Counter Management

                    </h1>



                    <p className="mt-1 text-gray-500">

                        Manage counter section from one place.

                    </p>


                </div>




                <Link

                    href="/pages/admin/about/about-counter/view-about-counter"

                    className="rounded-xl bg-[#0A2342] px-4 py-3 font-medium text-white"

                >

                    View Counters

                </Link>



            </section>





            {/* ==========================================================
                            MAIN LAYOUT
      ========================================================== */}


            <section className="mt-6 flex items-start justify-between gap-4">


                {/* ======================================================
                              FORM
        ====================================================== */}


                <section className="my-2 w-[50%] rounded-[10px] bg-white p-3 shadow">


                    <form
                        className="space-y-5"
                       onSubmit={insertdata}
                   >
                        {/* Counter Title */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Counter Title
                            </label>

                            <input
                                type="text"
                                placeholder="Enter counter title..."
                                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                value={inputfield.Counter_Title}
                                onChange={(e) =>
                                    updateField(
                                        "Counter_Title",
                                        e.target.value
                                    )
                                }
                            />
                        </div>



                        {/* Counter Value */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Counter Value
                            </label>

                            <input
                                type="text"
                                placeholder="Enter counter value..."
                                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                value={inputfield.Counter_Value}
                                onChange={(e) =>
                                    updateField(
                                        "Counter_Value",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        {/* ======================================================
                        COUNTER ICON UPLOAD
            ====================================================== */}


                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Counter Icon
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

                                                    Upload Counter Icon

                                                </h3>



                                                <p className="mt-0.5 text-xs leading-5 text-gray-500">

                                                    Drag & drop, or click to browse ·{" "}

                                                    <span className="text-gray-400">

                                                        JPG/PNG/WEBP · Max 5MB

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


                                    {/* Preview Image */}


                                    <div className="relative flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">


                                        <img

                                            src={URL.createObjectURL(preview)}

                                            alt="Counter preview"

                                            className="h-full w-full object-contain"

                                        />


                                    </div>

                                    {/* File Details */}
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-[#0A2342]">
                                            {preview.name}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {(preview.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>

                                    {/* Remove Button */}

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

                        {/* ======================================================
                            SUBMIT BUTTON
            ====================================================== */}



                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] transition hover:opacity-90"
                            >
                                Publish Counter
                            </button>
                        </div>
                    </form>
                </section>

                {/* ======================================================
                        LIVE PREVIEW
        ====================================================== */}


                <section className="my-2 w-[50%] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
                    {/* Preview Header */}
                    <div className="border-b border-gray-200 px-6 py-5">
                        <h2 className="text-2xl font-bold text-[#0A2342]">

                            Live Counter Preview

                        </h2>
                        <p className="mt-1 text-sm text-gray-500">

                            This is how the counter section will appear on the website.

                        </p>
                    </div>





                    {/* Preview Body */}
                    <div className="bg-[#FAF9F5] p-6">
                        {/* Counter Card */}
                        <div className="rounded-[28px] bg-[#0A2342] p-8 shadow-xl">
                            {/* Top Area */}


                            <div className="flex items-start justify-between gap-5">
                                <div>


                                    <p className="text-xs font-semibold uppercase tracking-[3px] text-[#D4AF37]">
                                        Counter
                                    </p>

                                    <h3 className="mt-3 text-2xl font-bold text-white">
                                        {inputfield.Counter_Title ||

                                           "Your Counter Title"}
                                    </h3>
                                </div>




                                {/* Icon Preview */}


                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/20">
                                    {preview ? (
                                        <Image
                                            src={URL.createObjectURL(preview)}
                                            alt="Counter Icon"
                                            width={100}
                                            height={100}
                                            className="h-10 w-10 object-contain"
                                            style={{
                                                filter:
                                                    "brightness(0) saturate(100%) invert(76%) sepia(55%) saturate(700%) hue-rotate(5deg) brightness(95%) contrast(90%)",
                                            }}
                                        />
                                    ) : (
                                        <FileText
                                            size={35}
                                            className="text-[#D4AF37]"
                                            strokeWidth={1.5}
                                        />
                                    )}
                                </div>
                            </div>


                            {/* Counter Value */}
                            <div className="mt-10">
                                <h4 className="text-5xl font-bold text-[#D4AF37]">
                                    {inputfield.Counter_Value || "250+"}
                                </h4>

                                <p className="mt-2 text-sm text-white/70">
                                    Achievement Counter
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="mt-8 h-px bg-white/20" />

                            {/* Bottom Info */}
                            <div className="mt-5 flex items-center justify-between">
                                <span className="text-sm text-white/70">

                                    Vanshi Tex Excellence

                                </span>
                                <span className="rounded-full bg-[#D4AF37] px-4 py-1 text-xs font-semibold text-[#0A2342]">
                                    Premium
                                </span>
                            </div>
                        </div>
                    </div>
               </section>
            </section>
        </section>
    );
}