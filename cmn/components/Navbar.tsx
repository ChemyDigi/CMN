"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<"solutions" | "products" | null>(null);

  return (
    <header className="relative w-full">

      {/* TOP BLACK LOGO BAR */}
      <div className="w-full h-20 flex items-center pl-10 bg-black">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/CMN_logo.png"
            alt="Company Logo"
            width={70}
            height={70}
            className="object-contain"
          />
        </Link>
        {/* NAVBAR WRAPPER — DROPDOWN ANCHORS TO THIS */}
      <div className="relative w-full flex">
        <nav
          className="
            relative    /* IMPORTANT */
            bg-white h-20 shadow-sm rounded-tl-[120px]
            flex items-center justify-between
            px-10 pr-40
            max-w-[1200px] w-full ml-auto
            z-50
          "
          onMouseLeave={() => setActiveMenu(null)}
        >
          {/* NAV LINKS */}
          <ul className="flex items-center space-x-14 text-sm font-semibold text-black mr-10 pl-32">
            <li className="hover:text-[#F272A8]" onMouseEnter={() => setActiveMenu(null)}>
              <Link href="/">Home</Link>
            </li>

            <li className="hover:text-[#F272A8]" onMouseEnter={() => setActiveMenu(null)}>
              <Link href="/about">About</Link>
            </li>

            <li
              className="hover:text-[#F272A8] cursor-pointer"
              onMouseEnter={() => setActiveMenu("solutions")}
            >
              Solutions
            </li>

            <li
              className="hover:text-[#F272A8] cursor-pointer"
              onMouseEnter={() => setActiveMenu("products")}
            >
              Products
            </li>

            <li className="hover:text-[#F272A8]" onMouseEnter={() => setActiveMenu(null)}>
              <Link href="/clients">Clients</Link>
            </li>
          </ul>

          {/* CONTACT BUTTON */}
          <Link
            href="/contact"
            className="bg-[#202020] text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-900 transition"
          >
            CONTACT
          </Link>

          {/* DROPDOWN INSIDE NAVBAR (NOW CORRECTLY ALIGNED) */}
          {activeMenu && (
            <div
              className="
                absolute left-0 top-full  
                w-full bg-white shadow-lg z-40
              "
            >
              <div className="max-w-[1200px] w-full ml-auto flex py-14 px-10 pr-40">

                {/* LEFT TITLE */}
                <div className="w-1/2 pl-10">
                  <h3 className="text-4xl font-semibold capitalize text-gray-900">
                    {activeMenu}
                  </h3>
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-1/2 border-l pl-10 text-sm space-y-4">

                  {activeMenu === "solutions" && (
                    <>
                      <p className="font-bold text-gray-700 text-decoration: underline">Solutions</p>
                      <Link href="/services/cmn" className="hover:text-[#F272A8] block text-gray-500">
                        CMN Solutions
                      </Link>
                      <Link href="/services/airdoot" className="hover:text-[#F272A8] block text-gray-500">
                        AirDoot
                      </Link>
                    </>
                  )}

                  {activeMenu === "products" && (
                    <div className="grid grid-cols-2 gap-x-10">
                      <Link href="/products/tools" className="hover:text-[#F272A8]  text-gray-500">
                        Tools & Equipment
                      </Link>
                      <Link href="/products/ref-ac" className="hover:text-[#F272A8]  text-gray-500">
                        Refrigerators & Air Conditioners
                      </Link>
                    </div>
                  )}

                </div>

              </div>
            </div>
          )}

        </nav>
      </div>
      </div>

      
    </header>
  );
}
