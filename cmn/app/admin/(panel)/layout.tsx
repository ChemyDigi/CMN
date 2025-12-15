"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminPanel/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

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
