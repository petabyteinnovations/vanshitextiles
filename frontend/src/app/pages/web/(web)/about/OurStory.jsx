"use client";

import { apiurl } from "@/app/common/apiurl";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function OurStory() {
  const [bannerdata, setbannerdata] = useState({});
  const [imgurl, setimgurl] = useState("");

  const viewdata = async () => {
    try {
      const res = await apiurl.get("/web/view-about-description");

      setbannerdata(res.data?.Data?.viewimages?.[0] || {});
      setimgurl(res.data?.Data?.imageurl || "");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    viewdata();
  }, []);

  const words = bannerdata?.About_Description_Heading?.split(" ") || [];

  const firstHalf = words.slice(0, Math.ceil(words.length / 2)).join(" ");

  const secondHalf = words.slice(Math.ceil(words.length / 2)).join(" ");

  const image =
    bannerdata?.About_Description_Image && imgurl
      ? `${imgurl}/${bannerdata.About_Description_Image}`
      : "";

  return (
    <section className="relative overflow-x-clip bg-white py-20 lg:py-28">
      {/* Background Glow */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-52 top-0 h-105 w-105 rounded-full bg-[#D4AF37]/10 blur-[140px]" />

        <div className="absolute -right-52 bottom-0 h-105 w-105 rounded-full bg-[#0A2342]/5 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-20">
          {/* =====================================================
                            IMAGE
          ===================================================== */}

          <div className="relative self-start lg:sticky lg:top-28 lg:h-fit">
            <div className="group relative overflow-hidden rounded-[28px] border border-[#0A2342]/10 bg-gray-100 shadow-[0_25px_60px_rgba(15,23,42,.10)]">
              {image && (
                <Image
                  src={image}
                  width={1200}
                  height={1200}
                  alt={bannerdata?.About_Description_Heading || "Our Story"}
                  className="
                    block
                    h-auto
                    w-full
                    object-contain
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                  unoptimized
                />
              )}

              {/* Overlay */}

              <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#0A2342]/80 via-[#0A2342]/20 to-transparent" />
            </div>

            {/* Gold Frame */}

            <div className="pointer-events-none absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-4xl border-2 border-[#D4AF37]/30" />
          </div>

          {/* =====================================================
                            CONTENT
          ===================================================== */}

          <div className="pt-2 lg:pt-10">
            {/* Subtitle */}

            <span className="text-xs font-bold uppercase tracking-[3px] text-[#D4AF37]">
              About Us
            </span>

            {/* Heading */}

            <h2 className="mt-4 text-3xl leading-tight text-[#0A2342] sm:text-4xl lg:text-5xl">
              {firstHalf}

              <span className="font-bold text-[#D4AF37]"> {secondHalf}</span>
            </h2>

            {/* Description */}

            <p className="mt-6 whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-[15px] sm:leading-8">
              {bannerdata?.About_Description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
