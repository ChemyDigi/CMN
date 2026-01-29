"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminPanel/AdminNavbar";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`
          flex-1 bg-gray-50 overflow-auto transition-all duration-300
          p-3 sm:p-4 md:p-6
          ml-0 ${collapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
