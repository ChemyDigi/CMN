"use client";

import React, { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaCalendarAlt,
  FaPhone,
  FaUser,
  FaFilter,
  FaFileExport,
  FaKey,
  FaExclamationCircle
} from "react-icons/fa";
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast, { Toaster } from "react-hot-toast";

type Subscriber = {
  id: string;
  username: string;
  email: string;
  phone: string;
  subscribedAt?: any;
  createdAt?: any;
  verificationStatus: string;
  verificationCode: string;
  verified?: boolean;
  verifiedAt?: any;
  updatedAt?: any;
};

export default function ManageNewsletterUsers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch ALL subscribers (without ordering to avoid missing fields)
  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const subscribersRef = collection(db, "subscribers");
      
      // Don't use orderBy since not all documents have the same fields
      const querySnapshot = await getDocs(subscribersRef);
      const subscribersData: Subscriber[] = [];
      
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        
        // Handle different field names (subscribedAt vs createdAt)
        const timestampField = data.subscribedAt || data.createdAt;
        
        // Determine verification status
        let verificationStatus = "unverified";
        if (data.verificationStatus === "verified") {
          verificationStatus = "verified";
        } else if (data.verified === true) {
          verificationStatus = "verified";
        } else if (data.verificationStatus === "unverified") {
          verificationStatus = "unverified";
        }
        
        subscribersData.push({ 
          id: docSnap.id, 
          username: data.username || "No Name",
          email: data.email || "No Email",
          phone: data.phone || "",
          subscribedAt: timestampField, // Use whichever exists
          createdAt: data.createdAt,
          verificationStatus: verificationStatus,
          verificationCode: data.verificationCode || "",
          verified: data.verified || false,
          verifiedAt: data.verifiedAt || null,
          updatedAt: data.updatedAt || null,
        } as Subscriber);
      });

      // Sort manually by timestamp (most recent first)
      subscribersData.sort((a, b) => {
        const dateA = getTimestamp(a.subscribedAt || a.createdAt);
        const dateB = getTimestamp(b.subscribedAt || b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });

      setSubscribers(subscribersData);
      console.log(`Loaded ${subscribersData.length} subscribers:`, subscribersData);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  // Helper to get Date from Firestore timestamp or string
  const getTimestamp = (timestamp: any): Date => {
    if (!timestamp) return new Date(0);
    if (timestamp?.toDate) {
      return timestamp.toDate();
    }
    return new Date(timestamp);
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Calculate statistics - handle both verificationStatus and verified field
  const totalSubscribers = subscribers.length;
  const verifiedCount = subscribers.filter(s => 
    s.verificationStatus === "verified" || s.verified === true
  ).length;
  const unverifiedCount = subscribers.filter(s => 
    s.verificationStatus === "unverified" && s.verified !== true
  ).length;

  // Format date - handle both Firestore timestamp and regular date
  const formatDate = (dateInput: any) => {
    if (!dateInput) return "N/A";
    
    try {
      const date = getTimestamp(dateInput);
      if (date.getTime() === 0) return "N/A";
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return "N/A";
    }
  };

  // Apply filters
  const filteredSubscribers = subscribers.filter((subscriber) => {
    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        subscriber.username.toLowerCase().includes(search) ||
        subscriber.email.toLowerCase().includes(search) ||
        (subscriber.phone && subscriber.phone.toLowerCase().includes(search))
      );
    }

    // Status filter - check both verificationStatus and verified field
    if (statusFilter === "verified") {
      return subscriber.verificationStatus === "verified" || subscriber.verified === true;
    }
    if (statusFilter === "unverified") {
      return subscriber.verificationStatus === "unverified" && subscriber.verified !== true;
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const subDate = getTimestamp(subscriber.subscribedAt || subscriber.createdAt);
      
      if (dateFilter === "today") {
        return subDate.toDateString() === now.toDateString();
      } else if (dateFilter === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return subDate >= oneWeekAgo;
      } else if (dateFilter === "month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return subDate >= oneMonthAgo;
      }
    }

    return true;
  });

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Status", "Verification Code", "Subscribed On", "Verified At", "Updated At"];
    const csvData = filteredSubscribers.map(sub => [
      sub.username,
      sub.email,
      sub.phone || "N/A",
      sub.verificationStatus,
      sub.verificationCode || "N/A",
      formatDate(sub.subscribedAt || sub.createdAt),
      sub.verifiedAt ? formatDate(sub.verifiedAt) : "Not verified",
      sub.updatedAt ? formatDate(sub.updatedAt) : "N/A"
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success("Exported successfully!");
  };

  // Resend verification
  const resendVerification = async (email: string, name: string) => {
    try {
      const response = await fetch('/api/newsletter/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });

      if (response.ok) {
        toast.success(`Verification email sent to ${email}`);
      } else {
        toast.error("Failed to resend verification");
      }
    } catch (error) {
      toast.error("Error resending verification");
    }
  };

  // Manually verify a user - FIXED collection name
  const manualVerify = async (id: string, email: string) => {
    if (!confirm(`Manually verify ${email}?`)) return;
    
    try {
      const subscriberRef = doc(db, "subscribers", id);
      await updateDoc(subscriberRef, {
        verificationStatus: "verified",
        verified: true,
        verifiedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      toast.success(`${email} has been verified`);
      fetchSubscribers(); // Refresh the list
    } catch (error) {
      console.error("Error verifying user:", error);
      toast.error("Failed to verify user");
    }
  };

  // Delete subscriber - FIXED collection name
  const deleteSubscriber = async (id: string, email: string) => {
    if (!confirm(`Delete subscriber ${email}? This action cannot be undone.`)) return;
    
    try {
      const subscriberRef = doc(db, "subscribers", id);
      await updateDoc(subscriberRef, {
        verificationStatus: "deleted",
        deletedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      toast.success(`${email} has been deleted`);
      fetchSubscribers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  // Get status badge color
  const getStatusColor = (subscriber: Subscriber) => {
    const isVerified = subscriber.verificationStatus === "verified" || subscriber.verified === true;
    
    if (isVerified) {
      return { 
        bg: "bg-green-100", 
        text: "text-green-800", 
        icon: <FaCheckCircle className="text-green-500" />,
        label: "Verified"
      };
    } else if (subscriber.verificationStatus === "deleted") {
      return { 
        bg: "bg-red-100", 
        text: "text-red-800", 
        icon: <FaTimesCircle className="text-red-500" />,
        label: "Deleted"
      };
    } else {
      return { 
        bg: "bg-orange-100", 
        text: "text-orange-800", 
        icon: <FaTimesCircle className="text-orange-500" />,
        label: "Unverified"
      };
    }
  };

  // Debug function to see all fields
  const viewDetails = (subscriber: Subscriber) => {
    console.log("Subscriber details:", subscriber);
    toast.success(`Viewing ${subscriber.username} details in console`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 text-black">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-6 bg-[#F272A8] rounded-full"></div>
          <h1 className="text-2xl font-bold">Newsletter Subscribers</h1>
        </div>
        <p className="text-gray-600 ml-4 text-xs">
          Manage all newsletter subscribers and their status ({totalSubscribers} total)
        </p>
        {/* <button 
          onClick={() => {
            console.log("All subscribers:", subscribers);
            toast.success(`Check console for ${subscribers.length} subscribers`);
          }}
          className="ml-4 text-xs text-blue-500 hover:text-blue-700"
        >
          Debug: View all data in console
        </button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border">
          <p className="text-sm text-gray-600">Total Subscribers</p>
          <p className="text-2xl font-bold">{totalSubscribers}</p>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-green-100">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            <p className="text-sm text-gray-600">Verified Accounts</p>
          </div>
          <p className="text-2xl font-bold text-green-600">{verifiedCount}</p>
          <p className="text-xs text-gray-500 mt-1">
            {totalSubscribers > 0 ? `${Math.round((verifiedCount / totalSubscribers) * 100)}% verified` : "No subscribers"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-orange-100">
          <div className="flex items-center gap-2">
            <FaTimesCircle className="text-orange-500" />
            <p className="text-sm text-gray-600">Unverified Accounts</p>
          </div>
          <p className="text-2xl font-bold text-orange-600">{unverifiedCount}</p>
          <p className="text-xs text-gray-500 mt-1">
            {totalSubscribers > 0 ? `${Math.round((unverifiedCount / totalSubscribers) * 100)}% pending` : "No subscribers"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-blue-100">
          <div className="flex items-center gap-2">
            <FaKey className="text-blue-500" />
            <p className="text-sm text-gray-600">Verification Codes</p>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {subscribers.filter(s => s.verificationCode && s.verificationCode.length > 0).length}
          </p>
          <p className="text-xs text-gray-500 mt-1">With verification codes</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              className="border rounded-lg px-10 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Date Filter */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <select
                className="border rounded-lg px-3 py-2"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <select
                className="border rounded-lg px-3 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="verified">Verified Only</option>
                <option value="unverified">Unverified Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end items-center mb-4">
          <div className="flex gap-2">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <FaFileExport /> Export CSV
            </button>
            <button
              onClick={fetchSubscribers}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-6">Loading subscribers...</p>
          ) : filteredSubscribers.length === 0 ? (
            <p className="text-center py-6 text-gray-600">No subscribers found</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredSubscribers.map((subscriber) => {
                  const statusColor = getStatusColor(subscriber);
                  const subscriptionDate = formatDate(subscriber.subscribedAt || subscriber.createdAt);
                  
                  return (
                    <tr key={subscriber.id} className="hover:bg-gray-50">
                      {/* User Name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                            <FaUser className="text-[#F272A8]" />
                          </div>
                          <div>
                            <p className="font-semibold">{subscriber.username}</p>
                            <p className="text-xs text-gray-500">{subscriber.email}</p>
                            {!subscriber.subscribedAt && subscriber.createdAt && (
                              <p className="text-xs text-yellow-600 flex items-center gap-1">
                                <FaExclamationCircle /> Uses createdAt
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FaPhone className="text-gray-400" />
                          <p className="text-sm">{subscriber.phone || "Not provided"}</p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {statusColor.icon}
                          <span className={`px-2 py-1 ${statusColor.bg} ${statusColor.text} text-xs rounded-full capitalize`}>
                            {statusColor.label}
                          </span>
                        </div>
                      </td>

                      {/* Verification Code */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FaKey className="text-gray-400" />
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                            {subscriber.verificationCode || "N/A"}
                          </code>
                        </div>
                      </td>

                      {/* Subscribed On */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <p className="text-sm">{subscriptionDate}</p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredSubscribers.length} of {totalSubscribers} subscribers
              {searchTerm && ` matching "${searchTerm}"`}
              {dateFilter !== "all" && ` (${dateFilter})`}
              {statusFilter !== "all" && ` (${statusFilter})`}
            </p>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                Verified: {verifiedCount}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-100 border border-orange-300 rounded"></div>
                Unverified: {unverifiedCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}