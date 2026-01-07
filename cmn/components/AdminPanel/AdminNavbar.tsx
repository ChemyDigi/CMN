"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaChevronDown,
  FaChevronRight,
  FaSignOutAlt,
  FaPlus,
  FaList,
  FaBoxes,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

// Allowed dropdown keys
type SectionKey = "products" | "brands" | "categories";

// Desktop Sidebar props
interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

// Mobile Sidebar props
interface AdminMobileSidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

// Original Desktop Sidebar Component
export function AdminDesktopSidebar({ collapsed, setCollapsed }: AdminSidebarProps) {
  const pathname = usePathname();

  // Dropdown open state
  const [open, setOpen] = useState<Record<SectionKey, boolean>>({
    products: false,
    brands: false,
    categories: false,
  });

  const toggleSection = (key: SectionKey) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // 1. Clear Firebase client session
      await fetch("/api/admin/logout", { method: "POST" }); // 2. Clear server cookie
      window.location.href = "/admin"; // 3. Redirect
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <aside
      className={`hidden md:flex fixed top-0 left-0 h-screen bg-[#0F0F0F] text-white border-r border-gray-700
      transition-all duration-300 ${collapsed ? "w-20" : "w-64"} flex flex-col`}
    >
      {/* HEADER - Fixed height */}
      <div className="p-4 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
        <h1 className="text-xl font-bold">{collapsed ? "CMN" : "CMN Admin"}</h1>
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400">
          {collapsed ? "<" : ">"}
        </button>
      </div>

      {/* MENU - Scrollable area with hidden scrollbar */}
      <nav className="px-3 py-4 space-y-2 flex-grow overflow-y-auto 
        [&::-webkit-scrollbar]:hidden
        [-ms-overflow-style:none]
        [scrollbar-width:none]">
        {/* Dashboard */}
        <SidebarLink
          collapsed={collapsed}
          href="/admin/dashboard"
          icon={<FaHome />}
          label="Dashboard"
          active={pathname === "/admin/dashboard"}
        />

        {/* Products Dropdown */}
        <SidebarDropdown
          title="Products"
          collapsed={collapsed}
          open={open.products}
          onToggle={() => toggleSection("products")}
          icon={<FaBoxes />}
        >
          <SidebarSublink
            href="/admin/add-products/tools"
            label="Add Tools & Equipment"
            icon={<FaPlus />}
            active={pathname === "/admin/add-products/tools"}
          />
          <SidebarSublink
            href="/admin/add-products/ref-ac"
            label="Add Refrigerators & AC"
            icon={<FaPlus />}
            active={pathname === "/admin/add-products/ref-ac"}
          />
          <SidebarSublink
            href="/admin/manage-products"
            label="Manage Products"
            icon={<FaList />}
            active={pathname === "/admin/manage-products"}
          />
        </SidebarDropdown>

        {/* Add more dropdowns as needed */}
      </nav>

      {/* LOGOUT - Fixed at bottom */}
      <div className="p-4 border-t border-gray-700 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full"
        >
          <FaSignOutAlt className="text-lg" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}

// New Mobile Sidebar Component
export function AdminMobileSidebar({ isOpen, setIsOpen }: AdminMobileSidebarProps) {
  const pathname = usePathname();
  
  // Dropdown open state
  const [open, setOpen] = useState<Record<SectionKey, boolean>>({
    products: false,
    brands: false,
    categories: false,
  });

  const toggleSection = (key: SectionKey) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/admin";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-[#0F0F0F] text-white border-r border-gray-700
        transition-all duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 z-50 flex flex-col md:hidden`}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center flex-shrink-0">
          <h1 className="text-xl font-bold">CMN Admin</h1>
          <button
            onClick={closeSidebar}
            className="text-gray-400 hover:text-white"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* MENU */}
        <nav className="px-3 py-4 space-y-2 flex-grow overflow-y-auto">
          {/* Dashboard */}
          <MobileSidebarLink
            href="/admin/dashboard"
            icon={<FaHome />}
            label="Dashboard"
            active={pathname === "/admin/dashboard"}
            onClick={closeSidebar}
          />

          {/* Products Dropdown */}
          <MobileSidebarDropdown
            title="Products"
            open={open.products}
            onToggle={() => toggleSection("products")}
            icon={<FaBoxes />}
          >
            <MobileSidebarSublink
              href="/admin/add-products/tools"
              label="Add Tools & Equipment"
              icon={<FaPlus />}
              active={pathname === "/admin/add-products/tools"}
              onClick={closeSidebar}
            />
            <MobileSidebarSublink
              href="/admin/add-products/ref-ac"
              label="Add Refrigerators & AC"
              icon={<FaPlus />}
              active={pathname === "/admin/add-products/ref-ac"}
              onClick={closeSidebar}
            />
            <MobileSidebarSublink
              href="/admin/manage-products"
              label="Manage Products"
              icon={<FaList />}
              active={pathname === "/admin/manage-products"}
              onClick={closeSidebar}
            />
          </MobileSidebarDropdown>

          {/* Add more dropdowns as needed */}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

// Mobile Navbar Component (Top Bar with Hamburger)
export function AdminMobileNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="md:hidden fixed top-0 left-0 right-0  text-white ">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-white"
            >
              <FaBars className="text-xl" />
            </button>
            <h1 className="text-xl font-bold"></h1>
          </div>
          
          {/* Optional: Add user avatar or notifications here */}
          <div className="flex items-center gap-4">
            {/* Add any top-right icons if needed */}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AdminMobileSidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
      />
    </>
  );
}

// Updated Main Component that combines both
export default function AdminSidebar({ collapsed, setCollapsed }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile Navbar (Top) - Only on mobile (< 768px) */}
      <AdminMobileNavbar />
      
      {/* Desktop Sidebar (Left) - Show on tablet and desktop (≥ 768px) */}
      <AdminDesktopSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
    </>
  );
}

/* ------------------ MOBILE COMPONENTS ------------------ */

function MobileSidebarLink({
  href,
  icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-3 rounded-md transition
      ${active ? "bg-gray-800 text-blue-400" : "hover:bg-gray-700"}`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function MobileSidebarDropdown({
  title,
  open,
  onToggle,
  icon,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center w-full gap-3 px-3 py-3 rounded-md hover:bg-gray-700"
      >
        <span className="text-lg">{icon}</span>
        <span className="flex-1">{title}</span>
        <span>{open ? <FaChevronDown /> : <FaChevronRight />}</span>
      </button>

      {open && <div className="ml-8 mt-2 space-y-2">{children}</div>}
    </div>
  );
}

function MobileSidebarSublink({
  href,
  label,
  icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm transition
      ${active ? "text-blue-400" : "hover:text-gray-300"}`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

/* ------------------ DESKTOP COMPONENTS ------------------ */

function SidebarLink({
  collapsed,
  href,
  icon,
  label,
  active,
}: {
  collapsed: boolean;
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-3 rounded-md transition
      ${active ? "bg-gray-800 text-blue-400" : "hover:bg-gray-700"}`}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

function SidebarDropdown({
  title,
  collapsed,
  open,
  onToggle,
  icon,
  children,
}: {
  title: string;
  collapsed: boolean;
  open: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center w-full gap-3 px-3 py-3 rounded-md hover:bg-gray-700"
      >
        <span className="text-lg">{icon}</span>
        {!collapsed && <span className="flex-1">{title}</span>}
        {!collapsed && <span>{open ? <FaChevronDown /> : <FaChevronRight />}</span>}
      </button>

      {open && !collapsed && <div className="ml-8 mt-2 space-y-2">{children}</div>}
    </div>
  );
}

function SidebarSublink({
  href,
  label,
  icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm transition
      ${active ? "text-blue-400" : "hover:text-gray-300"}`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}