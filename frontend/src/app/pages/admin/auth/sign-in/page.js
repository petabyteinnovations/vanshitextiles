"use client";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Logo from "@/app/common/Logo";
import { apiurl } from "@/app/common/apiurl";
import { ToastError, ToastSuccess } from "@/app/common/ToastNotifications";
import { useRouter } from "next/navigation";

export default function page() {
  let router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [inputfield, setinputfield] = useState({
    Email: "",
    Password: "",
  });

  let insertdata = (e) => {
    e.preventDefault();
    apiurl
      .post("/admin/sign-in", inputfield)
      .then((res) => {
        if (res.data.Status === 0) {
          ToastError(res.data.Message);
        } else {
          ToastSuccess(res.data.Message);
          if (res.data.Redirect !== null) {
            router.push(`${res.data.Redirect}?Email=${inputfield.Email}`);
          } else {
            return;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className="bg-slate-100 h-screen overflow-y-scroll">
      <div className="h-full">
        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center h-full px-6 md:px-10">
          <div className="w-full  max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">
            {/* Logo */}
            <div className="w-35 m-auto">
              <Logo />
            </div>

            <h2 className="mt-6 text-center text-3xl font-bold text-[#0A2342]">
              Admin Login
            </h2>

            <p className="mt-2 text-center text-gray-500">
              Sign in to access your dashboard
            </p>

            {/* FORM */}

            <form className="mt-10 space-y-6" onSubmit={insertdata}>
              {/* Email */}

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <input
                    type="email"
                    placeholder="admin@example.com"
                    className="h-14 w-full rounded-xl border border-gray-300 pl-12 pr-4 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    onChange={(e) =>
                      setinputfield({ ...inputfield, Email: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div>
                <label className="mb-2 block font-medium text-gray-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-14 w-full rounded-xl border border-gray-300 pl-12 pr-14 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                    onChange={(e) =>
                      setinputfield({ ...inputfield, Password: e.target.value })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* LOGIN */}

              <button className="h-14 w-full rounded-xl bg-[#0A2342] text-lg font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342]">
                Secure Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
