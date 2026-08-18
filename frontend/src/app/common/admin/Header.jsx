"use client";
import { Bell, ChevronDown, LogOut, Menu, Moon, Settings } from "lucide-react";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="h-19.5 px-6 flex items-center justify-between">
        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition hover:bg-gray-100"
          >
            <Menu size={22} className="text-[#0A2342]" />
          </button>

          <div className="hidden lg:block">
            <h2 className="text-xl font-bold text-[#0A2342]">Dashboard</h2>
            <p className="text-sm text-gray-500">Welcome back, Administrator</p>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-3">
          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition hover:bg-gray-100">
            <Bell size={20} className="text-[#0A2342]" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>

          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition hover:bg-gray-100">
            <Moon size={20} className="text-[#0A2342]" />
          </button>

          <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition hover:bg-gray-100">
            <Settings size={20} className="text-[#0A2342]" />
          </button>

          <div className="relative group">
            <button className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 transition hover:bg-gray-50">
              <div className="hidden xl:block text-left">
                <h3 className="text-sm font-semibold text-[#0A2342]">
                  Vanshi Textiles
                </h3>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <ChevronDown
                size={18}
                className="text-gray-500 hidden xl:block"
              />
            </button>

            <div className="invisible absolute right-0 top-16 w-64 rounded-2xl border border-gray-200 bg-white opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
              <div className="border-b p-5">
                <h3 className="font-semibold text-[#0A2342]">
                  Vanshi Textiles
                </h3>
                <p className="text-sm text-gray-500">admin@vanshitextile.com</p>
              </div>

              <div className="p-2">
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
