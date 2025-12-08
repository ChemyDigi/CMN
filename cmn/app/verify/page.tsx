"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifySubscription } from "../../components/Newsletter/verifyCode";
import { db } from "../../lib/firebase";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isVerified, setIsVerified] = useState(false); // track verification success

  // Handle verification
  const handleVerify = async (e: any) => {
    e.preventDefault();
    try {
      await verifySubscription(email, code);
      toast.success("Subscription verified successfully!", { position: "top-right", autoClose: 3000 });
      setIsVerified(true); // show success UI
    } catch (error: any) {
      toast.error(error.message || "Invalid verification code!", { position: "top-right", autoClose: 3000 });
    }
  };

  // Handle resend code
const handleResend = async () => {
  if (resendCooldown > 0) return; // extra safety
  setResendCooldown(60); // disable button immediately for 60s

  try {
    const userRef = doc(db, "subscribers", email);
    const snapshot = await getDoc(userRef);
    if (!snapshot.exists()) throw new Error("User not found.");

    const data = snapshot.data();
    const username = data.username || "Subscriber";

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();

    await updateDoc(userRef, {
      verificationCode: newCode,
      verified: false,
      verifiedAt: null,
    });

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SUBSCRIBE_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_SUBSCRIBE_TEMPLATE_ID!,
      {
        to_name: username,
        verification_code: newCode,
        to_email: email,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    toast.success("Verification code resent!", { position: "top-right", autoClose: 3000 });
  } catch (error: any) {
    console.error(error);
    toast.error(error.message || "Failed to resend code!", { position: "top-right", autoClose: 3000 });
    setResendCooldown(0); // re-enable button immediately if sending failed
  }
};


  // Countdown for resend button
  useEffect(() => {
    if (resendCooldown === 0) return;
    const timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  return (
    <div className="w-full h-screen flex">
      <ToastContainer />

      {/* Left Column */}
      <div
        className="md:w-1/2 w-full h-full flex flex-col justify-start text-white p-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/admin/verify2.avif')" }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center md:text-left text-black">
          Verify Your Email
        </h2>
        <p className="mb- text-center md:text-left text-gray-800">
          Thank you for subscribing! Enter the verification code sent to your email.
        </p>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 w-full h-full flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 text-center">
          {!isVerified ? (
            <>
              <h3 className="text-2xl font-semibold text-black mb-6">
                Enter Verification Code
              </h3>

              <p className="text-gray-700 mb-2">A verification code has been sent to:</p>
              <p className="font-semibold text-black mb-6">{email}</p>

              <form onSubmit={handleVerify} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="border border-gray-300 p-3  text-black rounded focus:outline-none focus:ring-2 focus:ring-[#F272A8] w-full"
                  required
                />

                <button
                  type="submit"
                  className="bg-[#F272A8] text-white py-3 px-4 rounded font-semibold hover:bg-pink-500 transition"
                >
                  Verify
                </button>
              </form>

              <div className="mt-4">
                <button
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className={`text-[#F272A8] font-semibold ${resendCooldown > 0 ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
                >
                  {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend Code"}
                </button>
              </div>
            </>
          ) : (
            // Success message UI
            <div className="flex flex-col items-center">
              <img
                src="/images/admin/verified.png"
                alt="Subscription Successful"
                className="w-40 h-40 mb-6"
              />
              <h3 className="text-2xl font-semibold text-black mb-4">
                Thank you for subscribing!
              </h3>
              <p className="text-gray-700 mb-6">Your subscription was successful.</p>
              <button
                onClick={() => router.push("/home")}
                className="bg-[#F272A8] text-white py-3 px-6 rounded font-semibold hover:bg-pink-500 transition"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
