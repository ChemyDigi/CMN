"use client";

import { useState, useEffect, FormEvent } from "react";
import { X } from "lucide-react";

interface SubscriptionFormData {
  username: string;
  email: string;
  phone: string;
}

interface SubscriptionPopupProps {
  initialEmail: string;
  onClose: () => void;
  onSubmit: (data: SubscriptionFormData) => Promise<void>;
}

export default function SubscriptionPopup({
  initialEmail,
  onClose,
  onSubmit,
}: SubscriptionPopupProps) {
  const [formData, setFormData] = useState<SubscriptionFormData>({
    username: "",
    email: initialEmail || "",
    phone: "",
  });

  const [errors, setErrors] = useState<Partial<SubscriptionFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof SubscriptionFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<SubscriptionFormData> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Success would be handled by parent component (show success message, close popup, etc.)
    } catch (error) {
      console.error("Subscription failed:", error);
      // You could show an error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="relative bg-[#202020] text-white w-full max-w-md rounded-lg shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Complete Your Subscription</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded-md transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Full Name *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
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

          {/* Email Field (pre-filled) */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
              value={formData.phone}
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
                "Complete Subscription"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}