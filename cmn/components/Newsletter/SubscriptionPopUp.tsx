"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { subscribeUser } from "../Newsletter/subscribeUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SubscribeFormProps {
  initialEmail?: string;
}

export default function SubscribeForm({ initialEmail = "" }: SubscribeFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: initialEmail, // Initialize with the passed email
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update email if initialEmail changes
  useEffect(() => {
    if (initialEmail) {
      setForm((prev) => ({ ...prev, email: initialEmail }));
    }
  }, [initialEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const newErrors: Partial<typeof form> = {};
    if (!form.username.trim()) {
      newErrors.username = "Name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (form.phone && !/^[\d\s\-\+\(\)]+$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof form]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="relative bg-[#202020] text-white w-full max-w-md rounded-lg shadow-2xl border border-gray-700 mx-auto">
      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Subscribe to Newsletter</h2>
          <p className="text-sm text-gray-400 mt-1">
            Get the latest updates from CMN Distributors
          </p>
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-300">
            Full Name *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleInputChange}
            className={`w-full px-4 py-2.5 bg-transparent border rounded-md text-white
              ${errors.username ? "border-red-500" : "border-gray-600"} 
              focus:border-[#F272A8] focus:outline-none focus:ring-1 focus:ring-[#F272A8]`}
            placeholder="Enter your full name"
            autoFocus
          />
          {errors.username && (
            <p className="text-sm text-red-400">{errors.username}</p>
          )}
        </div>

        {/* Email Field - AUTO-FILLED */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-2.5 bg-transparent border rounded-md text-white
              ${errors.email ? "border-red-500" : "border-gray-600"} 
              focus:border-[#F272A8] focus:outline-none focus:ring-1 focus:ring-[#F272A8]`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Phone Field (Optional) */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
            Phone Number <span className="text-gray-500">(Optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-2.5 bg-transparent border rounded-md text-white
              ${errors.phone ? "border-red-500" : "border-gray-600"} 
              focus:border-[#F272A8] focus:outline-none focus:ring-1 focus:ring-[#F272A8]`}
            placeholder="+94 123 456 789"
          />
          {errors.phone && (
            <p className="text-sm text-red-400">{errors.phone}</p>
          )}
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-gray-400 pt-2">
          By subscribing, you agree to receive newsletters and marketing communications from CMN Distributors.
          You can unsubscribe at any time.
        </p>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#F272A8] text-white py-3 rounded-md font-semibold
              hover:bg-[#d6488d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : (
              "Subscribe Now"
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}