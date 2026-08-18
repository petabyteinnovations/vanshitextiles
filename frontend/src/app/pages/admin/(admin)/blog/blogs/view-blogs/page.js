"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Plus,
    Pencil,
    Trash2,
    FileText,
} from "lucide-react";

import { apiurl } from "@/app/common/apiurl";
import {
    ToastError,
    ToastSuccess,
} from "@/app/common/ToastNotifications";

import DeleteModal from "@/app/common/DeleteModel";
import Image from "next/image";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    const [modal, setmodal] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [imgurl, setimgurl] = useState("")
    console.log(imgurl)
    useEffect(() => {
        getBlogData();
    }, []);

    const getBlogData = async () => {
        try {
            setLoading(true);

            const res = await apiurl.get("/admin/view-blogs", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    csrftoken: sessionStorage.getItem("csrfToken"),
                },
            });

            if (res.data.Status === 1) {
                setBlogs(res.data.Data.viewimages || []);
                setimgurl(res.data.Data.imageurl)
            } else {
                ToastError(res.data.Message);

                if (res.data.Redirect) {
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

    const requestDelete = (blog) => {
        setmodal(blog);
    };

    const closeModal = () => {
        if (!deleting) {
            setmodal(null);
        }
    };

    const confirmDelete = async () => {
        if (!modal) return;

        try {
            setDeleting(true);

            const res = await apiurl.delete("/admin/delete-blogs", {
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

                setBlogs((prev) =>
                    prev.filter((blog) => blog._id !== modal._id)
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

            {/* ================= HEADER ================= */}

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">

                        <span>Dashboard</span>

                        <span>/</span>

                        <span>CMS</span>

                        <span>/</span>

                        <span>Blog CMS</span>

                        <span>/</span>

                        <span className="font-medium text-[#0A2342]">
                            View Blogs
                        </span>

                    </div>

                    <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
                        Blog Management
                    </h1>

                    <p className="mt-1 text-gray-500">
                        View and manage all blogs from one place.
                    </p>

                </div>

                <div className="flex flex-wrap gap-3">

                    <Link
                        href="/pages/admin/blog"
                        className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium transition hover:bg-gray-100"
                    >
                        <ArrowLeft size={18} />
                        Back To CMS
                    </Link>

                    <Link
                        href="/pages/admin/blog/blogs"
                        className="flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        <Plus size={18} />
                        Add Blog
                    </Link>

                </div>

            </div>

            {/* ================= BLOG GRID ================= */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                {loading ? (

                    <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20">

                        <div className="text-center">

                            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />

                            <h3 className="text-lg font-semibold text-[#0A2342]">
                                Loading Blogs...
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Please wait while we fetch your blogs.
                            </p>

                        </div>

                    </div>

                ) : Array.isArray(blogs) && blogs.length > 0 ? (

                    blogs.map((blog, index) => (

                        <div
                            key={blog._id || index}
                            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-xl"
                        >

                            {/* ================= BLOG IMAGE ================= */}

                            <div className="relative h-75 w-full overflow-hidden bg-gray-100">

                                {blog?.Blog_Image ? (

                                    <Image
                                        src={`${imgurl}/${blog.Blog_Image}`}
                                        alt={
                                            blog?.Blog_Title ||
                                            "Blog Image"
                                        }
                                        width={200}
                                        height={200}
                                        className="h-full w-full object-fit transition duration-500 group-hover:scale-105"
                                    />

                                ) : (

                                    <div className="flex h-full w-full items-center justify-center">

                                        <FileText
                                            size={55}
                                            className="text-[#D4AF37]"
                                            strokeWidth={1.5}
                                        />

                                    </div>

                                )}

                                {/* Status */}

                                <div className="absolute right-4 top-4">

                                    <span
                                        className={`rounded-full px-4 py-2 text-xs font-semibold shadow-sm ${blog?.Blog_Status === true ||
                                            blog?.Blog_Status === "true"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {blog?.Blog_Status === true ||
                                            blog?.Blog_Status === "true"
                                            ? "Active"
                                            : "De-Active"}
                                    </span>

                                </div>

                            </div>

                            {/* ================= CONTENT ================= */}

                            <div className="p-6">

                                <div className="mb-3 flex items-center gap-2">

                                    <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#D4AF37]">
                                        Blog #{index + 1}
                                    </span>

                                </div>

                                {/* Title */}

                                <h2 className="line-clamp-2 text-xl font-bold leading-7 text-[#0A2342] transition-colors duration-300 group-hover:text-[#D4AF37]">
                                    {blog?.Blog_Main_Heading ||
                                        "Blog Title"}
                                </h2>

                                {/* Description */}

                                <p className="mt-3 line-clamp-4 text-sm leading-6 text-gray-500 whitespace-pre-line">
                                    {blog?.Blog_Description ||
                                        "Blog description."}
                                </p>

                                {/* Divider */}

                                <div className="my-5 border-t border-gray-100" />

                                {/* Actions */}

                                <div className="flex items-center justify-between gap-3">

                                    <div className="flex">

                                        <Link
                                            href={`/pages/admin/blog/blogs/view-blogs/view-blog-detail?_id=${blog._id}`}
                                            className="flex items-center gap-2 rounded-xl bg-[#D4AF37] border border-[#D4AF37] px-4 py-2.5 text-xs font-semibold text-[#ffffff] transition"
                                        >
                                            View More
                                        </Link>
                                    </div>


                                    <div className="flex items-center gap-2">

                                        <Link
                                            href={`/pages/admin/blog/blogs/update-blog?_id=${blog._id}`}
                                            className="flex items-center gap-2 rounded-xl bg-[#0A2342] px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
                                            title="Edit Blog"
                                        >
                                            <Pencil size={16} />
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                requestDelete(blog)
                                            }
                                            className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                                            title="Delete Blog"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))

                ) : (

                    /* ================= EMPTY STATE ================= */

                    <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white py-20">

                        <div className="text-center">

                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10">

                                <FileText
                                    size={30}
                                    className="text-[#D4AF37]"
                                />

                            </div>

                            <h3 className="text-xl font-semibold text-[#0A2342]">
                                No Blogs Found
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Add your first blog to get started.
                            </p>

                            <Link
                                href="/pages/admin/blogs/add-blog"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
                            >
                                <Plus size={18} />
                                Add Blog
                            </Link>

                        </div>

                    </div>

                )}

            </div>

            {/* ================= DELETE MODAL ================= */}

            <DeleteModal
                open={!!modal}
                title="Delete this blog?"
                itemName={
                    modal?.Blog_Title || "Blog"
                }
                loading={deleting}
                onConfirm={confirmDelete}
                onClose={closeModal}
                confirmLabel="Delete Blog"
            />

        </div>
    );
}