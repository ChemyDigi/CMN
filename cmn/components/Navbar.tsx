"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<"solutions" | "products" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<"solutions" | "products" | null>(null);

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* TOP BLACK BAR */}
      <div className="w-full h-20 flex items-center justify-between bg-black pl-4 sm:pl-6 lg:pl-10 pr-0 relative z-50 position-fixed">

        {/* LOGO */}
        <Link href="/" className="flex items-center flex-shrink-0 pl-4 sm:pl-6 lg:pl-10">
          <Image
            src="/images/CMN_logo.png"
            alt="Company Logo"
            width={70}
            height={70}
            className="object-contain"
          />
        </Link>


        {/* DESKTOP NAVBAR */}
        <div className="hidden lg:flex flex-1">
          <nav
            onMouseLeave={() => setActiveMenu(null)}
            className="relative bg-white shadow-sm h-16 lg:h-20 flex items-center justify-between rounded-tl-[90px] lg:rounded-tl-[120px] ml-auto w-full max-w-[1200px] px-6 lg:px-10 xl:px-16 2xl:px-[150px] 3xl:px-[220px] 2xl:rounded-tl-[150px] 3xl:rounded-tl-[180px] z-50"
          >

            {/* NAV LINKS */}
            <ul className="flex items-center text-black font-semibold text-xs sm:text-sm md:text-base space-x-4 sm:space-x-8 lg:space-x-12 xl:space-x-16 2xl:space-x-20 3xl:space-x-24 pl-6 sm:pl-12 lg:pl-20 xl:pl-28 2xl:pl-40 3xl:pl-56 mr-6 sm:mr-8 lg:mr-12 xl:mr-16 2xl:mr-20">

              <li className="hover:text-[#F272A8]" onMouseEnter={() => setActiveMenu(null)}>
                <Link href="/home">Home</Link>
              </li>

              <li className="hover:text-[#F272A8]" onMouseEnter={() => setActiveMenu(null)}>
                <Link href="/about">About</Link>
              </li>

              <li className="hover:text-[#F272A8] cursor-pointer" onMouseEnter={() => setActiveMenu("solutions")}>
                Services
              </li>

              <li className="hover:text-[#F272A8] cursor-pointer" onMouseEnter={() => setActiveMenu("products")}>
                Products
              </li>

              <li className="hover:text-[#F272A8]" onMouseEnter={() => setActiveMenu(null)}>
                <Link href="/clients">Clients</Link>
              </li>
            </ul>

            {/* CONTACT BUTTON */}
            <Link
              href="/contact"
              className="bg-[#202020] text-white px-5 py-2 rounded-md text-xs sm:text-sm font-semibold hover:bg-gray-900 transition whitespace-nowrap"
            >
              CONTACT
            </Link>

            {/* DROPDOWN */}
            {activeMenu && (
              <div className="absolute left-0 top-full w-full bg-white shadow-lg z-40 animate-slideDownSlow px-6 sm:px-10 lg:px-20 xl:px-28 2xl:px-[200px] 3xl:px-[260px]">
                <div className="w-full flex py-10 lg:py-14 gap-10 lg:gap-20 xl:gap-32">

                  <div className="w-1/2">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold capitalize text-gray-900">
                      {activeMenu}
                    </h3>
                  </div>

                  <div className="w-1/2 border-l pl-6 lg:pl-10 text-sm space-y-4 animate-dropdownSmooth">
                    {activeMenu === "solutions" && (
                      <>
                        <p className="font-bold text-gray-700 underline">Services</p>
                        <Link href="/services/cmn" className="block text-gray-500 hover:text-[#F272A8]">CMN Services</Link>
                        <Link href="/services/airdoot" className="block text-gray-500 hover:text-[#F272A8]">AirDoot</Link>
                      </>
                    )}

                    {activeMenu === "products" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Link href="/products/tools" className="text-gray-500 hover:text-[#F272A8]">Tools & Equipment</Link>
                        <Link href="/products/ref-ac" className="text-gray-500 hover:text-[#F272A8]">Refrigerators & Air Conditioners</Link>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}

          </nav>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden block text-white ml-4 pr-4 sm:pr-6"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="space-y-1 transition-all">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>

      </div>

      {/* MOBILE MENU - ABSOLUTE POSITION */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 animate-slideDownSlow z-40">
          <div className="px-6 py-6 space-y-6 text-black">

            <MobileLink href="/home" label="Home" setMobileOpen={setMobileOpen} />
            <MobileLink href="/about" label="About" setMobileOpen={setMobileOpen} />

            <MobileDropdown
              title="Solutions"
              active={mobileDropdown === "solutions"}
              toggle={() => setMobileDropdown(mobileDropdown === "solutions" ? null : "solutions")}
              items={[
                { label: "CMN Solutions", href: "/services/cmn" },
                { label: "AirDoot", href: "/services/airdoot" },
              ]}
              setMobileOpen={setMobileOpen}
            />

            <MobileDropdown
              title="Products"
              active={mobileDropdown === "products"}
              toggle={() => setMobileDropdown(mobileDropdown === "products" ? null : "products")}
              items={[
                { label: "Tools & Equipment", href: "/products/tools" },
                { label: "Refrigerators & Air Conditioners", href: "/products/ref-ac" },
              ]}
              setMobileOpen={setMobileOpen}
            />

            <MobileLink href="/clients" label="Clients" setMobileOpen={setMobileOpen} />

            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center bg-[#202020] text-white px-6 py-2 rounded-md text-sm font-semibold shadow-sm hover:bg-gray-900 transition-all"
              >
                CONTACT
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style jsx global>{`
        @keyframes slideDownSlow {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        .animate-slideDownSlow { animation: slideDownSlow .35s ease-out forwards; }

        @keyframes dropdownSmooth {
          0% { opacity: 0; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        .animate-dropdownSmooth { animation: dropdownSmooth .3s ease-out forwards; }
      `}</style>

    </header>
  );
}

/* MOBILE LINK COMPONENT */
function MobileLink({ href, label, setMobileOpen }: any) {
  return (
    <Link
      href={href}
      onClick={() => setMobileOpen(false)}
      className="block text-base font-medium text-gray-900 hover:text-[#F272A8] transition"
    >
      {label}
    </Link>
  );
}

/* MOBILE DROPDOWN COMPONENT */
function MobileDropdown({ title, active, toggle, items, setMobileOpen }: any) {
  return (
    <div className="border-t border-gray-200 pt-4">
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full text-base font-semibold text-[#F272A8]"
      >
        {title}
        <span className="text-xs">{active ? "▲" : "▼"}</span>
      </button>

      {active && (
        <div className="mt-3 pl-4 space-y-3 text-sm text-gray-600 animate-dropdownSmooth">
          {items.map((item: any) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block hover:text-[#F272A8] transition"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}