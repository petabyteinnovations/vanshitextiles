"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Plus, Search, Pencil, Trash2, ExternalLink } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { ToastError, ToastSuccess } from "@/app/common/ToastNotifications";
import DeleteModal from "@/app/common/DeleteModel";

export default function Page() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [marquees, setMarquees] = useState([]);
    const [modal, setModal] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        getMarqueeData();
    }, []);

    const getMarqueeData = async () => {
        try {
            setLoading(true);
            const res = await apiurl.get("/admin/view-home-marquee", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    csrftoken: sessionStorage.getItem("csrfToken"),
                },
            });

            if (res.data.Status === 1) {
                setMarquees(res.data.Data.viewmarquees || []);
            } else {
                ToastError(res.data.Message);
                if (res.data.Redirect !== null) window.location.href = res.data.Redirect;
            }
        } catch (error) {
            console.log(error);
            ToastError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const requestDelete = (marquee) => setModal(marquee);
    const closeModal = () => !deleting && setModal(null);

    const confirmDelete = async () => {
        if (!modal) return;
        try {
            setDeleting(true);
            const res = await apiurl.delete("/admin/delete-home-marquee", {
                data: { _id: modal._id },
                headers: {
                    Authorization: localStorage.getItem("token"),
                    csrftoken: sessionStorage.getItem("csrfToken"),
                },
            });

            if (res.data.Status === 1) {
                ToastSuccess(res.data.Message);
                setMarquees((prev) => prev.filter((item) => item._id !== modal._id));
                setModal(null);
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

    const filteredMarquee = marquees.filter((item) =>
        item.Marquee_Text?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Dashboard</span>
                        <span>/</span>
                        <span>Home CMS</span>
                        <span>/</span>
                        <span className="font-semibold text-[#0A2342]">Homepage Marquee</span>
                    </div>

                    <h1 className="mt-3 text-3xl font-bold text-[#0A2342]">
                        Homepage Marquee Management
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage homepage scrolling announcements from one place.
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
                        href="/pages/admin/home/marquee"
                        className="flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        <Plus size={18} />
                        Add Marquee
                    </Link>
                </div>
            </div>

            {/* Search */}
            <div className="relative rounded-2xl bg-white">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search Marquee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-[#D4AF37]"
                />
            </div>

            {/* Marquee Grid — 2 cards per row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {loading ? (
                    <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />
                            <h3 className="text-lg font-semibold text-[#0A2342]">Loading Marquee...</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Please wait while we fetch your homepage marquee.
                            </p>
                        </div>
                    </div>
                ) : filteredMarquee.length === 0 ? (
                    <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white py-20">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-[#0A2342]">No Marquee Found</h2>
                            <p className="mt-2 text-gray-500">No homepage marquee has been added yet.</p>
                            <Link
                                href="/pages/admin/home/marquee"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white"
                            >
                                <Plus size={18} />
                                Add Marquee
                            </Link>
                        </div>
                    </div>
                ) : (
                    filteredMarquee.map((marquee) => (
                        <div
                            key={marquee._id}
                            className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {/* Card Header */}
                            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-5">
                                <div>
                                    <h2 className="text-xl font-bold text-[#0A2342]">Homepage Marquee</h2>
                                    <p className="mt-1 text-sm text-gray-500">Scrolling announcement</p>
                                </div>

                                <span
                                    className={`rounded-full px-4 py-2 text-sm font-semibold ${marquee.Marquee_Status
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-500 text-white"
                                        }`}
                                >
                                    {marquee.Marquee_Status ? "Active" : "Inactive"}
                                </span>
                            </div>

                            {/* Card Body */}
                            <div className="space-y-5 p-6">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                                        Marquee Text
                                    </label>
                                    <p className="mt-2 text-base leading-7 text-gray-700">
                                        {marquee.Marquee_Text}
                                    </p>
                                </div>

                             
                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-4 pt-1">
                                    <Link
                                        href={`/pages/admin/home/marquee/update-marquee?_id=${marquee._id}&Marquee_Text=${encodeURIComponent(
                                            marquee.Marquee_Text
                                        )}&Marquee_Link=${encodeURIComponent(
                                            marquee.Marquee_Link
                                        )}&Marquee_Status=${encodeURIComponent(marquee.Marquee_Status)}`}
                                        className="flex items-center justify-center gap-2 rounded-xl bg-[#0A2342] py-3 text-sm font-semibold text-white transition hover:bg-[#07172d]"
                                    >
                                        <Pencil size={16} />
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => requestDelete(marquee)}
                                        className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <DeleteModal
                open={!!modal}
                title="Delete this marquee?"
                itemName={modal?.Marquee_Text || "Homepage Marquee"}
                loading={deleting}
                onConfirm={confirmDelete}
                onClose={closeModal}
                confirmLabel="Delete Marquee"
            />
        </div>
    );
}