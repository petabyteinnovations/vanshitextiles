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

    const [inputfield, setinputfield] = useState({
        Marquee_Text: "",
        Marquee_Status: "",
    });

    const insertdata = async (e) => {
        try {
            e.preventDefault();

            apiurl
                .post("/admin/add-home-marquee", inputfield, {
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

                        if (res.data.Redirect !== null) {
                            return router.push(res.data.Redirect);
                        }
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

                {/* Header */}

                <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Dashboard</span>
                            <span>/</span>

                            <span className="font-semibold text-[#0A2342]">
                                Home Marquee
                            </span>
                        </div>

                        <h1 className="mt-3 text-3xl font-bold text-[#0A2342]">
                            Home Marquee Management
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Create and manage the homepage marquee announcement from
                            here.
                        </p>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        <Link
                            href={"/pages/admin/home/marquee/view-marquee"}
                            className="rounded-xl bg-[#0A2342] px-4 py-3 font-medium text-white"
                        >
                            View Marquee
                        </Link>

                    </div>

                </section>

                {/* Main Layout */}

                <section className="mt-6 flex items-start justify-between gap-5">

                    {/* Form */}

                    <section className="my-2 w-[50%] rounded-[10px] bg-white p-5 shadow">

                        <form
                            className="space-y-5"
                            onSubmit={insertdata}
                        >

                            {/* Marquee Text */}

                            <section>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Marquee Text
                                </label>

                                <textarea
                                    rows={4}
                                    placeholder="Enter scrolling announcement..."
                                    className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                                    value={inputfield.Marquee_Text}
                                    onChange={(e) =>
                                        setinputfield({
                                            ...inputfield,
                                            Marquee_Text: e.target.value,
                                        })
                                    }
                                />

                            </section>


                            {/* Status */}

                            <section>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Status
                                </label>

                                <select
                                    className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                                    value={inputfield.Marquee_Status}
                                    onChange={(e) =>
                                        setinputfield({
                                            ...inputfield,
                                            Marquee_Status: e.target.value,
                                        })
                                    }
                                >
                                    <option value="">Choose Status</option>
                                    <option value={true}>Active</option>
                                    <option value={false}>De-Active</option>
                                </select>

                            </section>

                            {/* Publish Button */}

                            <section className="flex justify-end">

                                <button
                                    type="submit"
                                    className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] transition hover:opacity-90"
                                >
                                    Publish Marquee
                                </button>

                            </section>

                        </form>

                    </section>

                </section>

            </section>
        </>
    );
}