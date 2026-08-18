'use client'
import React from "react";
import dynamic from "next/dynamic";

let TermsBanner = dynamic(() => import("./TermsBanner"), {
  ssr: false,
});

let TermsContent = dynamic(() => import("./TermsContent"), {
  ssr: false,
});

export default function page() {
  return (
    <div>
      <TermsBanner />
      <TermsContent />
    </div>
  );
}
