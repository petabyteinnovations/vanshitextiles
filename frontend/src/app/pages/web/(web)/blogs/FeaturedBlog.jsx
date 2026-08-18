"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { useEffect, useState } from "react";

export default function FeaturedBlog() {
  const [blogs, setblogs] = useState([]);
  const [activeSlug, setActiveSlug] = useState(0);
  const [imgurl, setimgurl] = useState("");

  // ==========================================================
  // FETCH BLOGS
  // ==========================================================

  const viewdata = () => {
    try {
      apiurl
        .get("/web/view-blogs")
        .then((res) => {
          if (res.data.Status === 1) {
            const data = res.data.Data.viewimages || [];

            const imageurl = res.data.Data.imageurl || "";

            setimgurl(imageurl);

            // Only Active Blogs
            const activeBlogs = data.filter(
              (blog) =>
                blog.Blog_Status === true || blog.Blog_Status === "true",
            );

            setblogs(activeBlogs);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    viewdata();
  }, []);

  // ==========================================================
  // IMAGE URL
  // ==========================================================

  const getImageUrl = (image) => {
    if (!image) {
      return "/images/blog-placeholder.jpg";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${imgurl.replace(/\/$/, "")}/${image.replace(/^\//, "")}`;
  };

  // ==========================================================
  // ACTIVE BLOG
  // ==========================================================

  const activeBlog = blogs[activeSlug] || blogs[0];

  return (
    <section className="relative bg-white py-20 text-[#0A2342] lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ==========================================================
                            HEADING
        ========================================================== */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full px-5 py-2">
            <span className="text-xs font-semibold uppercase tracking-[3px] text-[#D4AF37]">
              Featured Articles
            </span>
          </div>

          <h2 className="mt-8 font-serif text-4xl leading-tight text-[#0A2342] sm:text-5xl lg:text-6xl">
            Latest Industry Insights
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#0A2342]/70">
            Explore expert perspectives, textile innovations, export trends,
            manufacturing techniques, and business strategies shaping the future
            of the textile industry.
          </p>
        </div>

        {/* ==========================================================
                            NO BLOGS
        ========================================================== */}

        {!activeBlog && (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center">
            <h3 className="font-serif text-2xl text-[#0A2342]">
              No Articles Available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              New industry insights will be published soon.
            </p>
          </div>
        )}

        {/* ==========================================================
                            DESKTOP BLOG CONTENT
        ========================================================== */}

        {activeBlog && (
          <>
            {/* ==========================================================
                                DESKTOP
            ========================================================== */}

            <div className="hidden gap-6 lg:grid lg:grid-cols-[380px_1fr] lg:gap-8">
              {/* ==========================================================
                                ARTICLE CARDS — LEFT
              ========================================================== */}

              <div className="flex flex-col gap-4">
                {blogs.map((blog, index) => {
                  const isActive = index === activeSlug;

                  return (
                    <button
                      key={blog._id || index}
                      type="button"
                      onClick={() => setActiveSlug(index)}
                      className={`group flex w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                        isActive
                          ? "border-[#D4AF37]/50 bg-[#0A2342] shadow-lg"
                          : "border-[#0A2342]/10 bg-white hover:border-[#D4AF37]/30 hover:shadow-md"
                      }`}
                    >
                      {/* Blog Image */}

                      <div className="relative h-36 w-full overflow-hidden">
                        <Image
                          src={getImageUrl(blog.Blog_Image)}
                          alt={blog.Blog_Main_Heading || "Blog"}
                          fill
                          unoptimized
                          sizes="380px"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-[#0A2342]/50 via-transparent to-transparent" />

                        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-[#0A2342]">
                          Article
                        </span>
                      </div>

                      {/* Blog Content */}

                      <div className="p-5">
                        <p
                          className={`text-base font-semibold leading-snug transition-colors duration-300 ${
                            isActive ? "text-white" : "text-[#0A2342]"
                          }`}
                        >
                          {blog.Blog_Main_Heading}
                        </p>

                        <p
                          className={`mt-3 line-clamp-3 text-sm leading-6 ${
                            isActive ? "text-white/60" : "text-[#0A2342]/50"
                          }`}
                        >
                          {blog.Blog_Description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* ==========================================================
                                DETAIL PANEL — RIGHT
              ========================================================== */}

              <div className="overflow-hidden rounded-[30px] bg-white">
                {/* Image */}

                <div className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-96">
                  <Image
                    key={activeBlog.Blog_Image}
                    src={getImageUrl(activeBlog.Blog_Image)}
                    alt={activeBlog.Blog_Main_Heading || "Blog"}
                    fill
                    unoptimized
                    sizes="70vw"
                    className="object-cover transition duration-700"
                  />
                </div>

                {/* Body */}

                <div className="py-8 sm:py-10 lg:py-12">
                  {/* Category */}

                  <span className="inline-block rounded-full bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[1px] text-[#D4AF37]">
                    Textile &amp; Manufacturing
                  </span>

                  {/* Title */}

                  <h3 className="mt-5 font-serif text-2xl leading-tight text-[#0A2342] sm:text-3xl lg:text-4xl">
                    {activeBlog.Blog_Main_Heading}
                  </h3>

                  {/* Description */}

                  <div className="mt-5 border-b border-[#0A2342]/10 pb-8">
                    <p className=" line-clamp-6 leading-8 text-[#0A2342]/70 whitespace-pre-line">
                      {activeBlog.Blog_Description}
                    </p>
                  </div>

                  {/* Full Article */}

                  <div className="mt-8">
                    <Link
                      href={`/pages/web/blogs/blog-detail?_id=${activeBlog._id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0A2342] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342]"
                    >
                      Full Article
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ==========================================================
                                MOBILE / TABLET
            ========================================================== */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group overflow-hidden rounded-3xl border border-[#0A2342]/10 bg-white shadow-[0_10px_40px_rgba(10,35,66,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_50px_rgba(10,35,66,0.10)]"
                >
                  {/* ==========================================================
                                        IMAGE
                  ========================================================== */}

                  <div className="relative h-56 w-full overflow-hidden sm:h-52">
                    <Image
                      src={getImageUrl(blog.Blog_Image)}
                      alt={blog.Blog_Main_Heading || "Blog"}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    {/* Image Overlay */}

                    <div className="absolute inset-0 bg-linear-to-t from-[#0A2342]/70 via-[#0A2342]/10 to-transparent" />

                    {/* Category */}

                    <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-[10px] font-semibold uppercase tracking-[2px] text-[#0A2342] shadow-sm">
                      Article
                    </span>
                  </div>

                  {/* ==========================================================
                                        CONTENT
                  ========================================================== */}

                  <div className="p-6">
                    {/* Small Label */}

                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-px w-7 bg-[#D4AF37]" />

                      <span className="text-[10px] font-semibold uppercase tracking-[2px] text-[#D4AF37]">
                        Featured
                      </span>
                    </div>

                    {/* Title */}

                    <h3 className="font-serif text-2xl leading-tight text-[#0A2342] sm:text-xl">
                      {blog.Blog_Main_Heading}
                    </h3>

                    {/* Description */}

                    <p className="mt-4 line-clamp-3  text-sm leading-7 text-[#0A2342]/65">
                      {blog.Blog_Description}
                    </p>

                    {/* Divider */}

                    <div className="my-5 h-px w-full bg-[#0A2342]/10" />

                    {/* Full Article Button */}

                    <Link
                      href={`/pages/web/blogs/blog-detail?_id=${blog._id}`}
                      className="group/button flex w-full items-center justify-between rounded-xl bg-[#0A2342] px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342]"
                    >
                      <span>Full Article</span>

                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover/button:bg-[#0A2342]/10">
                        <ArrowUpRight
                          size={17}
                          className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                        />
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* ==========================================================
                            MOBILE VIEW ALL
        ========================================================== */}

        {blogs.length > 0 && (
          <div className="mt-10 flex justify-center lg:hidden">
            <Link
              href="/pages/web/blogs"
              className="inline-flex items-center gap-2 rounded-xl border border-[#0A2342]/15 bg-white px-6 py-3 text-sm font-semibold text-[#0A2342] transition-all duration-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A2342]"
            >
              View All Articles
              <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
