"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaChevronDown,
  FaChevronRight,
  FaTag,
  FaStar,
  FaFolder,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaList,
  FaBoxes,
  FaHome,
} from "react-icons/fa";

// Allowed dropdown keys
type SectionKey = "products" | "brands" | "categories";

// Sidebar props
interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function AdminSidebar({ collapsed, setCollapsed }: AdminSidebarProps) {
  const pathname = usePathname();

  // Dropdown open state
  const [open, setOpen] = useState<Record<SectionKey, boolean>>({
    products: false, // closed by default
    brands: false,
    categories: false,
  });

  const toggleSection = (key: SectionKey) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#0F0F0F] text-white border-r border-gray-700
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
          href="/admin"
          icon={<FaHome />}
          label="Dashboard"
          active={pathname === "/admin"}
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

        {/* Brands Dropdown */}
        {/* <SidebarDropdown
          title="Brands"
          collapsed={collapsed}
          open={open.brands}
          onToggle={() => toggleSection("brands")}
          icon={<FaTag />}
        >
          <SidebarSublink
            href="/brands/add"
            label="Add Brand"
            icon={<FaPlus />}
            active={pathname === "/brands/add"}
          />
          <SidebarSublink
            href="/brands/manage"
            label="Manage Brands"
            icon={<FaList />}
            active={pathname === "/brands/manage"}
          />
        </SidebarDropdown> */}

        {/* Reviews */}
        {/* <SidebarLink
          collapsed={collapsed}
          href="/newsletter"
          icon={<FaStar />}
          label="Newsletter"
          active={pathname === "/manage-newsletter"}
        /> */}

        {/* Categories Dropdown */}
        {/* <SidebarDropdown
          title="Categories"
          collapsed={collapsed}
          open={open.categories}
          onToggle={() => toggleSection("categories")}
          icon={<FaFolder />}
        >
          <SidebarSublink
            href="/categories/add"
            label="Add Category"
            icon={<FaPlus />}
            active={pathname === "/categories/add"}
          />
          <SidebarSublink
            href="/categories/manage"
            label="Manage Categories"
            icon={<FaList />}
            active={pathname === "/categories/manage"}
          />
        </SidebarDropdown> */}

        {/* Settings */}
        {/* <SidebarLink
          collapsed={collapsed}
          href="/settings"
          icon={<FaCog />}
          label="Settings"
          active={pathname === "/settings"}
        /> */}
      </nav>

      {/* LOGOUT - Fixed at bottom */}
      <div className="p-4 border-t border-gray-700 flex-shrink-0">
        <button className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full">
          <FaSignOutAlt className="text-lg" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
}

/* ------------------ SMALL COMPONENTS ------------------ */

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