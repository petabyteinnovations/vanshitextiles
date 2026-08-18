"use client";

import dynamic from "next/dynamic";

let Blogs = dynamic(() => import("./pages/web/(web)/Home/Blogs"), {
  ssr: false,
});

let CategoriesSection = dynamic(
  () => import("./pages/web/(web)/Home/CategoriesSection"),
  {
    ssr: false,
  },
);

let Contact = dynamic(() => import("./pages/web/(web)/Home/Contact"), {
  ssr: false,
});

let FabricMarquee = dynamic(
  () => import("./pages/web/(web)/Home/FabricMarquee"),
  {
    ssr: false,
  },
);

let FAQ = dynamic(() => import("./pages/web/(web)/Home/FAQ"), {
  ssr: false,
});

let FeaturedProducts = dynamic(
  () => import("./pages/web/(web)/Home/FeaturedProducts"),
  {
    ssr: false,
  },
);

let HomeBanner = dynamic(() => import("./pages/web/(web)/Home/HomeBanner"), {
  ssr: false,
});

let ManufacturingProcess = dynamic(
  () => import("./pages/web/(web)/Home/ManufacturingProcess"),
  {
    ssr: false,
  },
);

let Testimonials = dynamic(
  () => import("./pages/web/(web)/Home/Testimonials"),
  {
    ssr: false,
  },
);

let WhyChooseUs = dynamic(() => import("./pages/web/(web)/Home/WhyChooseUs"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="">
      <HomeBanner />
      <FabricMarquee />
      <CategoriesSection />
      <WhyChooseUs />
      <FeaturedProducts />
      <ManufacturingProcess />
      <Testimonials />
      <FAQ />
      <Blogs />
      <Contact />
    </div>
  );
}
