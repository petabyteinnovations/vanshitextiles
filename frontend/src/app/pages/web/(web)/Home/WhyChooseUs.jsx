"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import Link from "next/link";

export default function WhyChooseUs() {
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState([]);
  const [whybannerdata, setWhyBannerData] = useState([]);
  const [imgurl, setImgurl] = useState("");

  const bannerData = whybannerdata?.[0];

  const bannerImage =
    bannerData?.Why_Banner_Image && imgurl
      ? `${imgurl}/${bannerData.Why_Banner_Image}`
      : "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80";

  /* ==========================================================
                        FETCH DATA
  ========================================================== */

  const fetchAllData = async () => {
    try {
      const [bannerRes, cardRes] = await Promise.all([
        apiurl.get("/web/view-why-choose-banner"),
        apiurl.get("/web/view-why-choose-card"),
      ]);

      return {
        bannerData: bannerRes?.data?.Data?.viewimages || [],
        imageUrl: bannerRes?.data?.Data?.imageurl || "",
        cardData: cardRes?.data?.Data?.viewimages || [],
      };
    } catch (error) {
      console.error("Why Choose Us API Error:", error);

      return {
        bannerData: [],
        imageUrl: "",
        cardData: [],
      };
    }
  };

  /* ==========================================================
                        LOAD DATA
  ========================================================== */

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await fetchAllData();

      setWhyBannerData(res.bannerData);
      setFeatures(res.cardData);
      setImgurl(res.imageUrl);

      setLoading(false);
    })();
  }, []);

  return (
    <section className="relative overflow-x-clip bg-white py-20 lg:py-28">
      {/* ==========================================================
                    DECORATIVE BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#0A2342]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* ==========================================================
                              HEADING
        ========================================================== */}

        <div className="mb-20 max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[5px] text-[#D4AF37]">
            <span className="h-px w-8 bg-[#D4AF37]" />
            Why Choose Vanshi Tex
          </span>

          <h2 className="mt-5 text-4xl font-light leading-tight text-[#0A2342] md:text-5xl lg:text-6xl">
            Trusted Manufacturing for
            <span className="font-semibold text-[#D4AF37]">
              {" "}
              Premium Textile Solutions
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Combining modern manufacturing, premium fabrics, and dependable
            global supply to help businesses grow with confidence.
          </p>
        </div>

        {/* ==========================================================
                            MAIN CONTENT
        ========================================================== */}

        {loading ? (
          <SectionSkeleton />
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            {/* ======================================================
                            LEFT — FEATURES
            ====================================================== */}

            <div className="min-w-0">
              <div className="space-y-5">
                {features.length > 0 ? (
                  features.map((feature, index) => (
                    <div
                      key={feature._id || index}
                      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-xl lg:flex lg:gap-5 lg:border-none lg:p-4 lg:shadow-none"
                    >
                      {/* GOLD ACCENT */}

                      <div
                        className="absolute left-0 top-0 h-full w-1 bg-[#D4AF37] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />

                      {/* ICON */}

                      <div className=" mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0A2342] shadow-lg transition-all duration-300 group-hover:bg-[#D4AF37] lg:mb-0">
                        {feature?.Why_Choose_Card_Image && imgurl ? (
                          <Image
                            src={`${imgurl}/${feature.Why_Choose_Card_Image}`}
                            width={30}
                            height={30}
                            alt={
                              feature?.Why_Choose_Card_Main_Heading ||
                              "Why Choose Icon"
                            }
                            className="h-7 w-7 object-contain brightness-0 invert transition-all duration-300 group-hover:invert-0"
                            unoptimized
                          />
                        ) : (
                          <Sparkles
                            size={25}
                            className="text-white transition-colors duration-300 group-hover:text-[#0A2342]"
                          />
                        )}
                      </div>

                      {/* CONTENT */}

                      <div
                        className="min-w-0 flex-1"
                      >
                        <h3
                          className="mb-2 text-lg font-semibold leading-snug text-[#0A2342] transition-colors duration-300 group-hover:text-[#D4AF37] md:text-xl"
                        >
                          {feature?.Why_Choose_Card_Main_Heading ||
                            "Premium Quality"}
                        </h3>

                        <p
                          className="text-sm leading-6 text-slate-600 md:text-base"
                        >
                          {feature?.Why_Choose_Card_Description ||
                            "We provide premium quality textile products with reliable manufacturing and excellent service."}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    className="rounded-2xl border border-dashed border-slate-300 p-8 text-center"
                  >
                    <p className="text-slate-500">No features available.</p>
                  </div>
                )}
              </div>

              {/* ======================================================
                                  CTA
              ====================================================== */}

              <div className="mt-12">
                <Link
                  href={bannerData?.Why_Banner_Primary_Btn_Link || "/"}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0A2342] px-8 py-4 font-semibold text-white shadow-lg shadow-[#0A2342]/20 transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342] hover:shadow-[#D4AF37]/30 sm:w-auto"
                >
                  {bannerData?.Why_Banner_Primary_Btn_Text ||
                    "Request Catalogue"}

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* ======================================================
                        RIGHT — STICKY IMAGE
            ====================================================== */}

            <div className="self-start h-auto lg:sticky lg:top-28 lg:h-fit">
              <div className="group relative h-[80vh] overflow-hidden rounded-3xl shadow-2xl shadow-[#0A2342]/10">
                <Image
                  src={bannerImage}
                  alt={
                    bannerData?.Why_Banner_Main_Heading ||
                    "Textile Manufacturing"
                  }
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />

                {/* IMAGE OVERLAY */}

                <div className="absolute inset-0 bg-linear-to-t from-[#07192D]/85 via-[#07192D]/25 to-transparent" />

                {/* IMAGE CONTENT */}

                <div className="absolute bottom-8 left-8 right-8">
                  <span className="inline-block rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#0A2342] shadow-lg">
                    {bannerData?.Why_Banner_Tag || "Premium Manufacturing"}
                  </span>

                  <h3 className="mt-5 whitespace-pre-line text-xl font-light leading-tight text-white md:text-3xl">
                    {bannerData?.Why_Banner_Main_Heading ||
                      "Crafted with Precision,\nBuilt for Global Markets"}
                  </h3>
                </div>
              </div>

              {/* DECORATIVE FRAME */}

              <div className="pointer-events-none absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-[36px] border-2 border-[#D4AF37]/30" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ==========================================================
                        SKELETON
========================================================== */

function SectionSkeleton() {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      {/* LEFT SKELETON */}

      <div className="min-w-0 space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex min-w-0 animate-pulse gap-5 border-b border-slate-100 pb-6"
          >
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-200" />

            <div className="min-w-0 flex-1 space-y-3 pt-1">
              <div className="h-5 w-1/2 rounded bg-slate-200" />

              <div className="h-4 w-full rounded bg-slate-200" />

              <div className="h-4 w-2/3 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT SKELETON */}

      <div className="h-162.5 self-start animate-pulse rounded-[36px] bg-slate-200 lg:sticky lg:top-28" />
    </div>
  );
}
