"use client";
import React from "react";
import dynamic from "next/dynamic";

let Contact = dynamic(() => import("../Home/Contact"), {
  ssr: false,
});

let ContactHero = dynamic(() => import("./ContactHero"), {
  ssr: false,
});

export default function page() {
  return (
    <>
      <ContactHero />
      <Contact />
    </>
  );
}
