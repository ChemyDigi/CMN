"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminPanel/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main
        className={`flex-1 bg-gray-50 p-6 overflow-auto transition-all duration-300
        ${collapsed ? "ml-20" : "ml-64"}`}
      >
        {children}
      </main>
    </div>
  );
}
