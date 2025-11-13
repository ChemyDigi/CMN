"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<"solutions" | "products" | null>(null);

  return (
    <header className="relative w-full group/nav transition-all duration-300">
      {/* TOP LOGO BAR */}
      <div className="w-full h-20 flex items-center pl-10 bg-black group-hover/nav:bg-white transition-all duration-300">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/CMN_logo.png"
            alt="Company Logo"
            width={70}
            height={70}
            className="object-contain"
          />
        </Link>
      </div>

      {/* MAIN NAV BAR */}
      <div className="absolute top-0 left-0 w-full flex">
        <nav
          className="
            bg-white h-20 shadow-sm rounded-tl-[120px]
            flex items-center justify-between px-10 pr-40
            max-w-[1300px] w-full ml-auto relative
          "
        >
          {/* MENU */}
          <ul className="flex items-center space-x-14 text-sm font-semibold text-black mr-10 pl-32">
            <li
              className="hover:text-[#F272A8] cursor-pointer"
              onMouseEnter={() => setActiveMenu(null)}
            >
              <Link href="/">Home</Link>
            </li>

            <li
              className="hover:text-[#F272A8] cursor-pointer"
              onMouseEnter={() => setActiveMenu(null)}
            >
              <Link href="/about">About</Link>
            </li>

            {/* SOLUTIONS */}
            <li
              className="hover:text-[#F272A8] cursor-pointer"
              onMouseEnter={() => setActiveMenu("solutions")}
            >
              Solutions
            </li>

            {/* PRODUCTS */}
            <li
              className="hover:text-[#F272A8] cursor-pointer"
              onMouseEnter={() => setActiveMenu("products")}
            >
              Products
            </li>

            <li
              className="hover:text-[#F272A8] cursor-pointer"
              onMouseEnter={() => setActiveMenu(null)}
            >
              <Link href="/clients">Clients</Link>
            </li>
          </ul>

          {/* CONTACT */}
          <Link
            href="/contact"
            className="
              bg-[#202020] text-white px-6 py-2 rounded-md
              text-sm font-semibold hover:bg-gray-900
              transition-all duration-300
            "
            onMouseEnter={() => setActiveMenu(null)}
          >
            CONTACT
          </Link>
        </nav>
      </div>

      {/* FULL-WIDTH MEGA DROPDOWN */}
      {activeMenu && (
        <div
          className="
            absolute left-0 top-20 w-full bg-white 
             translate-y-0
            transition-all duration-300
            z-50
          "
          onMouseLeave={() => setActiveMenu(null)}
        >
          {/* INNER CONTENT (ALIGNED WITH NAV WIDTH) */}
          <div className="max-w-[1300px] mx-auto flex py-14 px-10">
            {/* LEFT TITLE */}
            <div className="w-1/2 pl-10">
              <h3 className="text-4xl font-semibold capitalize text-gray-900">
                {activeMenu}
              </h3>
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-1/2 border-l border-gray-300 pl-10 text-sm space-y-4">
              {activeMenu === "solutions" && (
                <>
                  <p className="font-semibold text-gray-800">Solutions</p>

                  <Link href="/services/cmn" className="hover:text-[#F272A8] block text-gray-600">
                    CMN Solutions
                  </Link>

                  <Link href="/services/airdoot" className="hover:text-[#F272A8] block text-gray-600">
                    AirDoot
                  </Link>
                </>
              )}

              {activeMenu === "products" && (
                <div className="grid grid-cols-2 gap-x-10">
                  <Link href="/products/tools" className="hover:text-[#F272A8] text-gray-600">
                    Tools & Equipment
                  </Link>

                  <Link href="/products/ref-ac" className="hover:text-[#F272A8] text-gray-600 ">
                    Refrigerators & Air Conditioners
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
