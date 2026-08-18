"use client";
import dynamic from "next/dynamic";

let PrivacyHero = dynamic(() => import("./PrivacyHero"), {
  ssr: false,
});

let PrivacyContent = dynamic(() => import("./PrivacyContent"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <PrivacyHero />
      <PrivacyContent />
    </div>
  );
}
