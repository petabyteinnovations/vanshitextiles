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

    const [inputfield, setInputfield] = useState({
        _id: urldata.get("_id"),
        About_Our_Vision_Heading: "",
        About_Our_Vision_Description: "",
    });


    const getdata = async () => {
        try {
            apiurl
                .get("/admin/view-about-our-vision", {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        csrftoken: sessionStorage.getItem("csrfToken")
                    }
                })
                .then((res) => {
                    if (res.data.Status === 1) {
                        const banner = res.data.Data.viewimages[0];

                        setInputfield({
                            _id: banner?._id || "",
                            About_Our_Vision_Heading:
                                banner?.About_Our_Vision_Heading || "",
                            About_Our_Vision_Description:
                                banner?.About_Our_Vision_Description || ""
                        });
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
    // UPDATE BLOG BANNER
    // ==========================================================

    const updatedata = async (e) => {
        try {
            e.preventDefault();

            apiurl
                .put(
                    "/admin/update-about-our-vision",
                    inputfield,
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

                            <span>About Our Vision</span>

                            <span>/</span>

                            <span className="font-medium text-[#0A2342]">
                                Update About Our Vision
                            </span>

                        </div>

                        <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                            About Our Vision Management
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Manage the about page our vision from one place.
                        </p>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        <Link
                            href="/pages/admin/about/about-our-mission/view-our-mission"
                            className="rounded-xl bg-[#0A2342] px-4 py-3 font-medium text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
                        >
                            View Our Vision
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
                                    htmlFor="About_Our_Vision_Heading"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Our Vision Title
                                </label>

                                <input
                                    id="About_Our_Vision_Heading"
                                    type="text"
                                    placeholder="Enter banner heading..."
                                    className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                                    value={
                                        inputfield.About_Our_Vision_Heading
                                    }
                                    onChange={(e) =>
                                        setInputfield({
                                            ...inputfield,
                                            About_Our_Vision_Heading:
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
                                    htmlFor="About_Our_Vision_Description"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Our Vision Description
                                </label>

                                <textarea
                                    id="About_Our_Vision_Description"
                                    rows={6}
                                    placeholder="Enter banner description..."
                                    className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                                    value={
                                        inputfield.About_Our_Vision_Description
                                    }
                                    onChange={(e) =>
                                        setInputfield({
                                            ...inputfield,
                                            About_Our_Vision_Description:
                                                e.target.value
                                        })
                                    }
                                />

                            </div>

                            {/* ==================================================
                                      UPDATE BUTTON
                            ================================================== */}

                            <div className="flex justify-end pt-4">

                                <button
                                    type="submit"
                                    className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] transition hover:opacity-90"
                                >
                                    Update
                                </button>

                            </div>

                        </form>

                    </section>

                    {/* ======================================================
                                      LIVE PREVIEW
                    ====================================================== */}

                    <section className="my-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg lg:w-[50%]">
                        <div className="">

                            <div className="relative w-full overflow-hidden bg-[#ffffff]">

                                <div className=" inset-x-0 bottom-0 z-10 p-6 sm:p-8">

                                    {/* Heading */}

                                    <h3 className="text-2xl font-light leading-tight sm:text-3xl">

                                        {inputfield.About_Our_Vision_Heading ||
                                            "Stay Ahead With Textile Industry Knowledge"}

                                    </h3>

                                    {/* Description */}

                                    <p className="mt-4 text-sm leading-7 whitespace-pre-line sm:text-base">

                                        {inputfield.About_Our_Vision_Description ||
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