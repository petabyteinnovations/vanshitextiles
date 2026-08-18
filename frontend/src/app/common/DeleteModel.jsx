"use client";

import { AlertTriangle, X } from "lucide-react";

export default function DeleteModal({
    open,
    title = "Delete this item?",
    itemName,
    description,
    loading = false,
    onConfirm,
    onClose,
    confirmLabel = "Delete",
}) {
    if (!open) return null;

    const handleBackdropClick = () => {
        if (loading) return; // don't allow closing mid-request
        onClose?.();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={handleBackdropClick}
        >
            <div
                className="w-full max-w-md rounded-2xl bg-white p-6 border"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle size={22} className="text-red-600" />
                    </div>

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
                    >
                        <X size={18} />
                    </button>
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#0A2342]">
                    {title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                    {description ? (
                        description
                    ) : (
                        <>
                            You're about to delete{" "}
                            {itemName && (
                                <span className="font-semibold text-gray-700">
                                    "{itemName}"
                                </span>
                            )}
                            . This action cannot be undone.
                        </>
                    )}
                </p>

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="flex-1 rounded-xl border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <X size={0} className="hidden" />
                                {confirmLabel}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}