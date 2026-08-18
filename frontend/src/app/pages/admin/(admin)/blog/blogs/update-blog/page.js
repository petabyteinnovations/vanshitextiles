"use client";

import React, { useEffect, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { ToastError, ToastSuccess } from "@/app/common/ToastNotifications";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const urldata = useSearchParams();

  const [preview, setPreview] = useState(null);

  const [inputfield, setInputfield] = useState({
    _id: urldata.get("_id"),
    Blog_Main_Heading: "",
    Blog_Description: "",
    Blog_Image: "",
    Blog_Status: "",
  });

  const updateField = (key, value) => {
    setInputfield((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ================= FETCH BLOG =================

  const getdata = async () => {
    try {
      const data = {
        _id: urldata.get("_id"),
      };

      apiurl
        .post("/admin/view-blog-detail", data, {
          headers: {
            Authorization: localStorage.getItem("token"),
            csrftoken: sessionStorage.getItem("csrfToken"),
          },
        })
        .then((res) => {
          if (res.data.Status === 1) {
            const blog = res.data.Data.viewimages;
            const imageurl = res.data.Data.imageurl;

            setInputfield({
              _id: blog?._id || "",
              Blog_Main_Heading:
                blog?.Blog_Main_Heading || "",
              Blog_Description:
                blog?.Blog_Description || "",
              Blog_Image:
                blog?.Blog_Image || "",
              Blog_Status:
                blog?.Blog_Status ?? "",
            });

            if (blog?.Blog_Image) {
              const imagePath =
                blog.Blog_Image.startsWith("http")
                  ? blog.Blog_Image
                  : `${imageurl.replace(
                    /\/$/,
                    ""
                  )}/${blog.Blog_Image.replace(
                    /^\//,
                    ""
                  )}`;

              setPreview(imagePath);
            }
          } else {
            ToastError(res.data.Message);
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

  useEffect(() => {
    if (urldata.get("_id")) {
      getdata();
    }
  }, []);

  // ================= IMAGE CHANGE =================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    updateField("Blog_Image", file);

    setPreview(URL.createObjectURL(file));
  };

  // ================= REMOVE IMAGE =================

  const removeImage = () => {
    setPreview(null);
    updateField("Blog_Image", "");
  };

  // ================= UPDATE BLOG =================

  const updatedata = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.append("_id", inputfield._id);
      formData.append(
        "Blog_Main_Heading",
        inputfield.Blog_Main_Heading
      );
      formData.append(
        "Blog_Description",
        inputfield.Blog_Description
      );
      formData.append(
        "Blog_Status",
        inputfield.Blog_Status
      );

      if (inputfield.Blog_Image instanceof File) {
        formData.append(
          "Blog_Image",
          inputfield.Blog_Image
        );
      }

      apiurl
        .put("/admin/update-blog", formData, {
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
          if (res.data.Redirect) {
            router.push(res.data.Redirect);
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

              <span>CMS</span>
              <span>/</span>

              <span>Blog</span>
              <span>/</span>

              <span className="font-medium text-[#0A2342]">
                Update Blog
              </span>

            </div>

            <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
              Blog Management
            </h1>

            <p className="mt-1 text-gray-500">
              Manage blog section from one place.
            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/pages/admin/blog/view-blogs"
              className="rounded-xl bg-[#0A2342] px-4 py-3 font-medium text-white"
            >
              View Blogs
            </Link>

          </div>

        </section>

        {/* Main Layout */}

        <section className="mt-6 flex items-start justify-between gap-4">

          {/* Form */}

          <section className="my-2 w-[50%] rounded-[10px] bg-white p-3 shadow">

            <form
              className="space-y-5"
              onSubmit={updatedata}
            >

              {/* Blog Main Heading */}

              <div>

                <label
                  htmlFor="main_heading"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Main Heading
                </label>

                <input
                  id="main_heading"
                  type="text"
                  placeholder="Enter blog main heading..."
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                  value={
                    inputfield.Blog_Main_Heading
                  }
                  onChange={(e) =>
                    updateField(
                      "Blog_Main_Heading",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* Blog Description */}

              <div>

                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  rows={5}
                  placeholder="Enter blog description..."
                  className="w-full resize-none rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                  value={
                    inputfield.Blog_Description
                  }
                  onChange={(e) =>
                    updateField(
                      "Blog_Description",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* Blog Image */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Blog Image
                </label>

                {!preview ? (

                  <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#FFF9EC]">

                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                      onChange={
                        handleImageChange
                      }
                    />

                    <div className="flex flex-col items-center justify-center gap-3 px-6 py-5 text-center sm:flex-row sm:justify-between sm:text-left">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A2342]/10">

                          <Upload
                            className="h-5 w-5 text-[#0A2342]"
                            strokeWidth={1.8}
                          />

                        </div>

                        <div>

                          <h3 className="text-sm font-semibold text-[#0A2342]">
                            Upload Blog Image
                          </h3>

                          <p className="mt-0.5 text-xs leading-5 text-gray-500">
                            Drag & drop, or click to browse ·{" "}
                            <span className="text-gray-400">
                              PNG/JPG/JPEG · Max 5MB
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

                  </div>

                ) : (

                  <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3">

                    <div className="flex items-center gap-4">

                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-gray-100">

                        <Image
                          src={preview}
                          alt="Blog Preview"
                          width={200}
                          height={200}
                          className="block h-full w-full object-fit"
                        />

                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-sm font-medium text-[#0A2342]">
                          Blog Image
                        </p>

                        <p className="text-xs text-gray-500">
                          Image preview
                        </p>

                      </div>

                      <button
                        type="button"
                        aria-label="Remove image"
                        onClick={
                          removeImage
                        }
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-[#0A2342]"
                      >
                        <X size={16} />
                      </button>

                    </div>

                  </div>

                )}

              </div>

              {/* Status */}

              <div>

                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Status
                </label>

                <select
                  id="status"
                  value={String(
                    inputfield.Blog_Status
                  )}
                  className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#D4AF37]"
                  onChange={(e) =>
                    updateField(
                      "Blog_Status",
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Choose Status
                  </option>

                  <option value="true">
                    Active
                  </option>

                  <option value="false">
                    De-Active
                  </option>

                </select>

              </div>

              {/* Update Button */}

              <div className="flex justify-end pt-4">

                <button
                  type="submit"
                  className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#0A2342] transition hover:opacity-90"
                >
                  Update Blog
                </button>

              </div>

            </form>

          </section>

          {/* Live Preview */}

          <section className="my-2 w-[50%] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

              <div>

                <h2 className="text-2xl font-bold text-[#0A2342]">
                  Live Blog Preview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  This is how the blog will appear on the website.
                </p>

              </div>

              <span
                className={`rounded-full px-5 py-2 text-sm font-semibold ${inputfield.Blog_Status ===
                  true ||
                  inputfield.Blog_Status ===
                  "true"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
                  }`}
              >
                {inputfield.Blog_Status ===
                  true ||
                  inputfield.Blog_Status ===
                  "true"
                  ? "Published"
                  : "De-Active"}
              </span>

            </div>

            <div className="p-6">

              {/* Preview Image */}

              <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 p-1">

                {preview ? (

                  <Image
                    src={preview}
                    width={300}
                    height={300}
                    alt={
                      inputfield.Blog_Main_Heading ||
                      "Blog Image"
                    }
                    className="block h-full w-full object-cover"
                  />

                ) : (

                  <div className="flex h-full w-full items-center justify-center">

                    <FileText
                      size={60}
                      className="text-[#D4AF37]"
                      strokeWidth={1.5}
                    />

                  </div>

                )}

              </div>

              {/* Preview Content */}

              <div className="mt-6">



                <h3 className="mt-5 text-2xl font-semibold text-[#0A2342]">

                  {inputfield.Blog_Main_Heading ||
                    "Blog Main Heading"}

                </h3>

                <p className="mt-4 leading-8 text-slate-600">

                  {inputfield.Blog_Description ||
                    "Enter blog description to see the live preview here."}

                </p>

              </div>

            </div>

          </section>

        </section>

      </section>

    </ >
  );
}