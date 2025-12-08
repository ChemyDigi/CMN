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
    <div className="p-6 max-w-md mx-auto">
      <ToastContainer />

      <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
      <p className="mb-4">A verification code has been sent to:</p>
      <p className="font-semibold mb-6">{email}</p>

      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <button className="bg-green-600 text-white py-2 px-4 mt-4 w-full rounded">
          Verify
        </button>
      </form>
    </div>
  );
}
