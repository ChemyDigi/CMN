"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminPanel/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main content area */}
      <main
        className={`flex-1 bg-gray-50 overflow-auto transition-all duration-300
        pt-16 md:pt-0
        ${collapsed ? "md:ml-20" : "md:ml-64"}`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}