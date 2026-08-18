"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ArrowUpRight, ChevronLeft, ChevronRight, Heart } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ============================================
   Products
============================================ */

const products = [
  {
    id: 1,
    title: "Premium Cotton Twill",
    subtitle: "Export Quality",
    category: "Cotton",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
    href: "/products/cotton-twill",
  },

  {
    id: 2,
    title: "Luxury Linen",
    subtitle: "European Collection",
    category: "Linen",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80",
    href: "/products/linen",
  },

  {
    id: 3,
    title: "Royal Silk",
    subtitle: "Premium Collection",
    category: "Silk",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=80",
    href: "/products/silk",
  },

  {
    id: 4,
    title: "Premium Denim",
    subtitle: "Modern Collection",
    category: "Denim",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80",
    href: "/products/denim",
  },

  {
    id: 5,
    title: "Printed Rayon",
    subtitle: "Designer Prints",
    category: "Rayon",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    href: "/products/rayon",
  },

  {
    id: 6,
    title: "Designer Prints",
    subtitle: "Latest Collection",
    category: "Printed",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80",
    href: "/products/printed",
  },

  {
    id: 7,
    title: "Organic Cotton",
    subtitle: "Eco Collection",
    category: "Cotton",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
    href: "/products/organic-cotton",
  },

  {
    id: 8,
    title: "Luxury Linen Blend",
    subtitle: "Premium Blend",
    category: "Linen",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80",
    href: "/products/linen-blend",
  },
];

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products;

    return products.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="bg-[#fafafa] py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}

        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[#D4AF37] uppercase tracking-[4px] text-sm font-semibold">
              Featured Products
            </span>

            <h2 className="mt-3 text-3xl md:text-5xl font-light text-[#0A2342]">
              Explore Our Products
            </h2>

            <p className="mt-5 max-w-2xl text-gray-600 leading-8">
              Explore premium fabrics crafted for fashion brands, exporters,
              wholesalers and garment manufacturers.
            </p>
          </div>

          {/* Navigation */}

          <div className="hidden md:flex gap-3">
            <button className="product-prev w-12 h-12 rounded-full border border-gray-300 bg-white hover:bg-[#0A2342] hover:text-white transition flex items-center justify-center shadow-sm">
              <ChevronLeft size={20} />
            </button>

            <button className="product-next w-12 h-12 rounded-full border border-gray-300 bg-white hover:bg-[#0A2342] hover:text-white transition flex items-center justify-center shadow-sm">
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
            prevEl: ".product-prev",
            nextEl: ".product-next",
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
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
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <Link
                href={product.href}
                className="group block rounded-4xl bg-white p-4 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-lg"
              >
                {/* Image */}

                <div className="relative overflow-hidden rounded-[26px] bg-[#F8F8F8]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="h-75 w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  {/* Badge */}

                  <span className="absolute left-4 top-4 rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-semibold text-[#0A2342]">
                    {product.subtitle}
                  </span>

                  {/* Wishlist */}

                  <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#0A2342] backdrop-blur">
                    <Heart />
                  </button>
                </div>

                {/* Content */}

                <div className="mt-6">
                  <p className="text-sm uppercase tracking-[3px] text-[#D4AF37]">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-[#0A2342]">
                    {product.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 line-clamp-2">
                    Premium export-quality fabric manufactured for wholesalers,
                    garment industries and apparel brands.
                  </p>

                  <div className="mt-6 flex items-center flex-col justify-between">
                    <button className="w-full rounded-full bg-[#0A2342] px-7 py-3 font-medium text-white transition-all duration-300 ">
                      Add to cart
                    </button>

                    <button className="w-full mt-3 rounded-full bg-[#D4AF37] px-7 py-3 font-medium text-white transition-all duration-300 ">
                      Get Quote
                    </button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA */}

        <div className="mt-5 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 rounded-full bg-[#0A2342] px-8 py-4 text-white font-medium transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
          >
            View All Products
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
