"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { apiurl } from "@/app/common/apiurl";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setblogs] = useState([]);
  const [featuredBlog, setfeaturedBlog] = useState(null);
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

            // First blog as Featured Blog
            setfeaturedBlog(activeBlogs.length > 0 ? activeBlogs[0] : null);

            // Remaining blogs
            setblogs(activeBlogs.slice(1));
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

  return (
    <section className="bg-[#fafafa] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* ==========================================================
                    HEADING
                ========================================================== */}

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-medium leading-tight text-[#0A2342] sm:text-4xl lg:text-5xl">
            Latest Insights &amp;
            <span className="block">Industry Articles</span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-500 sm:mt-5 sm:text-base sm:leading-7">
            Explore manufacturing tips, textile trends and export guidance to
            help your business make informed sourcing decisions.
          </p>
        </div>

        {/* ==========================================================
                    FEATURED BLOG
                ========================================================== */}

        {featuredBlog && (
          <article className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm sm:mt-14">
            <div className="grid min-h-107.5 lg:grid-cols-2">
              {/* ==================================================
                                FEATURED IMAGE
                            ================================================== */}

              <div className="relative h-87.5 w-full lg:h-full lg:min-h-107.5">
                <Image
                  src={getImageUrl(featuredBlog.Blog_Image)}
                  alt={featuredBlog.Blog_Main_Heading || "Featured Blog"}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                {/* Featured Badge */}

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-semibold text-[#0A2342] shadow-md">
                    Featured Article
                  </span>
                </div>
              </div>

              {/* ==================================================
                                FEATURED CONTENT
                            ================================================== */}

              <div className="flex flex-col justify-center bg-[#FBF7ED] p-7 sm:p-10 lg:p-14">
                <span className="mb-5 w-fit rounded-full bg-[#0A2342] px-4 py-2 text-xs font-semibold text-white">
                  Textile & Manufacturing
                </span>

                <h3 className="font-serif text-2xl font-medium leading-snug text-[#0A2342] sm:text-3xl lg:text-4xl">
                  {featuredBlog.Blog_Main_Heading}
                </h3>

                <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                  {featuredBlog.Blog_Description}
                </p>

                <div className="mt-8">
                  <Link
                    href={`/pages/web/blogs/blog-detail?_id=${featuredBlog._id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0A2342] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#0A2342]"
                  >
                    Read Article
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ==========================================================
                    OTHER BLOGS
                ========================================================== */}

        {blogs.length > 0 && (
          <div className="mt-14 sm:mt-20">
            {/* Section Heading */}

            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[#D4AF37]">
                  More Insights
                </p>

                <h3 className="mt-2 font-serif text-2xl font-medium text-[#0A2342] sm:text-3xl">
                  More From Our Blog
                </h3>
              </div>

              <Link
                href="/pages/web/blogs"
                className="hidden items-center gap-2 text-sm font-semibold text-[#0A2342] transition hover:text-[#D4AF37] sm:inline-flex"
              >
                View All
                <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* ==================================================
                            BLOG CARDS
                        ================================================== */}

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/pages/web/blogs/blog-detail?_id=${blog._id}`}
                  className="group block"
                >
                  <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-xl">
                    {/* Blog Image */}

                    <div className="relative h-52 overflow-hidden sm:h-56">
                      <Image
                        src={getImageUrl(blog.Blog_Image)}
                        alt={blog.Blog_Main_Heading || "Blog"}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />

                      {/* Article Badge */}

                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-[#0A2342]/90 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
                          Article
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}

                    <div className="p-5 sm:p-6">
                      <h4 className="font-serif text-xl font-medium leading-snug text-[#0A2342] transition-colors duration-300 group-hover:text-[#D4AF37]">
                        {blog.Blog_Main_Heading}
                      </h4>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                        {blog.Blog_Description}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="text-xs font-medium text-gray-400">
                          Textile Insights
                        </span>

                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0A2342] transition group-hover:text-[#D4AF37]">
                          Read More
                          <ArrowUpRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                          />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================================
                    NO BLOGS
                ========================================================== */}

        {!featuredBlog && blogs.length === 0 && (
          <div className="mt-14 rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
            <h3 className="font-serif text-2xl text-[#0A2342]">
              No Articles Available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              New industry insights will be published soon.
            </p>
          </div>
        )}

        {/* ==========================================================
                    MOBILE VIEW ALL
                ========================================================== */}

        {blogs.length > 0 && (
          <div className="mt-8 flex justify-center sm:hidden">
            <Link
              href="/pages/web/blogs"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0A2342] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
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
