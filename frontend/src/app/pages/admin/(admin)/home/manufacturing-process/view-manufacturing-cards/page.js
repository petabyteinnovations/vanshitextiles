"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Factory,
} from "lucide-react";

import { apiurl } from "@/app/common/apiurl";
import {
  ToastError,
  ToastSuccess,
} from "@/app/common/ToastNotifications";

import Image from "next/image";

import DeleteModal from "@/app/common/DeleteModel";

export default function Page() {

  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [imgurl, setimgurl] = useState("");

  // Delete confirmation modal
  const [modal, setmodal] = useState(null);
  const [deleting, setDeleting] = useState(false);


  /* =========================================================
     GET MANUFACTURING PROCESS DATA
  ========================================================== */

  useEffect(() => {
    getCardData();
  }, []);


  const getCardData = async () => {

    try {

      setLoading(true);

      const res = await apiurl.get(
        "/admin/view-manufacturing-cards",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            csrftoken: sessionStorage.getItem("csrfToken"),
          },
        }
      );


      if (res.data.Status === 1) {

        setCards(
          res.data.Data.viewimages || []
        );

        setimgurl(
          res.data.Data.imageurl || ""
        );

      } else {

        ToastError(res.data.Message);

        if (res.data.Redirect !== null) {
          window.location.href = res.data.Redirect;
        }

      }

    } catch (error) {

      console.log(error);

      ToastError(
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  };


  /* =========================================================
     DELETE MODAL
  ========================================================== */

  // Open confirmation modal
  const requestDelete = (card) => {
    setmodal(card);
  };


  // Close confirmation modal
  const closeModal = () => {

    if (!deleting) {
      setmodal(null);
    }

  };


  /* =========================================================
     DELETE MANUFACTURING PROCESS
  ========================================================== */

  const confirmDelete = async () => {

    if (!modal) return;


    try {

      setDeleting(true);


      const res = await apiurl.delete(
        "/admin/delete-manufacturing-cards",
        {
          data: {
            _id: modal._id,
          },

          headers: {
            Authorization:
              localStorage.getItem("token"),

            csrftoken:
              sessionStorage.getItem("csrfToken"),
          },
        }
      );


      if (res.data.Status === 1) {

        ToastSuccess(
          res.data.Message
        );


        setCards((prev) =>
          prev.filter(
            (card) =>
              card._id !== modal._id
          )
        );


        setmodal(null);

      } else {

        ToastError(
          res.data.Message
        );

      }

    } catch (error) {

      console.log(error);

      ToastError(
        "Something went wrong."
      );

    } finally {

      setDeleting(false);

    }

  };


  /* =========================================================
     PAGE
  ========================================================== */

  return (

    <div className="space-y-6">


      {/* =================================================
                HEADER
            ================================================== */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">


        {/* PAGE INFORMATION */}

        <div>

          {/* Breadcrumb */}

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">

            <span>
              Dashboard
            </span>

            <span>
              /
            </span>

            <span>
              CMS
            </span>

            <span>
              /
            </span>

            <span>
              Home
            </span>

            <span>
              /
            </span>

            <span className="font-medium text-[#0A2342]">
              Manufacturing Process
            </span>

          </div>


          {/* Heading */}

          <h1 className="mt-2 text-3xl font-bold text-[#0A2342]">
            Manufacturing Process Management
          </h1>


          {/* Description */}

          <p className="mt-1 text-gray-500">
            Manage your homepage manufacturing process
            content from one place.
          </p>

        </div>


        {/* =================================================
                    HEADER BUTTONS
                ================================================== */}

        <div className="flex flex-wrap gap-3">


          {/* Back To CMS */}

          <Link
            href="/pages/admin/home"
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-medium transition hover:bg-gray-100"
          >

            <ArrowLeft size={18} />

            Back To CMS

          </Link>


          {/* Add Manufacturing Process */}

          <Link
            href="/pages/admin/home/manufacturing-process"
            className="flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
          >

            <Plus size={18} />

            Add Manufacturing Process

          </Link>

        </div>

      </div>


      {/* =================================================
                CARD GRID
            ================================================== */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


        {/* =================================================
                    LOADING
                ================================================== */}

        {loading ? (

          <div className="col-span-full flex items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white py-20">

            <div className="text-center">

              {/* Loader */}

              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />


              <h3 className="text-lg font-semibold text-[#0A2342]">
                Loading Manufacturing Processes...
              </h3>


              <p className="mt-2 text-sm text-gray-500">
                Please wait while we fetch your
                manufacturing process content.
              </p>

            </div>

          </div>


        ) : Array.isArray(cards) && cards.length > 0 ? (


          /* =================================================
             CARDS
          ================================================== */

          Array.isArray(cards) && cards?.map((card, index) => (

            <div
              key={card._id || index}
              className="group relative gap-6 rounded-3xl border border-gray-100 bg-white px-7 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >


              {/* =================================================
                                CARD CONTENT
                            ================================================== */}

              <section className="flex gap-4">


                {/* =================================================
                                    ICON / IMAGE
                                ================================================== */}

                <section>

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#D4AF37] shadow-md transition-all duration-300 group-hover:scale-105">


                    {card?.Manufacturing_Process_Image &&
                      imgurl ? (

                      <Image
                        src={`${imgurl}/${card.Manufacturing_Process_Image}`}
                        width={45}
                        height={45}
                        alt={
                          card?.Manufacturing_Process_Main_Heading ||
                          "Manufacturing Process"
                        }
                        className="h-11 w-11 object-contain brightness-0 invert"
                        unoptimized
                      />

                    ) : (

                      <Factory
                        size={32}
                        className="text-white"
                      />

                    )}

                  </div>


                  {/* =================================================
                                        STATUS
                                    ================================================== */}

                  <span
                    className={`mt-3 hidden rounded-full px-3 py-2 text-xs text-center font-semibold sm:block ${card?.Manufacturing_Process_Status
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                      }`}
                  >

                    {card?.Manufacturing_Process_Status
                      ? "Active"
                      : "De-Active"}

                  </span>

                </section>


                {/* =================================================
                                    CARD TEXT CONTENT
                                ================================================== */}

                <div className="min-w-0">


                  {/* Heading */}

                  <h2 className="text-2xl font-semibold leading-tight text-[#0A2342] transition-colors duration-300 group-hover:text-[#D4AF37]">

                    {
                      card?.Manufacturing_Process_Main_Heading ||
                      "Our Advanced Manufacturing Process"
                    }

                  </h2>


                  {/* Description */}

                  <p className="mt-3 max-w-4xl text-base leading-7 text-gray-500">

                    {
                      card?.Manufacturing_Process_Description ||
                      "From premium raw materials to precision manufacturing and finishing, our advanced process ensures consistent quality, durability, and exceptional fabric performance."
                    }

                  </p>


                  {/* =================================================
                                        ACTION BUTTONS
                                    ================================================== */}

                  <div className="mt-6 flex shrink-0 items-center gap-3">


                    {/* =================================================
                                            EDIT
                                        ================================================== */}

                    <Link
                      href={`/pages/admin/home/manufacturing-process/update-manufacturing-card?_id=${card._id}&&Manufacturing_Process_Main_Heading=${encodeURIComponent(
                        card.Manufacturing_Process_Main_Heading || ""
                      )}&&Manufacturing_Process_Status=${encodeURIComponent(
                        card.Manufacturing_Process_Status
                      )}&&Manufacturing_Process_Description=${encodeURIComponent(
                        card.Manufacturing_Process_Description || ""
                      )}&&Image=${encodeURIComponent(
                        imgurl + "/" + (card.Manufacturing_Process_Image || "")
                      )}`}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#0A2342] px-4 py-3 font-semibold text-white transition hover:opacity-90"
                      title="Edit Manufacturing Process"
                    >

                      <Pencil
                        size={17}
                        className="me-1"
                      />

                      Edit

                    </Link>


                    {/* =================================================
                                            DELETE
                                        ================================================== */}

                    <button
                      type="button"
                      onClick={() =>
                        requestDelete(card)
                      }
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                      title="Delete Manufacturing Process"
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


          /* =================================================
             EMPTY STATE
          ================================================== */

          <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white py-20">

            <div className="text-center">


              {/* Icon */}

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10">

                <Factory
                  size={28}
                  className="text-[#D4AF37]"
                />

              </div>


              {/* Heading */}

              <h3 className="text-xl font-semibold text-[#0A2342]">

                No Manufacturing Process Found

              </h3>


              {/* Description */}

              <p className="mt-2 text-sm text-gray-500">

                Add your first manufacturing process
                content to display it on the homepage.

              </p>


              {/* Add Button */}

              <Link
                href="/pages/admin/home/manufacturing-process"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0A2342] px-6 py-3 font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
              >

                <Plus size={18} />

                Add Manufacturing Process

              </Link>

            </div>

          </div>

        )}

      </div>


      {/* =================================================
                DELETE MODAL
            ================================================== */}

      <DeleteModal

        open={!!modal}

        title="Delete this manufacturing process?"

        itemName={
          modal?.Manufacturing_Process_Main_Heading ||
          "Manufacturing Process"
        }

        loading={deleting}

        onConfirm={confirmDelete}

        onClose={closeModal}

        confirmLabel="Delete Manufacturing Process"

      />

    </div>

  );
}