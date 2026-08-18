"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/app/common/Logo";
import { apiurl } from "@/app/common/apiurl";
import { ToastError, ToastSuccess } from "@/app/common/ToastNotifications";
import { useRouter, useSearchParams } from "next/navigation";

export default function OTPVerification() {
  const router = useRouter();
  const params = useSearchParams();

  const Email = params.get("Email");

  const inputRef = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", ""]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  // ===========================
  // OTP INPUT CHANGE
  // ===========================

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto move next
    if (value && index < otp.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  // ===========================
  // BACKSPACE
  // ===========================

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  // ===========================
  // PASTE OTP
  // ===========================

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text").slice(0, otp.length);

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length - 1, otp.length - 1);

    inputRef.current[lastIndex]?.focus();
  };

  // ===========================
  // VERIFY OTP
  // ===========================

  const insertData = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 5) {
      ToastError("Please enter a valid OTP");
      return;
    }

    try {
      const res = await apiurl.post("/admin/verify-otp", {
        Email,
        Otp: finalOtp,
      });

      if (res.data.Status === 0) {
        ToastError(res.data.Message);
        return;
      }

      ToastSuccess(res.data.Message);

      // Save Tokens
      sessionStorage.setItem("csrfToken", res.data.Data.Csrftoken);

      localStorage.setItem("token", res.data.Data.Token);

      // Reset OTP
      setOtp(["", "", "", "", ""]);

      router.push(res.data.Redirect);
    } catch (err) {
      console.log(err);
      ToastError("Something went wrong");
    }
  };

  return (
    <section className="bg-slate-100 h-screen">
      <div className="h-full flex items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl">
          {/* Logo */}

          <div className="w-36 mx-auto">
            <Logo />
          </div>

          <h2 className="mt-6 text-center text-3xl font-bold text-[#0A2342]">
            OTP Verification
          </h2>

          <p className="mt-2 text-center text-gray-500">
            Enter the OTP sent to your email
          </p>

          <form className="mt-10 space-y-6" onSubmit={insertData}>
            {/* OTP */}

            <div className="flex justify-between gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  placeholder="X"
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  onPaste={handlePaste}
                  className="w-14 h-14 rounded-xl border border-gray-300 text-center text-2xl font-bold outline-none transition-all focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
                />
              ))}
            </div>


            {/* Button */}

            <button
              type="submit"
              className="h-14 w-full rounded-xl bg-[#0A2342] text-lg font-semibold text-white transition hover:bg-[#D4AF37] hover:text-[#0A2342]"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
