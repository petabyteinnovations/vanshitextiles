"use client";
import React from "react";
import Header from "./common/web/Header";
import MobileOptions from "./common/web/MobileOptions";
import Footer from "./common/web/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function MainPage({ children }) {
  let pathname = usePathname();
  let isadmin = pathname.includes("/pages/admin");
  return (
    <div>
      {isadmin ? null : <Header />}
      {isadmin ? null : <MobileOptions />}
      {children}
      {isadmin ? null : <Footer />}
      <Toaster />
    </div>
  );
}
