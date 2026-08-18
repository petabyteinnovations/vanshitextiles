'use client'
import React, { useState } from "react";
import { Upload, X, Monitor } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { toFormData } from "axios";
import { ToastError, ToastSuccess } from "@/app/common/ToastNotifications";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  let router = useRouter();
  let [preview, setpreview] = useState(null)
  let [inputfield, setinputfield] = useState({
    Banner_Tag: "",
    Banner_Main_Heading: "",
    Banner_Description: "",
    Banner_Primary_Btn_Text: "",
    Banner_Primary_Btn_Link: "",
    Banner_Secondary_Btn_Text: "",
    Banner_Secondary_Btn_Link: "",
    Banner_Image: "",
    Banner_Status: "",
  })


  let insertdata = (e) => {
    try {
      e.preventDefault();
      apiurl.post("/admin/add-home-banner", toFormData(inputfield), {
        headers: {
          Authorization: localStorage.getItem("token"),
          csrftoken: sessionStorage.getItem("csrfToken")
        }
      })
        .then((res) => {
          if (res.data.Status === 1) {
            ToastSuccess(res.data.Message)
          }
          else {
            ToastError(res.data.Message)
            if (res.data.Redirect !== null) return router.push(res.data.Redirect);
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <section className="w-full">
        <section className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Dashboard</span>

             
              <span>/</span>

              <span className="font-semibold text-[#0A2342]">
                Hero Banner
              </span>
            </div>

            <h1 className="mt-3 text-3xl font-bold text-[#0A2342]">
              Hero Banner Management
            </h1>

            <p className="mt-2 text-gray-500">
              Add and manage the homepage hero banner from here.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={"/pages/admin/home/hero/view-hero-banner"} className="bg-[#0A2342] p-3 px-4 rounded-xl text-white font-medium">
              View Banner
            </Link>
          </div>
        </section>

        <section className="w-full mt-6 flex items-start justify-between gap-4">
          <section className="w-[50%] my-2 p-3 bg-white shadow rounded-[10px]">
            <form className="space-y-5" onSubmit={insertdata}>
              {/* Banner Tag */}
              <section>
                <label htmlFor="banner_tag" className="mb-2 block text-sm font-medium text-gray-700">
                  Banner Tag
                </label>
                <input
                  id="banner_tag"
                  type="text"
                  placeholder="MANUFACTURING EXCELLENCE"
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                  onChange={(e) => setinputfield({ ...inputfield, Banner_Tag: e.target.value })}
                />
              </section>

              {/* Main Heading */}
              <section>
                <label htmlFor="main_heading" className="mb-2 block text-sm font-medium text-gray-700">
                  Main Heading
                </label>
                <input
                  id="main_heading"
                  type="text"
                  placeholder="Trusted Wholesale Partner"
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                  onChange={(e) => setinputfield({ ...inputfield, Banner_Main_Heading: e.target.value })}
                />
              </section>

              {/* Description */}
              <section>
                <label htmlFor="banner_description" className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="banner_description"
                  rows={4}
                  placeholder="Delivering superior textile products with modern manufacturing and exceptional quality."
                  className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                  onChange={(e) => setinputfield({ ...inputfield, Banner_Description: e.target.value })}
                />
              </section>

              {/* Primary Button */}
              <section className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="banner_primary_btn_text" className="mb-2 block text-sm font-medium text-gray-700">
                    Primary Button Text
                  </label>
                  <input
                    id="banner_primary_btn_text"
                    type="text"
                    placeholder="Explore Collection"
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                    onChange={(e) => setinputfield({ ...inputfield, Banner_Primary_Btn_Text: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="banner_primary_btn_link" className="mb-2 block text-sm font-medium text-gray-700">
                    Primary Button Link
                  </label>
                  <input
                    id="banner_primary_btn_link"
                    type="text"
                    placeholder="https://vanshitextiles.com/products"
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                    onChange={(e) => setinputfield({ ...inputfield, Banner_Primary_Btn_Link: e.target.value })}
                  />
                </div>
              </section>

              {/* Secondary Button */}
              <section className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="banner_secondary_btn_text" className="mb-2 block text-sm font-medium text-gray-700">
                    Secondary Button Text
                  </label>
                  <input
                    id="banner_secondary_btn_text"
                    type="text"
                    placeholder="Contact Us"
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                    onChange={(e) => setinputfield({ ...inputfield, Banner_Secondary_Btn_Text: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="banner_secondary_btn_link" className="mb-2 block text-sm font-medium text-gray-700">
                    Secondary Button Link
                  </label>
                  <input
                    id="banner_secondary_btn_link"
                    type="text"
                    placeholder="https://vanshitextiles.com/contact"
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                    onChange={(e) => setinputfield({ ...inputfield, Banner_Secondary_Btn_Link: e.target.value })}
                  />
                </div>
              </section>

              {/* Banner Image — upload dropzone */}
              <section>
                <label htmlFor="banner_image" className="mb-2 block text-sm font-semibold text-gray-700">
                  Banner Image
                </label>

                {
                  preview === null ?
                    <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#FFF9EC]">
                      <input
                        id="banner_image"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                        onChange={(e) => setinputfield({ ...inputfield, Banner_Image: e.target.files[0] }, setpreview(e.target.files[0]))}
                      />

                      <div className="flex flex-col items-center justify-center gap-3 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A2342]/10">
                            <Upload className="h-5 w-5 text-[#0A2342]" strokeWidth={1.8} />
                          </div>

                          <div>
                            <h3 className="text-sm font-semibold text-[#0A2342]">
                              Upload Hero Banner
                            </h3>
                            <p className="mt-0.5 text-xs leading-5 text-gray-500">
                              Drag & drop, or click to browse ·{" "}
                              <span className="text-gray-400">
                                1920×900px · JPG, PNG, WEBP · Max 5MB
                              </span>
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="shrink-0 rounded-xl bg-[#0A2342] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342] sm:text-sm"
                        >
                          Choose Image
                        </button>
                      </div>
                    </div> :
                    <div className="mt-3 flex items-center gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3">
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={preview === null ? "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400" : URL.createObjectURL(preview)}
                          alt="Banner preview"
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[#0A2342]">
                          {preview === null ? "Banner.jpg" : preview.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {preview === null ? "Banner.jpg" : preview.size}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-[#0A2342]"
                        aria-label="Remove image"
                        onClick={() => { setpreview(null), setinputfield({ ...inputfield, Banner_Image: "" }) }}
                      >
                        <X size={16} />
                      </button>

                      <input type="file" accept="image/*" className="hidden" />
                    </div>
                }

                {/* Selected-file row (shown once an image is picked) */}

              </section>

              {/* Banner Status */}
              <section className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="banner_status" className="mb-2 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select id="banner_status" className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-[#D4AF37]"
                    onChange={(e) => setinputfield({ ...inputfield, Banner_Status: e.target.value })}
                  >
                    <option>Choose Status</option>
                    <option value={true}>Active</option>
                    <option value={false}>De-Active</option>
                  </select>
                </div>
              </section>


              {/* Submit Buttons */}
              <section className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] hover:opacity-90"
                >
                  Publish Banner
                </button>
              </section>
            </form>
          </section>

          {/* Live Preview */}
          <section className="w-[50%] my-2 overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
            {/* Preview Header */}
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-[#0A2342]">
                  Live Banner Preview
                </h2>
                <p className="text-sm text-gray-500">
                  This is exactly how the hero banner will appear.
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                Published
              </span>
            </div>

            {/* Preview Area */}
            <div>
              <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
                {/* Fake browser chrome */}
                <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <div className="ml-3 flex items-center gap-1.5 rounded-md bg-white px-3 py-1 text-[11px] text-gray-400">
                    <Monitor size={12} />
                    vanshitextiles.com
                  </div>
                </div>

                <section
                  className="relative h-72 w-full bg-cover bg-center sm:h-80"
                  style={{
                    backgroundImage:
                      `url(${preview === null ? 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1800' : URL.createObjectURL(preview)
                      })`,
                  }}
                >
                  {/* Overlay to match real hero */}
                  <div className="absolute inset-0 bg-black/50" />

                  <div className="relative z-10 flex h-full max-w-xl flex-col justify-center px-8 text-white sm:px-10">
                    <p className="text-[10px] font-semibold uppercase tracking-[3px] text-[#D4AF37] sm:text-xs sm:tracking-[5px]">
                      Manufacturing Excellence
                    </p>

                    <h1 className="mt-3 text-2xl font-light leading-tight sm:text-4xl">
                      Trusted Wholesale Partner
                    </h1>

                    <p className="mt-3 max-w-sm text-xs leading-6 text-gray-200 sm:text-sm">
                      Delivering superior textile products with modern
                      manufacturing and exceptional quality.
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <span className="rounded-full bg-[#D4AF37] px-5 py-2.5 text-xs font-medium text-black sm:text-sm">
                        Explore Collection
                      </span>
                      <span className="rounded-full border border-white px-5 py-2.5 text-xs sm:text-sm">
                        Contact Us
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}