"use client";

import React, { useState } from "react";
import { apiurl } from "@/app/common/apiurl";
import {
    ToastError,
    ToastSuccess,
} from "@/app/common/ToastNotifications";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const router = useRouter();
    const urldata = useSearchParams();

    const [inputfield, setinputfield] = useState({
        _id: urldata.get("_id"),
        Faq_Question: urldata.get("Faq_Question"),
        Faq_Answer: urldata.get("Faq_Answer"),
        Faq_Status: urldata.get("Faq_Status"),
    });

    const insertdata = async (e) => {
        try {
            e.preventDefault();

            apiurl
                .put("/admin/update-faqs", inputfield, {
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
                    }

                    if (res.data.Redirect !== null) {
                        return router.push(res.data.Redirect);
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
                                Faq's
                            </span>

                        </div>

                        <h1 className="mt-3 text-3xl font-bold text-[#0A2342]">
                            Faq's Management
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Create and manage the faq's from here.
                        </p>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        <Link
                            href={"/pages/admin/home/faqs/view-faqs"}
                            className="rounded-xl bg-[#0A2342] px-4 py-3 font-medium text-white"
                        >
                            View Faq's
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

                            {/* Faq Question */}

                            <section>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Faq Question
                                </label>

                                <textarea
                                    rows={4}
                                    placeholder="Enter the frequently asked question..."
                                    className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                                    defaultValue={inputfield.Faq_Question}
                                    onChange={(e) =>
                                        setinputfield({
                                            ...inputfield,
                                            Faq_Question: e.target.value,
                                        })
                                    }
                                />

                            </section>

                            {/* Faq Answer */}

                            <section>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Faq Answer
                                </label>

                                <textarea
                                    rows={4}
                                    placeholder="Enter the answer to this question..."
                                    className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                                    defaultValue={inputfield.Faq_Answer}
                                    onChange={(e) =>
                                        setinputfield({
                                            ...inputfield,
                                            Faq_Answer: e.target.value,
                                        })
                                    }
                                />

                            </section>

                            {/* Status */}

                            <section>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Faq Status
                                </label>

                                <select
                                    className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                                    defaultValue={inputfield.Faq_Status}
                                    onChange={(e) =>
                                        setinputfield({
                                            ...inputfield,
                                            Faq_Status: e.target.value,
                                        })
                                    }
                                >

                                    <option value="">
                                        Choose Status
                                    </option>

                                    <option value={true}>
                                        Active
                                    </option>

                                    <option value={false}>
                                        De-Active
                                    </option>

                                </select>

                            </section>

                            {/* Update Button */}

                            <section className="flex justify-end">

                                <button
                                    type="submit"
                                    className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] transition hover:opacity-90"
                                >
                                    Update Faq
                                </button>

                            </section>

                        </form>

                    </section>

                </section>

            </section>
        </>
    );
}