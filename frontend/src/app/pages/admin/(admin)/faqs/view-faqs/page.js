"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ArrowLeft, Plus, Pencil, Trash2, CircleHelp } from "lucide-react";

import { apiurl } from "@/app/common/apiurl";
import { ToastError, ToastSuccess } from "@/app/common/ToastNotifications";

import DeleteModal from "@/app/common/DeleteModel";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [faqs, setFaqs] = useState([]);

    // Delete confirmation modal
    const [modal, setmodal] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        getFaqData();
    }, []);

    const getFaqData = async () => {
        try {
            setLoading(true);

            const res = await apiurl.get("/admin/view-faqs", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    csrftoken: sessionStorage.getItem("csrfToken"),
                },
            });

            if (res.data.Status === 1) {
                setFaqs(res.data.Data.viewimages || []);
            } else {
                ToastError(res.data.Message);

                if (res.data.Redirect !== null) {
                    window.location.href = res.data.Redirect;
                }
            }
        } catch (error) {
            console.log(error);
            ToastError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    // Opens confirmation modal
    const requestDelete = (faq) => setmodal(faq);

    const closeModal = () => !deleting && setmodal(null);

    const confirmDelete = async () => {
        if (!modal) return;

        try {
            setDeleting(true);

            const res = await apiurl.delete("/admin/delete-faqs", {
                data: {
                    _id: modal._id,
                },
                headers: {
                    Authorization: localStorage.getItem("token"),
                    csrftoken: sessionStorage.getItem("csrfToken"),
                },
            });

            if (res.data.Status === 1) {
                ToastSuccess(res.data.Message);

                setFaqs((prev) =>
                    prev.filter((faq) => faq._id !== modal._id)
                );

                setmodal(null);
            } else {
                ToastError(res.data.Message);
            }
        } catch (error) {
            console.log(error);
            ToastError("Something went wrong.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">

                        <span>Dashboard</span>

                        <span>/</span>

                        <span>CMS</span>

                        <span>/</span>

                        <span>Faq's</span>

                        <span>/</span>

                        <span className="font-medium text-[#0A2342]">
                            View Faq's
                        </span>

                    </div>

                    <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                        Faq's Management
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage frequently asked questions from one place.
                    </p>

                </div>

                <div className="flex flex-wrap gap-3">

                    <Link
                        href="/pages/admin/faqs"
                        className="flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        <Plus size={18} />
                        Add Faq
                    </Link>

                </div>

            </div>

            {/* FAQ Card Grid */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {loading ? (

                    <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20">

                        <div className="text-center">

                            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />

                            <h3 className="text-lg font-semibold text-[#0A2342]">
                                Loading Faq's...
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Please wait while we fetch your FAQ's.
                            </p>

                        </div>

                    </div>

                ) : Array.isArray(faqs) && faqs.length > 0 ? (

                    faqs.map((faq, index) => (

                        <div
                            key={faq._id || index}
                            className="group relative gap-6 rounded-3xl border border-gray-100 bg-white px-7 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >

                            <section className="flex gap-4">


                                {/* FAQ Content */}

                                <div className="min-w-0  flex-1">
                                    {/* Status */}

                                    <div className="mb-5">

                                        <p className="text-xs font-semibold uppercase tracking-wide text-[#D4AF37]">
                                            Status
                                        </p>

                                        <span
                                            className={`mt-2 inline-flex rounded-full px-3 py-2 text-xs font-semibold ${faq?.Faq_Status === true ||
                                                    faq?.Faq_Status === "true"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                                }`}
                                        >
                                            {faq?.Faq_Status === true ||
                                                faq?.Faq_Status === "true"
                                                ? "Active"
                                                : "De-Active"}
                                        </span>

                                    </div>

                                    {/* Question */}

                                    <div>

                                        <p className="text-xs font-semibold uppercase tracking-wide text-[#D4AF37]">
                                            Question
                                        </p>

                                        <h2 className="mt-2 text-xl font-semibold leading-tight text-[#0A2342] transition-colors duration-300 group-hover:text-[#D4AF37]">
                                            {faq?.Faq_Question ||
                                                "Frequently Asked Question"}
                                        </h2>

                                    </div>

                                    {/* Answer */}

                                    <div className="mt-5">

                                        <p className="text-xs font-semibold uppercase tracking-wide text-[#D4AF37]">
                                            Answer
                                        </p>

                                        <p className="mt-2 text-base leading-7 text-gray-500">
                                            {faq?.Faq_Answer ||
                                                "FAQ answer description."}
                                        </p>

                                    </div>

                                    {/* Actions */}

                                    <div className="mt-6 flex shrink-0 items-center gap-3">

                                        <Link
                                            href={`/pages/admin/faqs/update-faqs?_id=${faq._id}&&Faq_Question=${encodeURIComponent(
                                                faq.Faq_Question
                                            )}&&Faq_Answer=${encodeURIComponent(
                                                faq.Faq_Answer
                                            )}&&Faq_Status=${encodeURIComponent(
                                                faq.Faq_Status
                                            )}`}
                                            className="flex items-center justify-center gap-2 rounded-xl bg-[#0A2342] px-4 py-3 font-semibold text-white transition hover:opacity-90"
                                            title="Edit Faq"
                                        >
                                            <Pencil
                                                size={17}
                                                className="me-1"
                                            />
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => requestDelete(faq)}
                                            className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                                            title="Delete Faq"
                                        >
                                            <Trash2
                                                size={17}
                                                className="me-1"
                                            />
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </section>

                        </div>

                    ))

                ) : (

                    /* Empty State */

                    <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white py-20">

                        <div className="text-center">

                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10">
                                <CircleHelp
                                    size={30}
                                    className="text-[#D4AF37]"
                                />
                            </div>

                            <h3 className="text-xl font-semibold text-[#0A2342]">
                                No Faq's Found
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Add your first frequently asked question.
                            </p>

                            <Link
                                href="/pages/admin/faqs"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
                            >
                                <Plus size={18} />
                                Add Faq
                            </Link>

                        </div>

                    </div>

                )}

            </div>

            {/* Delete Modal */}

            <DeleteModal
                open={!!modal}
                title="Delete this faq?"
                itemName={
                    modal?.Faq_Question || "Frequently Asked Question"
                }
                loading={deleting}
                onConfirm={confirmDelete}
                onClose={closeModal}
                confirmLabel="Delete Faq"
            />

        </div>
    );
}