"use client";
import { apiurl } from "@/app/common/apiurl";
import { Target, Eye } from "lucide-react";
import { useEffect, useState } from "react";

export default function MissionVision() {
  let [ourmission, setourmission] = useState([]);
  let [ourvision, setourvision] = useState([]);

  let fetchalldata = async () => {
    let [ourmissiondata, ourvisiondata] = await Promise.all([
      apiurl.get("/web/view-about-our-mission"),
      apiurl.get("/web/view-about-our-vision"),
    ]);

    return {
      ourmissionobj: ourmissiondata.data.Data?.viewimages,
      ourvisionobj: ourvisiondata.data.Data?.viewimages,
    };
  };

  let viewdata = () => {
    try {
      fetchalldata().then((res) => {
        setourmission(res.ourmissionobj[0]);
        setourvision(res.ourvisionobj[0]);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    viewdata();
  }, []);

  return (
    <>
      {Array?.isArray(ourmission) ||
      Array?.isArray(ourvision) ||
      ourmission.length === 0 ||
      ourmission.length === 0 ? null : (
        <section className="relative overflow-x-clip bg-[#FAF9F5] py-16 sm:py-24 lg:py-32">
          {/* Background */}

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 top-0 h-105 w-105 rounded-full bg-[#D4AF37]/10 blur-[140px]" />

            <div className="absolute -right-40 bottom-0 h-105 w-105 rounded-full bg-[#0A2342]/5 blur-[140px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-5">
            {/* Heading */}

            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-[3px] text-[#D4AF37]">
                Mission & Vision
              </span>

              <h2 className="mt-4 text-3xl font-light leading-tight text-[#0A2342] sm:text-4xl lg:text-5xl">
                Driven by Quality. Inspired by Innovation.
              </h2>

              <p className="mx-auto mt-6 text-base leading-8 text-gray-600 sm:text-lg">
                At Vanshi Tex, our commitment goes beyond manufacturing premium
                textile products. We strive to build long-term partnerships
                through innovation, uncompromising quality, sustainable
                practices, and customer-focused solutions.
              </p>
            </div>

            {/* Mission Vision Cards */}

            <div className="mt-10 grid gap-8 sm:mt-16 lg:grid-cols-2">
              {/* ================= MISSION ================= */}

              <div className="group rounded-[28px] border border-gray-100 bg-white p-6 shadow-[0_15px_45px_rgba(15,23,42,.06)] transition-all duration-300 hover:-translate-y-1 sm:p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37]/10">
                  <Target size={26} className="text-[#D4AF37]" />
                </div>

                <span className="mt-7 block text-xs font-bold uppercase tracking-[3px] text-[#D4AF37]">
                  Our Mission
                </span>

                <h3 className="mt-3 text-2xl font-bold text-[#0A2342]">
                  {ourmission.About_Our_Mission_Heading}
                </h3>

                <p className="mt-4 text-[15px] leading-8 text-gray-600">
                  {ourmission.About_Our_Mission_Description}
                </p>
              </div>

              {/* ================= VISION ================= */}

              <div className="rounded-[28px] bg-[#0A2342] p-6 shadow-[0_20px_55px_rgba(10,35,66,.20)] transition-all duration-300 hover:-translate-y-1 sm:p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                  <Eye size={26} className="text-[#D4AF37]" />
                </div>

                <span className="mt-7 block text-xs font-bold uppercase tracking-[3px] text-[#D4AF37]">
                  Our Vision
                </span>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  {ourvision?.About_Our_Vision_Heading}
                </h3>

                <p className="mt-4 text-[15px] leading-8 text-white/70">
                  {ourvision?.About_Our_Vision_Description}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
