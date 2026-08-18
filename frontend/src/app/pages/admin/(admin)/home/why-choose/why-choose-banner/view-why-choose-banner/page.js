"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  GripVertical,
  ExternalLink,
} from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { ToastError, ToastSuccess } from "@/app/common/ToastNotifications";
import Image from "next/image";
import DeleteModal from "@/app/common/DeleteModel";

export default function Page() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [banners, setBanners] = useState([]);
  const [imgurl, setimgurl] = useState("");

  const [modal, setmodal] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getBannerData();
  }, []);

  const getBannerData = async () => {
    try {
      setLoading(true);

      const res = await apiurl.get("/admin/view-why-choose-banner", {
        headers: {
          Authorization: localStorage.getItem("token"),
          csrftoken: sessionStorage.getItem("csrfToken"),
        },
      });

      if (res.data.Status === 1) {
        setBanners(res.data.Data.viewimages || []);
        setimgurl(res.data.Data.imageurl);
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

  const requestDelete = (banner) => setmodal(banner);
  const closeModal = () => !deleting && setmodal(null);

  const confirmDelete = async () => {
    if (!modal) return;

    try {
      setDeleting(true);

      // Fixed: this previously called /admin/delete-home-banner, which
      // deletes Hero Banner records, not Why Choose Banner records.
      const res = await apiurl.delete("/admin/delete-why-choose-banner", {
        data: { _id: modal._id },
        headers: {
          Authorization: localStorage.getItem("token"),
          csrftoken: sessionStorage.getItem("csrfToken"),
        },
      });

      if (res.data.Status === 1) {
        ToastSuccess(res.data.Message);
        setBanners((prev) => prev.filter((banner) => banner._id !== modal._id));
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

  const filteredBanners = banners.filter(
    (banner) =>
      banner.Why_Banner_Main_Heading?.toLowerCase().includes(search.toLowerCase()) ||
      banner.Why_Banner_Tag?.toLowerCase().includes(search.toLowerCase())
  );

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
            <span>Why Choose CMS</span>
            <span>/</span>
            <span className="font-medium text-[#0A2342]">Why Choose Banner</span>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
            Why Choose Banner Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage why choose banner section from one place.
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
            href="/pages/admin/home/why-choose/why-choose-banner"
            className="flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <Plus size={18} />
            Add Banner
          </Link>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="relative rounded-2xl bg-white">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Banner..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* ================= BANNER GRID ================= */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {loading ? (
          <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />
              <h3 className="text-lg font-semibold text-[#0A2342]">Loading Banners...</h3>
              <p className="mt-2 text-sm text-gray-500">
                Please wait while we fetch your banners.
              </p>
            </div>
          </div>
        ) : filteredBanners.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white py-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#0A2342]">No Banner Found</h2>
              <p className="mt-2 text-gray-500">No why choose banner matches your search.</p>
              <Link
                href="/pages/admin/home/why-choose/why-choose-banner"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white"
              >
                <Plus size={18} />
                Add New Banner
              </Link>
            </div>
          </div>
        ) : (
          filteredBanners.map((banner, index) => (
            <div
              key={banner._id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gray-300 hover:shadow-xl"
            >
              {/* ================= Banner Image ================= */}
              <div className="relative h-90 overflow-hidden">
                <Image
                  src={`${imgurl}/${banner.Why_Banner_Image}`}
                  alt={banner.Why_Banner_Main_Heading}
                  width={1200}
                  height={700}
                  unoptimized
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />

                {/* Top row — order + status */}
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-[#0A2342] shadow-md backdrop-blur-sm">
                    <GripVertical size={13} className="text-gray-400" />
                    Position {index + 1}
                  </span>

                  {/* Fixed: badge now reflects the real status instead of
                      being hardcoded to green "Active" for every card. */}
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-md ${banner.Why_Banner_Status
                      ? "bg-green-500/95 text-white"
                      : "bg-gray-500/95 text-white"
                      }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${banner.Why_Banner_Status ? "bg-white" : "bg-gray-200"
                        }`}
                    />
                    {banner.Why_Banner_Status ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* ================= Card Body ================= */}
              <div className="space-y-4 p-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[4px] text-[#D4AF37]">
                    {banner.Why_Banner_Tag || "No tag set"}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold leading-tight text-[#0A2342]">
                    {banner.Why_Banner_Main_Heading || "Untitled Banner"}
                  </h2>

                  <p className="mt-3 line-clamp-2 max-w-lg text-sm leading-6 text-gray-400">
                    {banner.Why_Banner_Description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full bg-[#D4AF37] px-5 py-2.5 text-xs font-semibold text-[#0A2342] shadow">
                      {banner.Why_Banner_Primary_Btn_Text || "Primary CTA"}
                    </span>
                  </div>
                </div>

                {/* Link */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                      <ExternalLink size={11} />
                      Primary Link
                    </div>

                    <a href={banner.Why_Banner_Primary_Btn_Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 block truncate text-sm font-medium text-[#0A2342] hover:underline"
                    >
                      {banner.Why_Banner_Primary_Btn_Link || "—"}
                    </a>
                  </div>
                </div>

                {/* Action Buttons — Delete added, was missing entirely */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <Link
                    href={`/pages/admin/home/why-choose/why-choose-banner/update-why-choose-banner?${new URLSearchParams(
                      {
                        _id: banner._id,
                        Why_Banner_Tag: banner.Why_Banner_Tag ?? "",
                        Why_Banner_Main_Heading: banner.Why_Banner_Main_Heading ?? "",
                        Why_Banner_Description: banner.Why_Banner_Description ?? "",
                        Why_Banner_Primary_Btn_Text: banner.Why_Banner_Primary_Btn_Text ?? "",
                        Why_Banner_Primary_Btn_Link: banner.Why_Banner_Primary_Btn_Link ?? "",
                        Why_Banner_Status: String(banner.Why_Banner_Status ?? ""),
                        Why_Banner_Image: `${imgurl}/${banner.Why_Banner_Image}`,
                      }
                    ).toString()}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#0A2342] py-3 text-sm font-semibold text-white transition hover:bg-[#0A2342]/90"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  <button
                    onClick={() => requestDelete(banner)}
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

      {/* Delete Modal — was imported but never rendered before */}
      <DeleteModal
        open={!!modal}
        title="Delete this banner?"
        itemName={modal?.Why_Banner_Main_Heading || "Why Choose Banner"}
        loading={deleting}
        onConfirm={confirmDelete}
        onClose={closeModal}
        confirmLabel="Delete Banner"
      />
    </div >
  );
}