"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { subscribeUser } from "../Newsletter/subscribeUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubscribeForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const result = await subscribeUser(form);

      if (result.status === "pending") {
        toast.success("Verification code sent! Check your email.", {
          position: "top-right",
          autoClose: 3000,
        });

        router.push(`/verify?email=${encodeURIComponent(form.email)}`);
      }

      if (result.status === "verified") {
        toast.info("This email is already subscribed to our newsletter!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border p-2 w-full"
          required
        />

        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full mt-3"
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 w-full mt-3"
        />

        <button className="bg-blue-600 text-white py-2 px-4 mt-4 w-full rounded">
          Subscribe
        </button>
      </form>
    </div>
  );
}
