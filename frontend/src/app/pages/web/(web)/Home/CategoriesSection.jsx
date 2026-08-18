"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categories = [
  {
    id: 1,
    title: "Cotton Fabrics",
    subtitle: "Premium Collection",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
    href: "/categories/cotton",
  },
  {
    id: 2,
    title: "Linen Fabrics",
    subtitle: "Luxury Collection",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80",
    href: "/categories/linen",
  },
  {
    id: 3,
    title: "Silk Fabrics",
    subtitle: "Elegant Collection",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80",
    href: "/categories/silk",
  },
  {
    id: 4,
    title: "Denim",
    subtitle: "Modern Collection",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80",
    href: "/categories/denim",
  },
  {
    id: 5,
    title: "Printed Fabrics",
    subtitle: "Designer Prints",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    href: "/categories/printed",
  },
  {
    id: 6,
    title: "Rayon Fabrics",
    subtitle: "Comfort Collection",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80",
    href: "/categories/rayon",
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-[#fafafa] py-16 lg:py-24 overflow-hidden ">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}

        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[#D4AF37] uppercase tracking-[4px] text-sm font-semibold">
              Our Categories
            </span>

            <h2 className="mt-3 text-3xl md:text-5xl font-light text-[#0A2342]">
              Explore Our Collections
            </h2>

            <p className="mt-5 max-w-2xl text-gray-600 leading-8">
              Discover premium fabrics crafted for fashion brands,
              wholesalers, retailers, and manufacturers.
            </p>
          </div>

          {/* Custom Navigation */}

          <div className="hidden md:flex gap-3">
            <button className="category-prev w-12 h-12 rounded-full border border-gray-300 bg-white hover:bg-[#0A2342] hover:text-white transition flex items-center justify-center shadow-sm">
              <ChevronLeft size={20} />
            </button>

            <button className="category-next w-12 h-12 rounded-full border border-gray-300 bg-white hover:bg-[#0A2342] hover:text-white transition flex items-center justify-center shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          spaceBetween={25}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".category-prev",
            nextEl: ".category-next",
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.15,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
          }}
          className="pb-14!"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link
                href={category.href}
                className="group block overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}

                <div className="relative h-105 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent opacity-80" />

                  {/* Badge */}

                  <span className="absolute top-5 left-5 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#0A2342]">
                    {category.subtitle}
                  </span>

                  {/* Content */}

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold text-white">
                          {category.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-200">
                          View Collection
                        </p>
                      </div>

                      <div className="w-12 h-12 rounded-full bg-white text-[#0A2342] flex items-center justify-center transition-all duration-500 group-hover:bg-[#D4AF37] group-hover:rotate-45 group-hover:scale-110">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}

        <div className="mt-5 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-3 rounded-full bg-[#0A2342] px-8 py-4 text-white font-medium transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
          >
            View All Categories
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}