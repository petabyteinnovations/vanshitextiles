"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ArrowLeft, Plus, Pencil, Trash2, Sparkles } from "lucide-react";

import { apiurl } from "@/app/common/apiurl";
import { ToastError, ToastSuccess } from "@/app/common/ToastNotifications";

import Image from "next/image";

import DeleteModal from "@/app/common/DeleteModel";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);
    const [imgurl, setimgurl] = useState("");

    // Delete confirmation modal
    const [modal, setmodal] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        getCardData();
    }, []);

    const getCardData = async () => {
        try {
            setLoading(true);

            const res = await apiurl.get("/admin/view-why-choose-card", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    csrftoken: sessionStorage.getItem("csrfToken"),
                },
            });

            if (res.data.Status === 1) {
                setCards(res.data.Data.viewimages || []);
                setimgurl(res.data.Data.imageurl || "");
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

    // Opens the confirmation modal for a specific card instead of
    // deleting immediately.
    const requestDelete = (card) => setmodal(card);
    const closeModal = () => !deleting && setmodal(null);

    const confirmDelete = async () => {
        if (!modal) return;

        try {
            setDeleting(true);

            const res = await apiurl.delete("/admin/delete-why-choose-card", {
                data: { _id: modal._id },
                headers: {
                    Authorization: localStorage.getItem("token"),
                    csrftoken: sessionStorage.getItem("csrfToken"),
                },
            });

            if (res.data.Status === 1) {
                ToastSuccess(res.data.Message);
                setCards((prev) => prev.filter((card) => card._id !== modal._id));
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
                        <span>Why Choose CMS</span>
                        <span>/</span>
                        <span className="font-medium text-[#0A2342]">Why Choose Cards</span>
                    </div>

                    <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                        Why Choose Us Card Management
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Manage why choose us cards from one place.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/pages/admin/home"
                        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium transition hover:bg-gray-100"
                    >
                        <ArrowLeft size={18} />
                        Back To CMS
                    </Link>

                    <Link
                        href="/pages/admin/home/why-choose/why-choose-card"
                        className="flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        <Plus size={18} />
                        Add Card
                    </Link>
                </div>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {loading ? (
                    <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />
                            <h3 className="text-lg font-semibold text-[#0A2342]">Loading Cards...</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Please wait while we fetch your Why Choose Us cards.
                            </p>
                        </div>
                    </div>
                ) : Array.isArray(cards) && cards.length > 0 ? (
                    cards.map((card, index) => (
                        <div
                            key={card._id || index}
                            className="group relative gap-6 rounded-3xl border border-gray-100 bg-white px-7 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <section className="flex gap-4">
                                <section>
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37] shadow-md transition-all duration-300 group-hover:scale-105">
                                        {card?.Why_Choose_Card_Image && imgurl ? (
                                            <Image
                                                src={`${imgurl}/${card.Why_Choose_Card_Image}`}
                                                width={45}
                                                height={45}
                                                alt={card?.Why_Choose_Card_Main_Heading || "Why Choose Us"}
                                                className="h-11 w-11 object-contain brightness-0 invert"
                                                unoptimized
                                            />
                                        ) : (
                                            <Sparkles size={32} className="text-white" />
                                        )}
                                    </div>

                                    <span
                                        className={`mt-3 hidden rounded-full px-3 py-2 text-xs font-semibold sm:block ${card?.Why_Choose_Card_Status
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {card?.Why_Choose_Card_Status ? "Published" : "Draft"}
                                    </span>
                                </section>

                                <div className="min-w-0">
                                    <h2 className="text-2xl font-semibold leading-tight text-[#0A2342] transition-colors duration-300 group-hover:text-[#D4AF37]">
                                        {card?.Why_Choose_Card_Main_Heading || "Why Choose Us"}
                                    </h2>

                                    <p className="mt-3 max-w-4xl text-base leading-7 text-gray-500">
                                        {card?.Why_Choose_Card_Description || "Why choose us card description."}
                                    </p>

                                    <div className="mt-6 flex shrink-0 items-center gap-3">
                                        <Link
                                            href={`/pages/admin/home/why-choose/why-choose-card/update-why-choose-card?_id=${card._id}&&Why_Choose_Card_Main_Heading=${card.Why_Choose_Card_Main_Heading}&&Why_Choose_Card_Status=${encodeURIComponent(card.Why_Choose_Card_Status)}&&Why_Choose_Card_Description=${encodeURIComponent(card.Why_Choose_Card_Description)}&&Why_Choose_Card_Status=${encodeURIComponent(card.Why_Choose_Card_Status)}&&Image=${imgurl}/${card.Why_Choose_Card_Image}`}
                                            className="flex items-center justify-center gap-2 rounded-xl bg-[#0A2342] px-4 py-3 font-semibold text-white transition hover:opacity-90"
                                            title="Edit Card"
                                        >
                                            <Pencil size={17} className="me-1" /> Edit
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() => requestDelete(card)}
                                            className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                                            title="Delete Card"
                                        >
                                            <Trash2 size={17} className="me-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white py-20">
                        <div className="text-center">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10">
                                <Plus size={28} className="text-[#D4AF37]" />
                            </div>

                            <h3 className="text-xl font-semibold text-[#0A2342]">
                                No Why Choose Cards Found
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Add your first Why Choose Us card.
                            </p>

                            <Link
                                href="/pages/admin/home/why-choose/why-choose-card"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
                            >
                                <Plus size={18} />
                                Add Card
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <DeleteModal
                open={!!modal}
                title="Delete this card?"
                itemName={modal?.Why_Choose_Card_Main_Heading || "Why Choose Card"}
                loading={deleting}
                onConfirm={confirmDelete}
                onClose={closeModal}
                confirmLabel="Delete Card"
            />
        </div>
    );
}