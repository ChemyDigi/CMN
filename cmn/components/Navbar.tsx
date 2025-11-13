"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="relative w-full bg-black ">
      {/* BLACK BAR WITH LOGO */}
      <div className="w-fit h-20 flex items-center pl-10">
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

      {/* WHITE NAV BAR */}
      <nav
        className="
          absolute top-0 left-[150px]     
          bg-white w-[90%] h-20
          flex items-center justify-between
          px-10 shadow-md
          rounded-tl-[120px] pr-40
        "
      >
        {/* MENU */}
        <ul className="flex items-center space-x-14 text-sm font-semibold text-black mr-10 pl-40">
          <li className="hover:text-[#F272A8]">
            <Link href="/">Home</Link>
          </li>

          <li className="hover:text-[#F272A8]">
            <Link href="/about">About</Link>
          </li>

          {/* ✅ SOLUTIONS MEGA DROPDOWN */}
          <li className="relative group cursor-pointer">
            <span className="hover:text-[#F272A8] flex items-center">
              Solutions
            </span>
            <div className="fixed top-[70px] left-[190px] w-[calc(90%-0px)] bg-white shadow-lg py-10 z-50 hidden group-hover:block">
              <div className="flex w-full max-w-6xl mx-auto px-10">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">Solutions</h3>
                </div>
                <div className="flex-1 border-l border-gray-300 pl-10 text-sm space-y-3">
                  <p className="font-semibold text-gray-600">Solutions</p>
                  <Link href="/services/cmn" className="hover:text-[#F272A8] block">
                    CMN Solutions
                  </Link>
                  <Link href="/services/airdoot" className="hover:text-[#F272A8] block">
                    AirDoot
                  </Link>
                </div>
              </div>
            </div>
          </li>

          {/* ✅ PRODUCTS MEGA DROPDOWN */}
          <li className="relative group cursor-pointer">
            <span className="hover:text-[#F272A8] flex items-center">
              Products
            </span>
            <div className="fixed top-[70px] left-[190px] w-[calc(90%-0px)] bg-white shadow-lg py-10 z-50 hidden group-hover:block">                    
              <div className="flex w-full max-w-6xl mx-auto px-10">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">Products</h3>
                </div>
                <div className="flex-1 border-l border-gray-300 pl-10 grid grid-cols-2 gap-x-10 text-sm">
                  <Link href="/products/tools" className="hover:text-[#F272A8] block">
                    Tools & Equipment
                  </Link>
                  <Link href="/products/ref-ac" className="hover:text-[#F272A8] block">
                    Refrigerators and Air Conditioners
                  </Link>
                </div>
              </div>
            </div>
          </li>

          <li className="hover:text-[#F272A8]">
            <Link href="/clients">Clients</Link>
          </li>
        </ul>

        {/* CONTACT BUTTON */}
        <Link
          href="/contact"
          className="bg-[#202020] text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-gray-900 transition hover:text-[#F272A8]"
        >
          CONTACT
        </Link>
      </nav>
    </header>
  );
}
