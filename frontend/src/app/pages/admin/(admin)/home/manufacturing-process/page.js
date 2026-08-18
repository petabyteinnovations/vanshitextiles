"use client";

import React, { useState } from "react";
import { Upload, X, Factory } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { toFormData } from "axios";
import {
  ToastError,
  ToastSuccess,
} from "@/app/common/ToastNotifications";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();

  const [preview, setPreview] = useState(null);

  const [inputfield, setInputfield] = useState({
    Manufacturing_Process_Main_Heading: "",
    Manufacturing_Process_Description: "",
    Manufacturing_Process_Image: "",
    Manufacturing_Process_Status: "",
  });

  const updateField = (key, value) =>
    setInputfield((prev) => ({
      ...prev,
      [key]: value,
    }));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    updateField("Manufacturing_Process_Image", file);
    setPreview(file);
  };

  const removeImage = () => {
    setPreview(null);
    updateField("Manufacturing_Process_Image", "");
  };

  const insertdata = (e) => {
    e.preventDefault();

    apiurl
      .post(
        "/admin/add-manufacturing-cards",
        toFormData(inputfield),
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            csrftoken: sessionStorage.getItem("csrfToken"),
          },
        }
      )
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
        ToastError("Something went wrong. Please try again.");
      });
  };

  return (
    <section className="w-full">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <span>/</span>
            <span>CMS</span>
            <span>/</span>
            <span className="font-medium text-[#0A2342]">
              Home Manufacturing Process
            </span>
          </div>

          {/* Page Heading */}
          <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
            Home Manufacturing Process Management
          </h1>

          {/* Page Description */}
          <p className="mt-1 text-gray-500">
            Manage home manufacturing process section from one place.
          </p>
        </div>

        {/* View Manufacturing Process Cards */}
        <Link
          href="/pages/admin/home/manufacturing-process/view-manufacturing-cards"
          className="rounded-xl bg-[#0A2342] px-4 py-3 font-medium text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
        >
          View Manufacturing Processes
        </Link>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <section className="mt-6 flex flex-col items-start justify-between gap-6 lg:flex-row">


        {/* ===================================================
            FORM
        ==================================================== */}
        <section className="my-2 w-full rounded-[10px] bg-white p-4 shadow lg:w-[50%]">

          <form
            className="space-y-5"
            onSubmit={insertdata}
          >


            {/* =================================================
                MAIN HEADING
            ================================================== */}
            <div>

              <label
                htmlFor="main_heading"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Manufacturing Process Main Heading
              </label>

              <input
                id="main_heading"
                type="text"
                placeholder="Our Advanced Manufacturing Process"
                className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                value={
                  inputfield.Manufacturing_Process_Main_Heading
                }
                onChange={(e) =>
                  updateField(
                    "Manufacturing_Process_Main_Heading",
                    e.target.value
                  )
                }
              />

              <p className="mt-1 text-xs text-gray-400">
                Enter the main heading for your manufacturing process section.
              </p>

            </div>


            {/* =================================================
                DESCRIPTION
            ================================================== */}
            <div>

              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Manufacturing Process Description
              </label>

              <textarea
                id="description"
                rows={5}
                placeholder="From premium raw materials to precision manufacturing and finishing, our advanced process ensures consistent quality, durability, and exceptional fabric performance."
                className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                value={
                  inputfield.Manufacturing_Process_Description
                }
                onChange={(e) =>
                  updateField(
                    "Manufacturing_Process_Description",
                    e.target.value
                  )
                }
              />

              <p className="mt-1 text-xs text-gray-400">
                Describe your manufacturing process, quality standards,
                production methods, or finishing capabilities.
              </p>

            </div>


            {/* =================================================
                MANUFACTURING PROCESS IMAGE
            ================================================== */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Manufacturing Process Image
              </label>


              {!preview ? (

                <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#FFF9EC]">

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                    onChange={handleImageChange}
                  />


                  <div className="flex flex-col items-center justify-center gap-3 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left">

                    {/* Upload Information */}
                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A2342]/10">
                        <Upload
                          className="h-5 w-5 text-[#0A2342]"
                          strokeWidth={1.8}
                        />
                      </div>


                      <div>

                        <h3 className="text-sm font-semibold text-[#0A2342]">
                          Upload Manufacturing Process Image
                        </h3>

                        <p className="mt-0.5 text-xs leading-5 text-gray-500">
                          Drag & drop, or click to browse ·{" "}
                          <span className="text-gray-400">
                            1200×800px · JPG/PNG/WebP · Max 5MB
                          </span>
                        </p>

                      </div>

                    </div>


                    {/* Choose Image Button */}
                    <button
                      type="button"
                      className="shrink-0 rounded-xl bg-[#0A2342] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342] sm:text-sm"
                    >
                      Choose Process Image
                    </button>

                  </div>

                </div>

              ) : (

                /* =================================================
                   SELECTED IMAGE
                ================================================== */
                <div className="mt-3 flex items-center gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3">

                  {/* Image Preview */}
                  <div className="relative flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">

                    <img
                      src={URL.createObjectURL(preview)}
                      alt="Manufacturing process preview"
                      className="h-full w-full object-cover"
                    />

                  </div>


                  {/* File Details */}
                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-medium text-[#0A2342]">
                      {preview.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {(preview.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                      Manufacturing process image selected
                    </p>

                  </div>


                  {/* Remove Image */}
                  <button
                    type="button"
                    aria-label="Remove manufacturing process image"
                    onClick={removeImage}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>

                </div>

              )}

            </div>


            {/* =================================================
                STATUS
            ================================================== */}
            <div>

              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Manufacturing Process Status
              </label>

              <select
                id="status"
                value={inputfield.Manufacturing_Process_Status}
                className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none transition focus:border-[#D4AF37]"
                onChange={(e) =>
                  updateField(
                    "Manufacturing_Process_Status",
                    e.target.value
                  )
                }
              >

                <option value="">
                  Select Manufacturing Process Status
                </option>

                <option value="true">
                  Active
                </option>

                <option value="false">
                  De-Active
                </option>

              </select>

              <p className="mt-1 text-xs text-gray-400">
                Active content will be displayed on the homepage.
              </p>

            </div>


            {/* =================================================
                SUBMIT BUTTON
            ================================================== */}
            <div className="flex justify-end pt-4">

              <button
                type="submit"
                className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] transition hover:opacity-90"
              >
                Publish Manufacturing Process
              </button>

            </div>

          </form>

        </section>


        {/* ===================================================
            LIVE PREVIEW
            Same card-style layout
        ==================================================== */}
        <section className="my-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg lg:w-[50%]">


          {/* =================================================
              PREVIEW HEADER
          ================================================== */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

            <div>

              <h2 className="text-2xl font-bold text-[#0A2342]">
                Live Card Preview
              </h2>

            </div>


            {/* Dynamic Status */}
            <span
              className={`rounded-full px-5 py-2 text-sm font-semibold ${inputfield.Manufacturing_Process_Status === "true"
                  ? "bg-green-100 text-green-700"
                  : inputfield.Manufacturing_Process_Status === "false"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"
                }`}
            >

              {inputfield.Manufacturing_Process_Status === "true"
                ? "Published"
                : inputfield.Manufacturing_Process_Status === "false"
                  ? "De-Active"
                  : "Draft"}

            </span>

          </div>


          {/* =================================================
              CARD CONTENT
          ================================================== */}
          <div className="p-8">

            <div className="group flex gap-5">


              {/* =================================================
                  MANUFACTURING PROCESS ICON
              ================================================== */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#D4AF37]/10 transition-all duration-300 group-hover:bg-[#D4AF37]">

                {preview ? (

                  <span
                    className="h-7 w-7 bg-[#D4AF37] transition-colors duration-300 group-hover:bg-[#0A2342]"
                    style={{
                      WebkitMaskImage: `url(${URL.createObjectURL(preview)})`,
                      maskImage: `url(${URL.createObjectURL(preview)})`,
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />

                ) : (

                  <Factory
                    size={26}
                    className="text-[#D4AF37] transition-colors duration-300 group-hover:text-[#0A2342]"
                  />

                )}

              </div>


              {/* =================================================
                  CONTENT
              ================================================== */}
              <div className="flex-1">


                {/* Heading */}
                <h3 className="mb-3 text-2xl font-semibold text-[#0A2342] transition-colors duration-300 group-hover:text-[#D4AF37]">

                  {inputfield.Manufacturing_Process_Main_Heading ||
                    "Our Advanced Manufacturing Process"}

                </h3>


                {/* Description */}
                <p className="max-w-xl leading-8 text-slate-600">

                  {inputfield.Manufacturing_Process_Description ||
                    "From premium raw materials to precision manufacturing and finishing, our advanced process ensures consistent quality, durability, and exceptional fabric performance."}

                </p>

              </div>

            </div>

          </div>

        </section>

      </section>

    </section>
  );
}