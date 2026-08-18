"use client";
import React from "react";
import dynamic from "next/dynamic";

let BlogHero = dynamic(() => import("./BlogHero"), {
  ssr: false,
});

let FeaturedBlog = dynamic(() => import("./FeaturedBlog"), {
  ssr: false,
});

export default function page() {
  return (
    <div>
      <BlogHero />
      <FeaturedBlog />
    </div>
  );
}
