"use client";

import React, { useState, useEffect } from "react";
import { 
  FaPaperPlane, 
  FaCheck, 
  FaTimes, 
  FaUsers,
  FaEnvelope,
  FaUser,
  FaTrash,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import emailjs from '@emailjs/browser';

type Subscriber = {
  id: string;
  username: string;
  email: string;
  phone: string;
  subscribedAt: any;
  verified: boolean;
  verifiedAt?: any;
  source: string;
  active: boolean;
};

export default function SendNewsletterEmails() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  // Form state
  const [emailData, setEmailData] = useState({
    subject: "",
    body: "",
    replyTo: "",
    includeUnsubscribe: true,
  });

  // EmailJS configuration (you need to get these from EmailJS dashboard)
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "your_service_id";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id";
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key";

  // Fetch verified subscribers
  const fetchVerifiedSubscribers = async () => {
    setLoading(true);
    try {
      const subscribersRef = collection(db, "newsletterSubscribers");
      const q = query(
        subscribersRef,
        where("verified", "==", true),
        where("active", "==", true),
        orderBy("subscribedAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const subscribersData: Subscriber[] = [];
      
      querySnapshot.forEach((docSnap) => {
        subscribersData.push({ 
          id: docSnap.id, 
          ...docSnap.data() 
        } as Subscriber);
      });

      setSubscribers(subscribersData);
      
      // Auto-select all verified subscribers
      const allVerifiedIds = subscribersData.map(s => s.id);
      setSelectedSubscribers(allVerifiedIds);
      
      toast.success(`Loaded ${subscribersData.length} verified subscribers`);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifiedSubscribers();
  }, []);

  // Format date
  const formatDate = (dateInput: any) => {
    if (!dateInput) return "N/A";
    
    try {
      let date: Date;
      if (dateInput?.toDate) {
        date = dateInput.toDate();
      } else if (typeof dateInput === 'string') {
        date = new Date(dateInput);
      } else {
        return "N/A";
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "N/A";
    }
  };

  // Toggle subscriber selection
  const toggleSubscriberSelection = (id: string) => {
    setSelectedSubscribers(prev => 
      prev.includes(id) 
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    );
  };

  // Select all verified
  const selectAllVerified = () => {
    const allIds = subscribers.map(s => s.id);
    if (selectedSubscribers.length === allIds.length) {
      setSelectedSubscribers([]);
    } else {
      setSelectedSubscribers(allIds);
    }
  };

  // Get selected subscribers data
  const getSelectedSubscribers = () => {
    return subscribers.filter(s => selectedSubscribers.includes(s.id));
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setEmailData(prev => ({ ...prev, [name]: checked }));
  };

  // Validate form
  const validateForm = (): boolean => {
    if (!emailData.subject.trim()) {
      toast.error("Email subject is required");
      return false;
    }

    if (!emailData.body.trim()) {
      toast.error("Email body is required");
      return false;
    }

    if (selectedSubscribers.length === 0) {
      toast.error("Select at least one subscriber");
      return false;
    }

    return true;
  };

  // Send email via EmailJS
  const sendEmailViaEmailJS = async (subscriber: Subscriber) => {
    const templateParams = {
      to_name: subscriber.username,
      to_email: subscriber.email,
      subject: emailData.subject,
      message: emailData.body,
      reply_to: emailData.replyTo || "contact@cmndistributors.com",
      unsubscribe_link: emailData.includeUnsubscribe 
        ? `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`
        : "",
      company_name: "CMN Distributors",
      company_address: "362, Upper Paya Lebar Road, #05-07 Da Jin Factory Building, Singapore, 534963"
    };

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      return { success: true, email: subscriber.email };
    } catch (error) {
      console.error(`Failed to send to ${subscriber.email}:`, error);
      return { success: false, email: subscriber.email, error };
    }
  };

  // Handle send emails
  const handleSendEmails = async () => {
    if (!validateForm()) return;

    setSending(true);
    
    const selected = getSelectedSubscribers();
    const results = [];

    toast.loading(`Sending emails to ${selected.length} subscribers...`);

    // Send emails one by one (you could batch them if needed)
    for (let i = 0; i < selected.length; i++) {
      const subscriber = selected[i];
      const result = await sendEmailViaEmailJS(subscriber);
      results.push(result);
      
      // Update progress
      if (i % 5 === 0 || i === selected.length - 1) {
        toast.loading(`Sending ${i + 1}/${selected.length}...`);
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setSending(false);
    toast.dismiss();

    // Calculate results
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    if (failed === 0) {
      toast.success(`Successfully sent ${successful} emails!`);
    } else {
      toast.error(`Sent ${successful} emails, failed: ${failed}`);
    }

    // Log results (you could save this to database)
    console.log("Email sending results:", results);
  };

  // Preview email
  const handlePreview = () => {
    if (!validateForm()) return;
    setPreviewMode(true);
  };

  // Get email statistics
  const emailStats = {
    totalVerified: subscribers.length,
    selectedCount: selectedSubscribers.length,
    percentageSelected: subscribers.length > 0 
      ? Math.round((selectedSubscribers.length / subscribers.length) * 100) 
      : 0
  };

  return (
    <div className="max-w-7xl mx-auto p-4 text-black">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 bg-[#F272A8] rounded-full"></div>
          <h1 className="text-2xl font-bold">Send Newsletter Email</h1>
        </div>
        <p className="text-gray-600 ml-4 text-xs">
          Send email to verified newsletter subscribers
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Email Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow border">
              <div className="flex items-center gap-2 mb-2">
                <FaUsers className="text-blue-500" />
                <p className="text-sm text-gray-600">Total Verified</p>
              </div>
              <p className="text-2xl font-bold">{emailStats.totalVerified}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <FaCheck className="text-green-500" />
                <p className="text-sm text-gray-600">Selected</p>
              </div>
              <p className="text-2xl font-bold text-green-600">{emailStats.selectedCount}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <FaEnvelope className="text-purple-500" />
                <p className="text-sm text-gray-600">Selection</p>
              </div>
              <p className="text-2xl font-bold text-purple-600">{emailStats.percentageSelected}%</p>
            </div>
          </div>

          {/* Email Form */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaEnvelope className="text-[#F272A8]" /> Email Content
            </h2>

            {/* Subject */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={emailData.subject}
                onChange={handleInputChange}
                placeholder="Enter email subject..."
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F272A8]"
                disabled={sending}
              />
            </div>

            {/* Reply To
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reply-To Email (Optional)
              </label>
              <input
                type="email"
                name="replyTo"
                value={emailData.replyTo}
                onChange={handleInputChange}
                placeholder="contact@cmndistributors.com"
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F272A8]"
                disabled={sending}
              />
            </div> */}

            {/* Email Body */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Body *
              </label>
              <textarea
                name="body"
                value={emailData.body}
                onChange={handleInputChange}
                placeholder="Write your email content here... You can use HTML for formatting."
                rows={12}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#F272A8] font-mono text-sm"
                disabled={sending}
              />
              <p className="text-xs text-gray-500 mt-2">
                Supports HTML. Use {"{user_name}"} for subscriber name and {"{email}"} for their email.
              </p>
            </div>

            {/* Options */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="includeUnsubscribe"
                  name="includeUnsubscribe"
                  checked={emailData.includeUnsubscribe}
                  onChange={handleCheckboxChange}
                  className="rounded"
                  disabled={sending}
                />
                <label htmlFor="includeUnsubscribe" className="text-sm text-gray-700">
                  Include unsubscribe link (Required by email regulations)
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePreview}
                disabled={sending}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 disabled:opacity-50"
              >
                {previewMode ? <FaEyeSlash /> : <FaEye />}
                {previewMode ? "Hide Preview" : "Preview Email"}
              </button>
              
              <button
                onClick={handleSendEmails}
                disabled={sending || selectedSubscribers.length === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-[#F272A8] text-white px-6 py-3 rounded-lg hover:bg-[#d6488d] disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send to {selectedSubscribers.length} Subscribers
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Email Preview */}
          {previewMode && (
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-lg font-semibold mb-4">Email Preview</h3>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="border-b pb-3 mb-3">
                  <p className="font-semibold">Subject: {emailData.subject}</p>
                  <p className="text-sm text-gray-600">To: Subscriber Name &lt;subscriber@example.com&gt;</p>
                </div>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: emailData.body.replace(/{user_name}/g, "John Doe").replace(/{email}/g, "john@example.com")
                  }}
                />
                {emailData.includeUnsubscribe && (
                  <div className="mt-6 pt-4 border-t text-xs text-gray-500">
                    <p>Unsubscribe link would appear here</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Subscribers List */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg sticky top-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FaUsers className="text-[#F272A8]" /> Recipients
              </h2>
              <button
                onClick={selectAllVerified}
                disabled={loading || sending}
                className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
              >
                {selectedSubscribers.length === subscribers.length ? "Deselect All" : "Select All"}
              </button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search subscribers..."
                className="w-full border rounded-lg px-4 py-2 text-sm"
                disabled={sending}
              />
            </div>

            {/* Subscribers List */}
            <div className="max-h-[500px] overflow-y-auto pr-2">
              {loading ? (
                <p className="text-center py-4 text-gray-500">Loading subscribers...</p>
              ) : subscribers.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No verified subscribers found</p>
              ) : (
                <div className="space-y-2">
                  {subscribers.map((subscriber) => (
                    <div
                      key={subscriber.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        selectedSubscribers.includes(subscriber.id)
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-200"
                      } hover:bg-gray-100 transition-colors`}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedSubscribers.includes(subscriber.id)}
                        onChange={() => toggleSubscriberSelection(subscriber.id)}
                        className="rounded"
                        disabled={sending}
                      />

                      {/* Avatar */}
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-[#F272A8] text-sm" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{subscriber.username}</p>
                        <p className="text-xs text-gray-500 truncate">{subscriber.email}</p>
                        <p className="text-xs text-gray-400">
                          Joined: {formatDate(subscriber.subscribedAt)}
                        </p>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => toggleSubscriberSelection(subscriber.id)}
                        className="text-gray-400 hover:text-red-500"
                        disabled={sending}
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selection Summary */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Selected</span>
                <span className="font-semibold">{selectedSubscribers.length}/{subscribers.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${emailStats.percentageSelected}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {selectedSubscribers.length === subscribers.length
                  ? "All verified subscribers selected"
                  : `${selectedSubscribers.length} subscribers will receive this email`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}