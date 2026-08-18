"use client";

import Header from "@/app/common/admin/Header";
import Sidebar from "@/app/common/admin/Sidebar";
import { useState } from "react";

export default function layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "lg:ml-72" : "lg:ml-20"
        }`}
      >
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
