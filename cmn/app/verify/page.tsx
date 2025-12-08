"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifySubscription } from "../../components/Newsletter/verifyCode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");

  const handleVerify = async (e: any) => {
    e.preventDefault();

    try {
      await verifySubscription(email, code);
      toast.success("Subscription verified successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error: any) {
      toast.error(error.message || "Invalid verification code!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="w-full h-screen flex">
      <ToastContainer />

      {/* Left Column */}
      <div
        className="md:w-1/2 w-full h-full flex flex-col justify-start text-white p-8 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/admin/verify2.avif')",
        }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center md:text-left text-[#F272A8]">
          Verify Your Email
        </h2>
        <p className="mb-6 text-center md:text-left text-gray-800">
          Thank you for subscribing! Enter the verification code sent to your email.
        </p>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 w-full h-full flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8">
          <h3 className="text-2xl font-semibold text-black mb-6 text-center">
            Enter Verification Code
          </h3>

          <p className="text-gray-700 mb-2 text-center">
            A verification code has been sent to:
          </p>
          <p className="font-semibold text-black mb-6 text-center">{email}</p>

          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#F272A8] w-full"
              required
            />

            <button
              type="submit"
              className="bg-[#F272A8] text-white py-3 px-4 rounded font-semibold hover:bg-pink-500 transition"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
