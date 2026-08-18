"use client";

import React, { useState } from "react";
import { apiurl } from "@/app/common/apiurl";
import {
    ToastError,
    ToastSuccess,
} from "@/app/common/ToastNotifications";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const router = useRouter();

    const [inputfield, setInputfield] = useState({
        About_Our_Mission_Heading: "",
        About_Our_Mission_Description: "",
    });


    const insertdata = (e) => {
        e.preventDefault();

        apiurl
            .post("/admin/add-about-our-mission", inputfield, {
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

                        <span>CMS</span>

                        <span>/</span>

                        <span className="font-medium text-[#0A2342]">
                            About Our Mission
                        </span>

                    </div>

                    <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                        About Our Mission Management
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage about our mission section from one place.
                    </p>

                </div>

                <Link
                    href="/pages/admin/about/about-our-mission/view-our-mission"
                    className="rounded-xl bg-[#0A2342] px-4 py-3 font-medium text-white"
                >
                    View Our Mission
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

                        {/* About Title */}

                        <div>

                            <label
                                htmlFor="About_Description_Heading"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Our Mission Title
                            </label>

                            <input
                                id="About_Description_Heading"
                                type="text"
                                placeholder="Enter about title..."
                                className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                onChange={(e) => setInputfield({ ...inputfield, "About_Our_Mission_Heading": e.target.value })}
                            />

                        </div>

                        {/* About Description */}

                        <div>

                            <label
                                htmlFor="About_Description"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Our Mission Description
                            </label>

                            <textarea
                                id="About_Description"
                                rows={6}
                                placeholder="Enter about description..."
                                className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                                onChange={(e) => setInputfield({ ...inputfield, "About_Our_Mission_Description": e.target.value })}
                            />

                        </div>


                        {/* Submit */}

                        <div className="flex justify-end pt-4">

                            <button
                                type="submit"
                                className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] hover:opacity-90"
                            >
                                Publish
                            </button>

                        </div>

                    </form>

                </section>

                {/* Live Preview */}

                <section className="my-2 w-[50%] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

                    <div className="">

                        <div className="overflow-hidden border border-gray-100 bg-white shadow-sm">

                            <div className="p-6">

                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                                    Our Mission
                                </p>

                                <h3 className="text-2xl font-bold leading-tight text-[#0A2342]">
                                    {inputfield?.About_Our_Mission_Heading ||
                                        "Your About Title"}
                                </h3>

                                <p className="mt-4 leading-7 text-gray-500 whitespace-pre-line">
                                    {inputfield?.About_Our_Mission_Description ||
                                        "Your about description will appear here. Add a meaningful description to preview the About content."}
                                </p>
                            </div>

                        </div>

                    </div>

                </section>

            </section>

        </section>
    );
}