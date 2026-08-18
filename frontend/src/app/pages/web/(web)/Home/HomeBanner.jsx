"use client";

import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { apiurl } from "@/app/common/apiurl";
import { ToastError } from "@/app/common/ToastNotifications";

export default function HomeBanner() {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);

  const [bannerdata, setbannerdata] = useState([]);
  const [imgurl, setimgurl] = useState("");
  const [loading, setLoading] = useState(true);

  const viewdata = () => {
    try {
      setLoading(true);
      apiurl
        .get("/web/view-home-banner")
        .then((res) => {
          if (res.data.Status === 1) {
            // Only show banners the admin has marked Active — De-Active
            // banners shouldn't appear on the live site.
            const activeBanners = (res.data.Data.viewimages || []).filter(
              (item) => item.Banner_Status,
            );
            setbannerdata(activeBanners);
            setimgurl(res.data.Data.imageurl);
          } else {
            ToastError(res.data.Message);

            if (res.data.Redirect !== null) {
              window.location.href = res.data.Redirect;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    viewdata();
  }, []);

  // Nothing to show yet (still loading) — render a placeholder instead
  // of an empty Swiper.
  if (loading) {
    return (
      <section className="relative flex items-center justify-center overflow-hidden h-[70vh] sm:h-[80vh] lg:h-[calc(100vh-132px)] bg-[#0A2342]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#D4AF37] border-t-transparent" />
      </section>
    );
  }

  // No active banners at all — render nothing (or swap in a static
  // fallback hero here if you have one).
  if (!bannerdata.length) {
    return null;
  }

  return (
    <section className="relative overflow-hidden h-[70vh] sm:h-[80vh] lg:h-[calc(100vh-132px)]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        // loop only makes sense with 2+ slides — with exactly 1 slide,
        // Swiper's loop mode can misbehave or warn in the console.
        loop={bannerdata.length > 1}
        effect="fade"
        speed={1200}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          type: "fraction",
          el: paginationRef.current,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        // This is the key fix: string-based selectors ("hero-prev") are
        // unreliable in React because the buttons may not be attached
        // (or attached with stale refs) by the time Swiper initializes
        // navigation internally. onBeforeInit re-points Swiper's
        // navigation config at the actual ref'd DOM nodes right before
        // Swiper builds itself, which is the pattern Swiper's own React
        // docs recommend.
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.params.pagination.el = paginationRef.current;
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="h-full"
      >
        {bannerdata.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <Image
                src={`${imgurl}/${item.Banner_Image}`}
                alt={item.Banner_Main_Heading || "Hero banner"}
                fill
                priority
                className="object-cover"
                unoptimized
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-5 sm:px-8 lg:px-10">
                <div className="max-w-2xl text-white text-center lg:text-left">
                  {/* Subtitle */}
                  <p className="uppercase tracking-[2px] sm:tracking-[5px] lg:tracking-[8px] text-[#D4AF37] text-xs sm:text-sm mb-4 sm:mb-5">
                    {item.Banner_Tag}
                  </p>

                  {/* Heading */}
                  <h1 className="text-xl sm:text-3xl lg:text-5xl font-light leading-tight">
                    {item.Banner_Main_Heading}
                  </h1>

                  {/* Description */}
                  <p className="mt-5 sm:mt-8 text-sm sm:text-base lg:text-lg text-gray-200 leading-6 sm:leading-8 max-w-xl mx-auto lg:mx-0">
                    {item.Banner_Description}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mt-8 sm:mt-10">
                    {item.Banner_Primary_Btn_Text && (
                      <a
                        href={item.Banner_Primary_Btn_Link}
                        className="bg-[#D4AF37] text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 hover:bg-white transition duration-300 text-sm sm:text-base font-medium w-full sm:w-auto"
                      >
                        {item.Banner_Primary_Btn_Text}
                        <ArrowRight size={18} className="hidden sm:block" />
                      </a>
                    )}

                    {item.Banner_Secondary_Btn_Text && (
                      <a
                        href={item.Banner_Secondary_Btn_Link}
                        className="border border-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white hover:text-black transition duration-300 text-sm sm:text-base w-full sm:w-auto"
                      >
                        {item.Banner_Secondary_Btn_Text}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Only show nav arrows / pagination when there's more than one slide */}
      {bannerdata.length > 1 && (
        <>
          <button
            ref={prevRef}
            className="hero-prev hidden md:flex absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 lg:w-14 h-12 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            ref={nextRef}
            className="hero-next hidden md:flex absolute right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 lg:w-14 h-12 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 items-center justify-center"
          >
            <ChevronRight size={24} />
          </button>

          <div
            ref={paginationRef}
            className="hero-pagination absolute bottom-6 sm:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 text-white z-20 text-sm sm:text-base lg:text-lg font-semibold tracking-[4px]"
          />
        </>
      )}
    </section>
  );
}
