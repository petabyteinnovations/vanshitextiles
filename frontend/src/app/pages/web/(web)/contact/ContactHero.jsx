"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { apiurl } from "@/app/common/apiurl";

export default function BlogHero() {
  let [bannerdata, setbannerdata] = useState([]);
  let [imgurl, setimgurl] = useState("");

  let viewdata = () => {
    apiurl
      .get("/web/view-contacts-banner")
      .then((res) => {
        setbannerdata(res.data?.Data?.viewimages[0]);
        setimgurl(res.data?.Data?.imageurl);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    viewdata();
  }, []);

  let words = bannerdata?.Contact_Banner_Heading?.split(" ") || [];
  let firstHalf = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  let secondHalf = words.slice(Math.ceil(words.length / 2)).join(" ");

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-28 sm:min-h-[75vh] lg:min-h-[80vh]">
      <Image
        src={`${imgurl}/${bannerdata?.Contact_Banner_Image}`}
        alt="Textile Industry Blog"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-linear-to-t from-[#081C34]/95 via-[#081C34]/75 to-[#081C34]/45" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center sm:px-6">
        <div className="mb-8 flex items-center justify-center gap-2 text-sm text-white/60">
          <Link
            href="/"
            className="transition duration-300 hover:text-[#D4AF37]"
          >
            Home
          </Link>

          <ChevronRight size={14} />

          <span className="text-[#D4AF37]">Contact</span>
        </div>

        <h1 className="mt-8 text-4xl font-light leading-tight text-white sm:text-5xl lg:text-7xl">
          {firstHalf}

          <span className="mt-3 block font-bold text-[#D4AF37]">
            {secondHalf}
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/75 sm:text-lg sm:leading-9 whitespace-pre-line">
          {bannerdata?.Contact_Banner_Description}
        </p>
      </div>
    </section>
  );
}
